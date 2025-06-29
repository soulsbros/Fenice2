"use client";

import { loadInitiative, saveInitiative } from "@/actions/initiative";
import { scrapeMonster } from "@/actions/scrape";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Textfield from "@/components/textfield";
import {
  advanceCharacter,
  countCharacters,
  getCharacterType,
  getHealthDescription,
  getRandomValue,
  parseBlock,
} from "@/lib/initiative";
import { showAlert } from "@/lib/utils";
import { Campaign } from "@/types/API";
import { Character, GameData, LogData, Player } from "@/types/Initiative";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronsRight,
  ChevronUp,
  Crosshair,
  Delete,
  Edit,
  FastForward,
  Heart,
  Loader,
  LogOut,
  Play,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Trash2,
  Upload,
} from "react-feather";
import io from "socket.io-client";
import Select from "./select";

let socket: any;

interface Props {
  session: Session;
  campaigns: Campaign[];
}

export default function InitiativeTracker(props: Readonly<Props>) {
  const { session, campaigns } = props;
  const isAdmin = session?.user.roles.includes("admin");
  const isPlayer = session?.user.roles.includes("player");
  // initially no campaign is selected -> check the role
  const [isDM, setIsDM] = useState(session?.user.roles.includes("dm") ?? false);

  const [campaignId, setCampaignId] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<Character[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(1);
  const [lastUpdate, setLastUpdate] = useState<Date>();

  const [isEditing, setIsEditing] = useState(false);
  const [shouldTTS, setShouldTTS] = useState(false);
  const [isEnemy, setIsEnemy] = useState(isDM);
  // show the form by default only to DM.
  // if you don't have a character in the order it opens (useEffect)
  const [shouldShowAddForm, setShouldShowAddForm] = useState(isDM);
  const [isLoadingNethys, setIsLoadingNethys] = useState(false);
  const [checkedEntities, setCheckedEntities] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const { enemies, allies } = countCharacters(order);
  const isCombatOngoing =
    order.findIndex((character) => character.active) !== -1;

  const comparator = (characterA: Character, characterB: Character) =>
    characterB.score - characterA.score;

  const getFields = () => {
    let name = document.querySelector("#newCharacterName") as HTMLInputElement;
    let score = document.querySelector(
      "#newCharacterScore"
    ) as HTMLInputElement;
    let currentHealth = document.querySelector(
      "#newCharacterCurrentHealth"
    ) as HTMLInputElement;
    let totalHealth = document.querySelector(
      "#newCharacterTotalHealth"
    ) as HTMLInputElement;
    let notes = document.querySelector(
      "#newCharacterNotes"
    ) as HTMLInputElement;
    let link = document.querySelector("#nethysUrl") as HTMLInputElement;
    let AC = document.querySelector("#newCharacterAC") as HTMLInputElement;
    let amount =
      parseInt(
        (document.querySelector("#newCharacterAmount") as HTMLInputElement)
          ?.value
      ) || 1;

    return {
      name,
      score,
      currentHealth,
      totalHealth,
      notes,
      amount,
      link,
      AC,
    };
  };

  const clearFields = () => {
    const { name, score, currentHealth, totalHealth, notes } = getFields();
    name.value = "";
    currentHealth.value = "";
    totalHealth.value = "";
    notes.value = "";
    score.value = "";
    if (isDM) {
      (
        document.querySelector("#newCharacterAmount") as HTMLInputElement
      ).value = "";
    }
  };

  const addCharacter = async () => {
    const { name, score, currentHealth, totalHealth, notes, amount, link, AC } =
      getFields();

    if (amount < 1) {
      showAlert({
        title: "Invalid input",
        text: "Amount has to be positive",
        icon: "error",
        showCancelButton: false,
      });
      console.error("Invalid input", name.value, amount);
      return;
    }

    for (let i = 0; i < amount; i++) {
      // we roll the dice for the DM
      let parsedScore =
        isDM && !isEditing
          ? getRandomValue(1, 20) + parseFloat(score.value)
          : parseFloat(score.value);

      const oldValue = order.find((character) => character.name === name.value);
      if (!isEditing && oldValue) {
        showAlert({
          title: "Invalid input",
          text: `Character ${name.value} already exists`,
          icon: "error",
          showCancelButton: false,
        });
        console.error("Character already exists", name.value, score.value);
        return;
      }

      if (!name.value || !score.value) {
        showAlert({
          title: "Invalid input",
          text: "Name or initiative value are missing or invalid",
          icon: "error",
          showCancelButton: false,
        });
        console.error("Invalid input", name.value, score.value);
        return;
      }

      if (
        !isEditing &&
        order.find((character) => character.score == parsedScore)
      ) {
        const oldIndex = order.findIndex(
          (character) => character.score == parsedScore
        );

        // we decide randomly who goes first
        const result = getRandomValue(0, 1);

        let modifier: number;
        if (result == 1) {
          // the new one goes first -> put them higher
          modifier = 0.01;
        } else {
          // the already present one goes first -> put the new one lower
          modifier = -0.01;
        }

        // increase or decrease modifier until they have a unique value
        while (
          order.findIndex(
            (character) => character.score == parsedScore + modifier
          ) !== -1
        ) {
          modifier += 0.01;
        }

        parsedScore = order[oldIndex].score + modifier;
      }

      // if we're inserting multiple characters and the first character doesn't have a number we add " 1" to the name
      if (amount > 1 && !/\d/.test(name.value)) {
        name.value = name.value + " 1";
      }

      const newCharacter: Character = {
        name: name.value,
        score: parsedScore,
        active: oldValue?.active ?? false,
        player: oldValue?.player ?? session?.user.email ?? "",
        isPlayer: oldValue?.isPlayer ?? !isDM,
        isEnemy: isEnemy,
        currentHealth: parseInt(currentHealth.value) || 0,
        totalHealth: parseInt(totalHealth.value) || 0,
        notes: notes.value,
        link: link?.value,
        AC: parseInt(AC.value),
      };

      const oldIndex = order.findIndex(
        (character) => character.name == name.value
      );
      if (oldIndex == -1) {
        order.push(newCharacter);
      } else {
        order[oldIndex] = newCharacter;
      }
      const newOrder = [...order].toSorted(comparator);
      sendLog(`added ${name.value}`);

      if (isDM) {
        if (/\d/.test(name.value)) {
          const digit = RegExp(/\d+/).exec(name.value);
          if (digit != null && !name.value.includes("-")) {
            name.value = name.value.replace(
              digit[0],
              (Number.parseInt(digit[0]) + 1).toString()
            );
          }
        }
      }

      save({ order: newOrder, round: round, shouldTTS });
      setIsEditing(false);
      setShouldShowAddForm(isDM);

      if (!isDM) {
        clearFields();
      }
    }
  };

  const editCharacter = (currentCharacter: string) => {
    setShouldShowAddForm(true); // TODO remove when we switch to modal
    setIsEditing(true);
    const { name, score, currentHealth, totalHealth, notes } = getFields();

    const character =
      order[order.findIndex((character) => character.name == currentCharacter)];
    name.value = character.name;
    score.value = character.score.toString();
    currentHealth.value = character.currentHealth.toString();
    totalHealth.value = character.totalHealth.toString();
    setIsEnemy(character.isEnemy);
    notes.value = character.notes;
  };

  const deleteCharacters = async (
    namesList: string[],
    shouldPrompt: boolean
  ) => {
    let result;
    if (shouldPrompt) {
      result = await showAlert({
        title: `Remove selected character${namesList.length > 1 ? "s" : ""}?`,
        html: `Do you want to remove the following character${namesList.length > 1 ? "s" : ""} from the initiative?<br><br>${namesList.join("<br>")}`,
        icon: "warning",
        confirmButtonText: "Remove",
      });
    }

    if (shouldPrompt && !result?.isConfirmed) {
      return;
    }

    // useless to log if no deletion happens. We might still need to save
    // if we're called from damageCharacters tho, so we continue anyway
    if (namesList.length > 0) {
      sendLog(`${shouldPrompt ? "removed" : "killed"} ${namesList.join(", ")}`);
    }

    const currentCharacter = order.find((character) => character.active);
    const currentInitiative = currentCharacter?.score;

    const newOrder = order.filter(
      (character) => !namesList.includes(character.name)
    );

    let wasLast = true;
    let newRound = round;

    if (currentInitiative && newOrder.length != 0) {
      for (const character of newOrder) {
        if (character.score <= currentInitiative) {
          wasLast = false;
          character.active = true;
          break;
        }
      }
      if (wasLast) {
        newOrder[0].active = true;
        newRound++;
      }
    }

    setCheckedEntities([]);
    save({ order: newOrder, round: newRound, shouldTTS });
  };

  const damageCharacters = async (namesList: string[]) => {
    const checkedCharacters = order.filter((character) =>
      namesList.includes(character.name)
    );

    const { value: damage } = await showAlert({
      title: "Enter damage",
      html: `You're targeting the following character${namesList.length > 1 ? "s" : ""}:
        <br><br>${namesList.join("<br>")}`,
      inputLabel: "How much damage? Tip: enter a negative value for healing",
      input: "number",
      inputValidator: (value) => {
        if (!value) {
          return "Please provide a number";
        }
      },
    });

    if (damage) {
      sendLog(
        `${damage > 0 ? "damaged" : "healed"} ${namesList.join(", ")} for ${Math.abs(damage)}`
      );
      let newOrder = [...order];
      let killList: string[] = [];

      checkedCharacters.forEach(async (character) => {
        let parsedDamage = Number.parseInt(damage);

        if (Number.isInteger(parsedDamage)) {
          character.currentHealth -= parsedDamage;
          if (character.currentHealth <= 0 && character.isEnemy) {
            // enemies get removed directly when they die
            killList.push(character.name);
          } else if (character.currentHealth <= 0) {
            sendLog(`downed ${character.name}`);
            character.currentHealth = 0;
            // otherwise the entity gets moved before the active character
            const activeIndex = newOrder.findIndex((char) => char.active);

            if (activeIndex == 0) {
              // if the active character (the one who damages) is the first one, set it above it
              character.score = newOrder[0].score + 0.01;
            } else {
              // otherwise set it to the initiative score between the active character and the one before it
              character.score =
                newOrder[activeIndex].score +
                (newOrder[activeIndex - 1].score -
                  newOrder[activeIndex].score) /
                  2;

              // known bug: due to some float underflow, it's possible that upon iterating multiple times (50+),
              // the character will be set to the same initiative as the active character
            }
          }
        }
      });

      // we don't send the update to the server with save
      // because the delete will take care of it
      save({ order: newOrder, round: round, shouldTTS }, false);
      await deleteCharacters(killList, false);
    }
  };

  const clear = () => {
    showAlert({
      title: "Clear initiative?",
      text: `Do you want to clear the entire initiative? This will remove every character from the party!`,
      icon: "warning",
      confirmButtonText: "Clear",
    }).then((result) => {
      if (result.isConfirmed) {
        save({ order: [], round: 1, shouldTTS });
        sendLog(`cleared the order`);
      }
    });
  };

  const close = () => {
    showAlert({
      title: "Close initiative?",
      text: `Do you want to close the initiative? This will remove every character from the party and bring you back to the campaign selection!`,
      icon: "warning",
      confirmButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        save({ order: [], round: 1, shouldTTS, campaignId: "" });
        sendLog(`logged out`);
      }
    });
  };

  const restart = () => {
    showAlert({
      title: "Restart combat?",
      text: `Do you want to restart the combat? This will bring you back to the preparation phase.`,
      icon: "warning",
      confirmButtonText: "Restart",
    }).then((result) => {
      if (result.isConfirmed) {
        const newOrder = [...order];
        newOrder[newOrder.findIndex((character) => character.active)].active =
          false;
        save({ order: newOrder, round: 1, shouldTTS });
        sendLog(`restarted the fight`);
      }
    });
  };

  const next = () => {
    setShouldShowAddForm(false);
    const { newOrder, newRound } = advanceCharacter(order, round, shouldTTS);
    save({ order: newOrder, round: newRound, shouldTTS });
    sendLog(isCombatOngoing ? "advanced to next" : "started the fight");
  };

  // we're never updating the players with this method, hence the Partial
  const save = (newData: Partial<GameData>, sendUpdate = true) => {
    setOrder(newData.order!.toSorted(comparator));
    setRound(newData.round!);
    if (newData.campaignId) {
      setCampaignId(newData.campaignId);
    }
    setShouldTTS(newData.shouldTTS!);
    if (sendUpdate) {
      socket.emit("characters-change", newData);
    }
  };

  const getHealthValue = (character: Character) => {
    const health = getHealthDescription(character);
    // show numerical HPs only to the DM or if it's a player character
    if (isDM || character.isPlayer) {
      return {
        text: `${character.currentHealth} / ${character.totalHealth}`,
        color: health.color,
      };
    } else {
      return health;
    }
  };

  const loadOrder = async () => {
    showAlert({
      title: "Load default?",
      text: `Do you want to load the default party? This will overwrite the current order!`,
      icon: "warning",
      confirmButtonText: "Load",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newOrder = await loadInitiative();
        if (newOrder.success) {
          save({ order: newOrder.data[0].order, round: 1, shouldTTS });
          sendLog(`loaded order`);
        } else {
          console.error(newOrder.message);
          showAlert({
            title: "Error",
            text: "Couldn't load default party",
            icon: "error",
          });
        }
      }
    });
  };

  const saveOrder = async () => {
    showAlert({
      title: "Save default?",
      text: "Do you want save this party as default?",
      icon: "warning",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await saveInitiative(order);
        sendLog(`saved order`);
      }
    });
  };

  const loadFromNethys = async () => {
    let { link } = getFields();
    if (!link.value.startsWith("https://2e.aonprd.com")) {
      showAlert({
        title: "Invalid URL format",
        text: "The URL must be from Archive of Nethys (https://2e.aonprd.com)",
        icon: "error",
        confirmButtonText: "Ok",
        showCancelButton: false,
      });
      return;
    }

    setIsLoadingNethys(true);
    const data = await scrapeMonster(link.value);

    if (data.name) {
      clearFields();
      const { name, score, currentHealth, totalHealth, AC } = getFields();
      const parsedHP = data.HP!.split(" ")[0];
      name.value = data.name;
      score.value = data.perception!;
      currentHealth.value = parsedHP;
      totalHealth.value = parsedHP;
      AC.value = data.AC!.split(" ")[0];
    } else {
      showAlert({
        title: "Cannot fetch data",
        text: "Cannot get the data from the URL. Check that it's a valid monster page on Archive of Nethys and try again",
        icon: "error",
        confirmButtonText: "Ok",
        showCancelButton: false,
      });
    }
    setIsLoadingNethys(false);
  };

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket = io({
      auth: {
        nickname: session?.user.nickname ?? session?.user.firstName,
        email: session?.user.email ?? "unknown",
      },
    });

    socket.on("connect", () => {
      console.info("Connected to socket");
    });

    socket.on("update-characters", (data: GameData) => {
      console.info("Received update");
      setLastUpdate(new Date());
      setPlayers(data.players);
      setCampaignId(data.campaignId);
      save(data, false);

      // auto-scroll
      if (data.order[0]?.active) {
        document.body.scrollIntoView({ behavior: "smooth" });
      } else {
        document
          .querySelector("div .font-semibold")
          ?.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });

    socket.on("update-players", (data: Player[]) => {
      console.info("Received players update");
      setPlayers(data);
    });

    // a new log entry is received from the server
    socket.on("new-log", (message: LogData) => {
      setLogs((prevLogs) => [
        ...prevLogs,
        `${message.author} ${message.message}`,
      ]);
    });

    socket.on("reload", () => {
      location.reload();
    });
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      requestWakeLock();
    }
  };

  const handleKeypress = (e: any) => {
    if (e.key == "Enter") {
      // brokn
      // addCharacter();
    }
  };

  // prevent screen from sleeping, https://developer.chrome.com/articles/wake-lock
  const requestWakeLock = async () => {
    if (!navigator.wakeLock) {
      console.warn("Wake Lock API not supported");
      return;
    }

    try {
      await navigator.wakeLock.request();
    } catch (err) {
      console.error("Cannot acquire Wake Lock", err);
    }
  };

  const forceReload = () => {
    sendLog(`force-reloaded`);
    socket.emit("force-refresh");
    location.reload();
  };

  const sendLog = (message: string) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      `${session?.user.nickname ?? session?.user.firstName} ${message}`,
    ]);
    socket.emit("update-logs", message);
  };

  const bulkAdd = async () => {
    const { value: text } = await showAlert({
      input: "textarea",
      inputLabel:
        "Bulk add characters\nFormat: name, initiative, current hp, total hp[, enemy]\nNames MUST be unique!",
      inputPlaceholder: "Zombie,20,190,210,true\nLaura,25,150,150",
    });
    if (!text) {
      return;
    }

    const parsedText = parseBlock(text, session?.user.email);

    // validate that there are no duplicate names
    for (let character of parsedText) {
      if (order.find((char) => char.name === character.name)) {
        showAlert({
          title: "Duplicated entry",
          text: `Character ${character.name} already exists`,
          icon: "error",
        });
        console.error(`Duplicated entry: ${character.name}`);
        return;
      }
    }
    const newOrder = [...order, ...parsedText].toSorted(comparator);
    save({ order: newOrder, round: round, shouldTTS });
  };

  useEffect(() => {
    // we want to do this after we loaded the auth data, but only once
    if (socket) {
      return;
    }
    initializeSocket();
    requestWakeLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document
      .querySelector("#newCharacterName")
      ?.addEventListener("keyup", handleKeypress);
    document
      .querySelector("#newCharacterScore")
      ?.addEventListener("keyup", handleKeypress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    // if you don't have a character in the order, open the add form
    if (!isDM) {
      setShouldShowAddForm(
        order.findIndex(
          (character) => character.player === session?.user.email
        ) == -1
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    setIsDM(
      campaignId
        ? campaigns.some(
            (c) =>
              c._id?.toString() === campaignId &&
              c.dmEmail === session?.user.email
          )
        : (session?.user.roles.includes("dm") ?? false)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId]);

  // if no campaign is selected, we show the menu to all the potential DMs (role-based)
  if (!campaignId) {
    return isDM || isAdmin ? (
      <div>
        <div className="subtitle">Campaign selection</div>
        <div>Choose a campaign to start.</div>
        <Select
          options={[
            { name: "Please choose...", value: "" },
            ...campaigns.toReversed().map((el) => {
              return { name: el.name, value: el._id!.toString() };
            }),
          ]}
          onChange={(e) => {
            save({ order, round, shouldTTS, campaignId: e.target.value });
            sendLog(`chose ${e.target.selectedOptions[0].text}`);
          }}
        />
      </div>
    ) : (
      <div>Please wait...</div>
    );
  }

  return (
    <>
      <p className="text-lg">
        {isCombatOngoing ? `⚔️ Round ${round}` : "⏳ Preparing..."}
      </p>

      <div className="my-4 p-2 border rounded border-slate-600">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShouldShowAddForm(!shouldShowAddForm)}
        >
          <span className="subtitle !mb-0">
            {isEditing ? "Edit" : "Add"} character
          </span>
          {shouldShowAddForm ? <ChevronUp /> : <ChevronDown />}
        </div>

        {isPlayer && shouldShowAddForm ? (
          <div className="mt-2">
            <Textfield id="newCharacterName" placeholder="Name" required />
            <Textfield
              id="newCharacterScore"
              placeholder={
                isDM && !isEditing ? "Initiative modifier" : "Initiative score"
              }
              type="number"
              required
            />
            <Textfield
              id="newCharacterCurrentHealth"
              placeholder="Current HP"
              type="number"
            />
            <Textfield
              id="newCharacterTotalHealth"
              placeholder="Total HP"
              type="number"
            />
            <Textfield id="newCharacterAC" placeholder="AC" type="number" />
            <Textfield
              id="newCharacterNotes"
              placeholder={`Notes${isDM ? " (hidden)" : ""}`}
              type="text"
            />
            {isDM ? (
              <>
                <Textfield
                  id="newCharacterAmount"
                  placeholder="Amount"
                  type="number"
                />
                <Checkbox
                  label="Enemy"
                  checked={isEnemy}
                  onChange={(e) => setIsEnemy(e.target.checked)}
                />
                <div>
                  OR import from Nethys:
                  <Textfield id="nethysUrl" placeholder="URL" type="text" />
                  <Button
                    label="Load"
                    icon={<Upload />}
                    className={isLoadingNethys ? "animate-spin" : ""}
                    onClick={loadFromNethys}
                    disabled={isLoadingNethys}
                  />
                </div>
              </>
            ) : null}
            <div className="text-center">
              {isDM ? (
                <Button
                  label="Clear fields"
                  icon={<Delete />}
                  onClick={clearFields}
                />
              ) : null}
              <Button
                label={isEditing ? "Update" : "Add"}
                icon={isEditing ? <Check /> : <Plus />}
                onClick={addCharacter}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-between items-center">
        <div>
          {isDM ? (
            <Button
              label="Delete"
              icon={<Trash2 />}
              onClick={() => deleteCharacters(checkedEntities, true)}
              disabled={checkedEntities.length == 0}
            />
          ) : null}

          {isPlayer ? (
            <Button
              label="Damage"
              icon={<Crosshair />}
              onClick={() => damageCharacters(checkedEntities)}
              disabled={!isCombatOngoing || checkedEntities.length == 0}
            />
          ) : null}
        </div>

        {isPlayer ? (
          <Checkbox
            beeg={true}
            checked={
              checkedEntities.length > 0 &&
              checkedEntities.length == order.length
            }
            className="mr-2.5"
            onChange={() => {
              if (checkedEntities.length == order.length) {
                setCheckedEntities([]);
              } else {
                setCheckedEntities(order.map((character) => character.name));
              }
            }}
          />
        ) : null}
      </div>

      <div className="mt-4" id="order">
        {order.length === 0 ? (
          <p className="p-2">The party seems a little empty...</p>
        ) : null}
        {order.map((character) => {
          // we don't want to show enemies to players before the fight starts
          if (character.isEnemy && !isCombatOngoing && !isDM) return;

          const health = getHealthValue(character);
          return (
            <label
              key={character.name}
              className={`my-2 p-2 pl-0.5 flex justify-between items-center ${
                character.active
                  ? `border-${getCharacterType(character)} font-semibold`
                  : "border-slate-600"
              } transition-all duration-500 border-solid border-2`}
              htmlFor={character.name}
            >
              <div className="flex">
                <div className={`bg-${getCharacterType(character)} mr-2`}>
                  &nbsp;
                </div>
                <div>
                  <p className="text-lg">
                    {isDM && character.link ? (
                      <Link href={character.link} target="_blank">
                        {character.name}
                      </Link>
                    ) : (
                      character.name
                    )}{" "}
                    {character.notes && (isDM || character.isPlayer)
                      ? `(${character.notes})`
                      : ""}
                  </p>

                  <p className="text-sm italic flex items-center">
                    {isDM ? (
                      <>
                        <ChevronsRight />
                        {character.score.toFixed(3).replace(/\.?0+$/, "")}
                      </>
                    ) : null}

                    <Heart className="ml-2.5 mr-0.5" />
                    <span className={health.color}>{health.text}</span>

                    {(isDM || character.isPlayer) && character.AC ? (
                      <>
                        <Shield className="ml-2.5" />
                        {character.AC}
                      </>
                    ) : null}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                {isDM ? (
                  <Select
                    options={[
                      { name: "Ally", value: "ally" },
                      { name: "Enemy", value: "enemy" },
                      { name: "Player", value: "player" },
                      { name: "Unknown", value: "unknown" },
                    ]}
                    selectedItem={getCharacterType(character)}
                    onChange={(event) => {
                      const newOrder = [...order];
                      const index = newOrder.findIndex(
                        (char) => char.name === character.name
                      );
                      newOrder[index].isEnemy = event.target.value == "enemy";
                      newOrder[index].isPlayer = event.target.value == "player";
                      save({ order: newOrder, round: round, shouldTTS });
                    }}
                  />
                ) : null}
                {isPlayer && isCombatOngoing ? (
                  <Button
                    onClick={() => damageCharacters([character.name])}
                    tooltip="Damage"
                    icon={<Crosshair />}
                    className="!m-0 !p-2"
                  />
                ) : null}
                {isDM ? (
                  <>
                    <Button
                      onClick={() => editCharacter(character.name)}
                      tooltip="Edit"
                      icon={<Edit />}
                      className="!m-0 !ml-2 !p-2"
                    />
                    <Button
                      onClick={() => deleteCharacters([character.name], true)}
                      tooltip="Remove"
                      icon={<Trash2 />}
                      className="!m-0 !ml-2 !p-2"
                    />
                  </>
                ) : null}
                {isPlayer ? (
                  <Checkbox
                    id={character.name}
                    beeg={true}
                    checked={checkedEntities.includes(character.name)}
                    className="ml-2"
                    onChange={() => {
                      if (checkedEntities.includes(character.name)) {
                        setCheckedEntities(
                          checkedEntities.filter(
                            (entity) => entity !== character.name
                          )
                        );
                      } else {
                        setCheckedEntities([
                          ...checkedEntities,
                          character.name,
                        ]);
                      }
                    }}
                  />
                ) : null}
              </div>
            </label>
          );
        })}
      </div>

      <div className="sticky bottom-0 py-2 items-center bg-main-bg dark:bg-main-bg-dark flex justify-between">
        <div>
          {enemies} {enemies == 1 ? "enemy" : "enemies"} vs {allies}{" "}
          {allies == 1 ? "ally" : "allies"}
          {isEditing ? " (editing...)" : ""}
          <br />
          Last updated at {lastUpdate?.toTimeString()?.split(" ")[0]}
        </div>
        {isPlayer ? (
          <Button
            label={isCombatOngoing ? "Next" : "Start"}
            icon={isCombatOngoing ? <FastForward /> : <Play />}
            disabled={
              order.length === 0 || (!(isDM || isAdmin) && !isCombatOngoing)
            }
            onClick={next}
          />
        ) : null}
      </div>

      {isDM || isAdmin ? (
        <>
          <p className="subtitle">DM controls</p>
          <div>
            <Button label="Bulk add" icon={<Plus />} onClick={bulkAdd} />
            <Button label="Clear" icon={<Trash2 />} onClick={clear} />
            {isCombatOngoing ? (
              <Button label="Restart" icon={<RefreshCw />} onClick={restart} />
            ) : null}
            <Button label="Load" icon={<Upload />} onClick={loadOrder} />
            <Button label="Save" icon={<Save />} onClick={saveOrder} />
            <Button label="Resync" icon={<Loader />} onClick={forceReload} />
            <Button label="Close" icon={<LogOut />} onClick={close} />
            <Checkbox
              label="TTS"
              checked={shouldTTS}
              onChange={(e) => setShouldTTS(e.target.checked)}
            />
          </div>
        </>
      ) : null}

      {isDM ? (
        <span className="inline-block align-top mr-4">
          <p className="subtitle mt-4">Logs</p>
          <div>
            {logs.length == 0 ? "Nothing interesting thus far..." : null}
            {logs.toReversed().map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        </span>
      ) : null}

      <span className="inline-block align-top mr-8">
        <p className="subtitle mt-4">Connected players</p>
        {players.length == 0 ? "None for now :(" : null}
        {players.map((player) => (
          <div key={player.email + player.socketId}>
            {player.nickname}
            {player.email == session?.user.email ? " (you)" : null}
          </div>
        ))}
      </span>
    </>
  );
}
