"use client";

import Button from "@/components/button";
import Textfield from "@/components/textfield";
import { advanceCharacter, getHealthDescription } from "@/lib/initiative";
import { Character, GameData } from "@/types/Initiative";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ChevronsRight, Edit, Heart, Trash2 } from "react-feather";
import io from "socket.io-client";

let socket: any;

export default function Initiative() {
  const session = useSession();
  const [order, setOrder] = useState<Character[]>([]);
  const [turn, setTurn] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
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
    let enemy = document.querySelector(
      "#newCharacterEnemy"
    ) as HTMLInputElement;
    let notes = document.querySelector(
      "#newCharacterNotes"
    ) as HTMLInputElement;

    return { name, score, currentHealth, totalHealth, enemy, notes };
  };

  const addCharacter = () => {
    const { name, score, currentHealth, totalHealth, enemy, notes } =
      getFields();
    if (order.find((character) => character.name === name.value)) {
      alert(`Character ${name.value} already exists`);
      console.error("Character already exists", name.value, score.value);
      return;
    }

    if (order.find((character) => character.score == parseFloat(score.value))) {
      alert(`Initiative value ${score.value} already exists`);
      console.error("Score already exists", name.value, score.value);
      return;
    }

    if (!name.value || !score.value) {
      alert("Invalid input");
      console.error("Invalid input", name.value, score.value);
      return;
    }

    const newOrder = [
      ...order,
      {
        name: name.value,
        score: parseFloat(score.value),
        active: false,
        player: session.data?.user.email ?? "",
        isPlayer: !session.data?.user.roles.includes("dm"),
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
    enemy.checked = false;
    notes.value = "";
    save({ order: newOrder, turn: turn });
    setIsEditing(false);
  };

  const removeCharacter = (name: string) => {
    if (confirm(`Do you want to remove ${name} from the initiative?`)) {
      deleteCharacter(name);
    }
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

  const clear = () => {
    if (confirm(`Do you want to clear the entire initiative?`)) {
      save({ order: [], turn: 1 });
    }
  };

  const restart = () => {
    if (confirm(`Do you want to restart the combat?`)) {
      const newOrder = [...order];
      newOrder[newOrder.findIndex((character) => character.active)].active =
        false;
      newOrder[0].active = true;
      save({ order: newOrder, turn: 1 });
    }
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
    if ((document.querySelector("#autoAdvance") as HTMLInputElement)?.checked) {
      document
        .querySelector("div .bg-lime-500")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  function getHealthValue(character: Character) {
    const health = getHealthDescription(character);
    // show numerical HPs only to the DM or if it's a player character
    if (session.data?.user.roles.includes("dm") || character.isPlayer) {
      return {
        text: `${character.currentHealth} / ${character.totalHealth}`,
        color: health.color,
      };
    } else {
      return health;
    }
  }

  const renderOrder =
    order.length === 0 ? (
      <p className="p-2">The party seems a little empty...</p>
    ) : (
      order.map((character) => {
        const health = getHealthValue(character);
        return (
          <div
            key={character.name}
            className={`m-2 flex justify-between items-center ${
              character.active ? "bg-lime-500 font-semibold" : ""
            }`}
          >
            <div>
              <p
                className={`text-lg ${character.isEnemy ? "text-red-600" : ""}`}
              >
                {character.name}{" "}
                {character.notes &&
                (session.data?.user.roles.includes("dm") || character.isPlayer)
                  ? `(${character.notes})`
                  : ""}
              </p>
              <p className="text-sm italic flex space-x-2">
                <ChevronsRight /> {character.score}
                <Heart />
                <span className={health.color}>{health.text}</span>
              </p>
            </div>

            <div className="flex gap-x-1">
              {session.data?.user.roles.includes("dm") || character.isPlayer ? (
                <Button
                  onClick={() => editCharacter(character.name)}
                  tooltip="Edit character"
                  icon={<Edit />}
                />
              ) : null}
              <Button
                onClick={() => removeCharacter(character.name)}
                tooltip="Remove character"
                icon={<Trash2 />}
              />
            </div>
          </div>
        );
      })
    );

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

  const enemies = order.filter((e) => e.isEnemy).length;

  return (
    <>
      <p className="title">Initiative order</p>
      <p className="text-lg">Turn {turn}</p>
      <div className="m-4 border-solid border-2" id="order">
        {renderOrder}
      </div>

      <div className="mb-4">
        {enemies} enemies vs {order.length - enemies} allies
        {isEditing ? " (editing...)" : ""}
      </div>

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
        <label>
          Enemy <input type="checkbox" className="m-2" id="newCharacterEnemy" />
        </label>
        <Button label={isEditing ? "Update" : "Add"} onClick={addCharacter} />
      </div>

      <p className="subtitle">Controls</p>
      <div className="space-x-2">
        <Button label="Clear" onClick={clear} />
        {order.findIndex((character) => character.active) !== -1 ? (
          <Button label="Restart" onClick={restart} />
        ) : null}
        <Button
          label={
            order.findIndex((character) => character.active) === -1
              ? "Start"
              : "Next"
          }
          disabled={order.length === 0}
          onClick={next}
        />
        <label>
          <input type="checkbox" id="autoAdvance" defaultChecked /> Scroll
        </label>
      </div>
    </>
  );
}
