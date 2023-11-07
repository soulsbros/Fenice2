"use client";

import Button from "@/components/button";
import { advanceCharacter, getHealthDescription } from "@/lib/initiative";
import { Character, GameData } from "@/types/Initiative";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ChevronsRight, Heart, Trash2 } from "react-feather";
import io from "socket.io-client";

let socket: any;

export default function Initiative() {
  const session = useSession();
  const [order, setOrder] = useState<Character[]>([]);
  const [turn, setTurn] = useState(1);
  const comparator = (characterA: Character, characterB: Character) =>
    characterB.score - characterA.score;

  const addCharacter = () => {
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
        currentHealth: parseInt(totalHealth.value) || 0,
        totalHealth: parseInt(currentHealth.value) || 0,
      },
    ].toSorted(comparator);

    name.value = "";
    score.value = "";
    currentHealth.value = "";
    totalHealth.value = "";
    save({ order: newOrder, turn: turn });
  };

  const removeCharacter = (name: string) => {
    if (confirm(`Do you want to remove ${name} from the initiative?`)) {
      const isActive =
        order.find((character) => character.active)?.name === name;
      let newOrder = order;
      let newTurn = turn;

      if (isActive) {
        const res = advanceCharacter(order, turn);
        newOrder = res.newOrder;
        newTurn = res.newTurn;
      }

      save({
        order: newOrder.filter((character) => character.name !== name),
        turn: newTurn,
      });
    }
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
    if (
      session.data?.user.roles.includes("dm") ||
      character.player === session.data?.user.email
    ) {
      return `${character.currentHealth} / ${character.totalHealth}`;
    } else {
      return getHealthDescription(character);
    }
  }

  const renderOrder =
    order.length === 0 ? (
      <p className="p-2">The party seems a little empty...</p>
    ) : (
      order.map((character) => (
        <div
          key={character.name}
          className={`m-2 flex justify-between items-center ${
            character.active ? "bg-lime-500 font-semibold" : ""
          }`}
        >
          <div>
            <p className="text-lg">{character.name}</p>
            <p className="text-sm italic flex space-x-2">
              <ChevronsRight /> {character.score} <Heart />{" "}
              {getHealthValue(character)}
            </p>
          </div>
          <Button
            onClick={() => removeCharacter(character.name)}
            icon={<Trash2 />}
          />
        </div>
      ))
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
      //TODO fix eventlistener resetting initiative
      // addCharacter();
    }
  };

  // prevent screen from sleeping, https://developer.chrome.com/articles/wake-lock
  const requestWakeLock = async () => {
    if (!navigator.wakeLock) {
      console.error("Wake Lock API not supported");
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

  return (
    <>
      <p className="font-semibold text-xl mb-2">Initiative order</p>

      <p className="text-lg">Turn {turn}</p>

      <div className="m-4 border-solid border-2" id="order">
        {renderOrder}
      </div>

      <p className="font-semibold text-lg">Add character</p>
      <div className="m-4">
        <input
          className="p-2 m-2"
          id="newCharacterName"
          type="text"
          placeholder="Character name"
        />
        <input
          className="p-2 m-2"
          id="newCharacterScore"
          type="number"
          placeholder="Initiative score"
        />
        <input
          className="p-2 m-2"
          id="newCharacterCurrentHealth"
          type="number"
          placeholder="Current health"
        />
        <input
          className="p-2 m-2"
          id="newCharacterTotalHealth"
          type="number"
          placeholder="Total health"
        />
        <Button label="Add" onClick={addCharacter} />
      </div>

      <p className="font-semibold text-lg mb-4">Controls</p>

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
          onClick={next}
        />
        <label>
          <input type="checkbox" id="autoAdvance" defaultChecked /> Scroll
        </label>
      </div>
    </>
  );
}
