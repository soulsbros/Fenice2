"use client";

import Button from "@/components/button";
import { GameData, Player } from "@/types/Initiative";
import { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
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

    if (
      order.find((player) => player.name === name.value) ||
      !name.value ||
      !score.value
    ) {
      alert("Invalid input");
      console.error("Invalid input:", name.value, score.value);
      return;
    }

    const newOrder = [
      ...order,
      {
        name: name.value,
        score: parseFloat(score.value),
        active: false,
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

  const next = () => {
    const newOrder = [...order];
    let newTurn = turn;
    const currentPlayer = newOrder.findIndex((player) => player.active);
    if (currentPlayer != -1) {
      newOrder[currentPlayer].active = false;
    }
    newOrder[(currentPlayer + 1) % newOrder.length].active = true;

    if (currentPlayer === newOrder.length - 1) {
      newTurn = turn + 1;
    }
    save({ order: newOrder, turn: newTurn });
  };

  const save = (newData: GameData, sendUpdate = true) => {
    setOrder(newData.order);
    setTurn(newData.turn);
    if (sendUpdate) {
      socket.emit("players-change", newData);
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
            player.active ? "bg-lime-500" : ""
          }`}
        >
          <div>
            <p className="text-lg">{player.name}</p>
            <p className="text-sm italic">{player.score}</p>
          </div>
          <Button
            onClick={() => removeCharacter(player.name)}
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
      <Button label="Clear" onClick={clear} />
      <Button label="Next" onClick={next} />
    </>
  );
}
