"use client";

import { loadInitiative, saveInitiative } from "@/actions/initiative";
import Button from "@/components/button";
import Textfield from "@/components/textfield";
import { advanceCharacter, getHealthDescription } from "@/lib/initiative";
import { Character, GameData } from "@/types/Initiative";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronsRight,
  Crosshair,
  Edit,
  FastForward,
  Heart,
  Play,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
} from "react-feather";
import io from "socket.io-client";
import Swal from "sweetalert2";

let socket: any;

export default function Initiative() {
  const session = useSession();
  const [order, setOrder] = useState<Character[]>([]);
  const [turn, setTurn] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const comparator = (characterA: Character, characterB: Character) =>
    characterB.score - characterA.score;
  const isAdmin = session.data?.user.roles.includes("admin");
  const isTable = session.data?.user.roles.includes("table");
  const isDM = session.data?.user.roles.includes("dm");

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
    let enemy = document.querySelector(
      "#newCharacterEnemy"
    ) as HTMLInputElement;
    let notes = document.querySelector(
      "#newCharacterNotes"
    ) as HTMLInputElement;

    return { name, score, currentHealth, totalHealth, enemy, notes };
  };

  const addCharacter = async () => {
    const { name, score, currentHealth, totalHealth, enemy, notes } =
      getFields();
    let parsedScore = parseFloat(score.value);

    if (order.find((character) => character.name === name.value)) {
      Swal.fire({
        title: "Invalid input",
        text: `Character ${name.value} already exists`,
        icon: "error",
      });
      console.error("Character already exists", name.value, score.value);
      return;
    }

    if (order.find((character) => character.score == parsedScore)) {
      const oldIndex = order.findIndex(
        (character) => character.score == parsedScore
      );
      const result = await Swal.fire({
        title: "Conflict found",
        text: `Initiative value ${score.value} already exists. Who goes first?`,
        icon: "question",
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: order[oldIndex].name,
        confirmButtonText: name.value,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
      });
      if (result.isConfirmed) {
        // the new one goes first -> put them higher
        // take the midpoint between the conflicting and its previous one
        parsedScore =
          order[oldIndex].score +
          (order[oldIndex - 1]?.score || 99 - order[oldIndex].score) / 2;
      } else {
        // the already present one goes first -> put the new one lower
        // take the midpoint between the conflicting and its next one
        parsedScore =
          order[oldIndex].score -
          (order[oldIndex].score - order[oldIndex + 1]?.score || 1) / 2;
      }
    }

    if (!name.value || !score.value) {
      Swal.fire({
        title: "Invalid input",
        text: "Name or initiative value are missing",
        icon: "error",
      });
      console.error("Invalid input", name.value, score.value);
      return;
    }

    const newOrder = [
      ...order,
      {
        name: name.value,
        score: parsedScore,
        active: false,
        player: session.data?.user.email ?? "",
        isPlayer: !isDM,
        isEnemy: enemy.checked,
        currentHealth: parseInt(currentHealth.value) || 0,
        totalHealth: parseInt(totalHealth.value) || 0,
        notes: notes.value,
      },
    ].toSorted(comparator);

    name.value = "";
    score.value = "";
    currentHealth.value = "";
    totalHealth.value = "";
    notes.value = "";
    save({ order: newOrder, turn: turn });
    setIsEditing(false);
  };

  const removeCharacter = (name: string) => {
    Swal.fire({
      title: "Remove character?",
      text: `Do you want to remove ${name} from the initiative?`,
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCharacter(name);
      }
    });
  };

  const editCharacter = (currentCharacter: string) => {
    setIsEditing(true);
    const { name, score, currentHealth, totalHealth, enemy, notes } =
      getFields();

    const character =
      order[order.findIndex((character) => character.name == currentCharacter)];
    name.value = character.name;
    score.value = character.score.toString();
    currentHealth.value = character.currentHealth.toString();
    totalHealth.value = character.totalHealth.toString();
    enemy.checked = character.isEnemy;
    notes.value = character.notes;

    document
      .querySelector("#newCharacterName")
      ?.scrollIntoView({ behavior: "smooth" });

    deleteCharacter(currentCharacter);
  };

  const deleteCharacter = (currentCharacter: string) => {
    const isActive =
      order.find((character) => character.active)?.name === currentCharacter;
    let newOrder = order;
    let newTurn = turn;

    if (isActive) {
      const res = advanceCharacter(order, turn);
      newOrder = res.newOrder;
      newTurn = res.newTurn;
    }

    save({
      order: newOrder.filter(
        (character) => character.name !== currentCharacter
      ),
      turn: newTurn,
    });
  };

  const damageCharacter = async (currentCharacter: string) => {
    const { value: damage } = await Swal.fire({
      title: "Enter damage",
      inputLabel: "How much damage? Tip: enter a negative value for healing",
      input: "text",
      reverseButtons: true,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    if (damage) {
      const newOrder = [...order];
      const pos = newOrder.findIndex(
        (character) => character.name === currentCharacter
      );
      let parsedDamage = Number.parseInt(damage);
      if (damage.toLowerCase() === "full") {
        newOrder[pos].currentHealth = newOrder[pos].totalHealth;
        save({ order: newOrder, turn: turn });
      } else if (Number.isInteger(parsedDamage)) {
        newOrder[pos].currentHealth -= parsedDamage;
        save({ order: newOrder, turn: turn });
      }
    }
  };

  const clear = () => {
    Swal.fire({
      title: "Clear initiative?",
      text: `Do you want to clear the entire initiative? This will remove every character from the party!`,
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Clear",
    }).then((result) => {
      if (result.isConfirmed) {
        save({ order: [], turn: 1 });
      }
    });
  };

  const restart = () => {
    Swal.fire({
      title: "Restart combat?",
      text: `Do you want to restart the combat? This will bring you back to the preparation phase.`,
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Restart",
    }).then((result) => {
      if (result.isConfirmed) {
        const newOrder = [...order];
        newOrder[newOrder.findIndex((character) => character.active)].active =
          false;
        save({ order: newOrder, turn: 1 });
      }
    });
  };

  const next = () => {
    const { newOrder, newTurn } = advanceCharacter(order, turn);
    save({ order: newOrder, turn: newTurn });
  };

  const save = (newData: GameData, sendUpdate = true) => {
    setOrder(newData.order);
    setTurn(newData.turn);
    if (sendUpdate) {
      socket.emit("characters-change", newData);
    }
    if (
      (document.querySelector("#autoAdvance") as HTMLInputElement)?.checked ||
      isTable
    ) {
      document
        .querySelector("div .bg-lime-500")
        ?.scrollIntoView({ behavior: "smooth" });
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

  const countEnemies = () => {
    let enemies = 0;
    for (let character of order) {
      if (character.isEnemy) {
        // handles "Orc 1&2" and adds a minimum one
        enemies += character.name.split("&").length;
        // handles "Orcs 1-4"
        if (character.name.includes("-")) {
          for (let chunk of character.name.split("&")) {
            const pos = chunk.indexOf("-");
            enemies +=
              Number.parseInt(chunk[pos + 1]) - Number.parseInt(chunk[pos - 1]);
          }
        }
      }
    }
    return enemies;
  };

  const loadOrder = async () => {
    Swal.fire({
      title: "Load default?",
      text: `Do you want to load the default party? This will overwrite the current order!`,
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Load",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newOrder = await loadInitiative();
        if (newOrder.success) {
          save({ order: newOrder.data[0].order, turn: 1 });
        } else {
          console.error(newOrder.message);
          Swal.fire({
            title: "Error",
            text: "Couldn't load default party",
            icon: "error",
          });
        }
      }
    });
  };

  const saveOrder = async () => {
    Swal.fire({
      title: "Save default?",
      text: "Do you want save this party as default?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await saveInitiative(order);
      }
    });
  };

  const renderOrder = () => {
    if (order.length === 0) {
      return <p className="p-2">The party seems a little empty...</p>;
    }
    return order.map((character) => {
      const health = getHealthValue(character);
      return (
        <div
          key={character.name}
          className={`my-2 p-2 flex justify-between items-center ${
            character.active ? "bg-lime-500 font-semibold" : ""
          } transition-all duration-500 bor border-solid border-2 border-slate-800`}
        >
          <div>
            <p className={`text-lg ${character.isEnemy ? "text-red-600" : ""}`}>
              {character.name}{" "}
              {character.notes && (isDM || character.isPlayer)
                ? `(${character.notes})`
                : ""}
            </p>
            <p className="text-sm italic flex space-x-2">
              <ChevronsRight /> {character.score}
              <Heart />
              <span className={health.color}>{health.text}</span>
            </p>
          </div>

          <div className="flex">
            {(isDM || character.isPlayer) && !isTable ? (
              <Button
                onClick={() => editCharacter(character.name)}
                tooltip="Edit character"
                icon={<Edit />}
                className="!mb-0"
              />
            ) : null}
            {isDM ? (
              <Button
                onClick={() => removeCharacter(character.name)}
                tooltip="Remove character"
                icon={<Trash2 />}
                className="!mb-0"
              />
            ) : null}
            <Button
              onClick={() => damageCharacter(character.name)}
              tooltip="Damage character"
              icon={<Crosshair />}
              className="!mb-0"
            />
          </div>
        </div>
      );
    });
  };

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.info("Connected to socket");
    });

    socket.on("update-characters", (data: GameData) => {
      console.info("Received update");
      save(data, false);
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
      const wakeLock = await navigator.wakeLock.request();
      console.info("Screen Wake Lock acquired", wakeLock);
    } catch (err) {
      console.error("Cannot acquire Wake Lock", err);
    }
  };

  useEffect(() => {
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
  }, []);

  const enemies = countEnemies();
  const allies = order.filter((character) => !character.isEnemy).length;
  const isCombatOngoing =
    order.findIndex((character) => character.active) !== -1;

  return (
    <>
      <p className="title">Initiative order</p>
      <p className="text-lg">
        {isCombatOngoing ? `Turn ${turn}` : "Preparing..."}
      </p>

      <div className="m-4" id="order">
        {renderOrder()}
      </div>

      <div className="mb-4">
        {enemies} enemies vs {allies} allies
        {isEditing ? " (editing...)" : ""}
      </div>

      {!isTable ? (
        <>
          <p className="subtitle">{isEditing ? "Edit" : "Add"} character</p>
          <div className="m-4">
            <Textfield
              id="newCharacterName"
              placeholder="Character name"
              required
            />
            <Textfield
              id="newCharacterScore"
              placeholder="Initiative score"
              required
            />
            <Textfield
              id="newCharacterCurrentHealth"
              placeholder="Current health"
              type="number"
            />
            <Textfield
              id="newCharacterTotalHealth"
              placeholder="Total health"
              type="number"
            />
            <Textfield id="newCharacterNotes" placeholder="Notes" type="text" />
            <div className="text-center">
              <label className="mx-2">
                <input type="checkbox" id="newCharacterEnemy" /> Enemy
              </label>
              <Button
                label={isEditing ? "Update" : "Add"}
                icon={isEditing ? <Check /> : <Plus />}
                onClick={addCharacter}
              />
            </div>
          </div>

          <div className="sticky bottom-0 pb-2 bg-main-bg text-right">
            <Button
              label={isCombatOngoing ? "Next" : "Start"}
              icon={isCombatOngoing ? <FastForward /> : <Play />}
              disabled={order.length === 0}
              onClick={next}
            />
          </div>

          {isDM || isAdmin ? (
            <>
              <p className="subtitle">DM controls</p>
              <div>
                <Button label="Clear" icon={<Trash2 />} onClick={clear} />
                {isCombatOngoing ? (
                  <Button
                    label="Restart"
                    icon={<RefreshCw />}
                    onClick={restart}
                  />
                ) : null}
              </div>
              <div>
                <Button label="Load" icon={<Upload />} onClick={loadOrder} />
                <Button label="Save" icon={<Save />} onClick={saveOrder} />
              </div>
            </>
          ) : null}

          <label>
            <input type="checkbox" id="autoAdvance" defaultChecked />{" "}
            Auto-scroll
          </label>

          <p className="subtitle mt-4">HP color scale</p>
          <div>
            <p className="text-green-800">&gt;100% - Untouched</p>
            <p className="text-green-500">&gt;80% - Barely injured</p>
            <p className="text-yellow-600">&gt;60% - Lightly injured</p>
            <p className="text-orange-500">&gt;40% - Injured</p>
            <p className="text-red-600">&gt;20% - Gravely injured</p>
            <p className="text-red-800">&lt;20% - Near death</p>
          </div>
        </>
      ) : null}
    </>
  );
}
