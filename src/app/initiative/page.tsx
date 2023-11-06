"use client";

import Button from "@/components/button";
import { advancePlayer } from "@/lib/initiative";
import { GameData, Player } from "@/types/Initiative";
import { useEffect, useState } from "react";
import { ChevronsRight, Heart, Trash2 } from "react-feather";
import io from "socket.io-client";

let socket: any;

export default function Initiative() {
  const [order, setOrder] = useState<Player[]>([]);
  const [turn, setTurn] = useState(1);
  const comparator = (playerA: Player, playerB: Player) =>
    playerB.score - playerA.score;

  const addCharacter = () => {
    let name = document.querySelector("#newCharacterName") as HTMLInputElement;
    let score = document.querySelector(
      "#newCharacterScore"
    ) as HTMLInputElement;

    if (order.find((player) => player.name === name.value)) {
      alert(`Player ${name.value} already exists`);
      console.error("Player already exists", name.value, score.value);
      return;
    }

    if (order.find((player) => player.score == parseFloat(score.value))) {
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
        health: "Unknown", //TODO make it editable
      },
    ].toSorted(comparator);

    name.value = "";
    score.value = "";
    save({ order: newOrder, turn: turn });
  };

  const removeCharacter = (name: string) => {
    if (confirm(`Do you want to remove ${name} from the initiative?`)) {
      save({
        order: order.filter((player) => player.name !== name),
        turn: turn,
      });
    }
  };

  const clear = () => {
    if (confirm(`Do you want to clear the entire initiative?`)) {
      document.querySelector<HTMLInputElement>("#newCharacterName")!.value = "";
      document.querySelector<HTMLInputElement>("#newCharacterScore")!.value =
        "";
      save({ order: [], turn: 1 });
    }
  };

  const restart = () => {
    if (confirm(`Do you want to restart the combat?`)) {
      document.querySelector<HTMLInputElement>("#newCharacterName")!.value = "";
      document.querySelector<HTMLInputElement>("#newCharacterScore")!.value =
        "";
      const newOrder = [...order];
      newOrder[newOrder.findIndex((player) => player.active)].active = false;
      save({ order: newOrder, turn: 1 });
    }
  };

  const next = () => {
    const { newOrder, newTurn } = advancePlayer(order, turn);
    save({ order: newOrder, turn: newTurn });
  };

  const save = (newData: GameData, sendUpdate = true) => {
    setOrder(newData.order);
    setTurn(newData.turn);
    if (sendUpdate) {
      socket.emit("players-change", newData);
    }
    if ((document.querySelector("#autoAdvance") as HTMLInputElement)?.checked) {
      document
        .querySelector("div .bg-lime-500")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderOrder =
    order.length === 0 ? (
      <p className="p-2">The party seems a little empty...</p>
    ) : (
      order.map((player) => (
        <div
          key={player.name}
          className={`m-2 flex justify-between items-center ${
            player.active ? "bg-lime-500 font-semibold" : ""
          }`}
        >
          <div>
            <p className="text-lg">{player.name}</p>
            <p className="text-sm italic flex space-x-2">
              <ChevronsRight /> {player.score} <Heart />{" "}
              {player.health || "Unknown"}
            </p>
          </div>
          {!player.active ? (
            <Button
              onClick={() => removeCharacter(player.name)}
              icon={<Trash2 />}
            />
          ) : null}
        </div>
      ))
    );

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.info("Connected to socket");
    });

    socket.on("update-players", (data: GameData) => {
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
        <Button label="Add" onClick={addCharacter} />
      </div>

      <p className="font-semibold text-lg mb-4">Controls</p>

      <div className="space-x-2">
        <Button label="Clear" onClick={clear} />
        {order.findIndex((player) => player.active) !== -1 ? (
          <>
            <Button label="Restart" onClick={restart} />
          </>
        ) : null}
        <Button
          label={
            order.findIndex((player) => player.active) === -1 ? "Start" : "Next"
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
