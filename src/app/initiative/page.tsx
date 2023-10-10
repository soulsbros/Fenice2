"use client";

import Button from "@/components/button";
import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Player {
  name: string;
  score: number;
  active: boolean;
}

let socket: any;

export default function Initiative() {
  const storageKey = "initiative";
  const [order, setOrder] = useState<Player[]>([]);
  const [position, setPosition] = useState(0);
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
      { name: name.value, score: parseInt(score.value), active: false },
    ].toSorted(comparator);

    name.value = "";
    score.value = "";
    save(newOrder);
  };

  const removeCharacter = (name: string) => {
    save(order.filter((player) => player.name !== name));
  };

  const sort = () => {
    const newOrder = order.toSorted(comparator);
    setOrder(newOrder);
    save(newOrder);
  };

  const clear = () => {
    setOrder([]);
    setPosition(0);
    document.querySelector<HTMLInputElement>("#newCharacterName")!.value = "";
    document.querySelector<HTMLInputElement>("#newCharacterScore")!.value = "";
    save([]);
  };

  const next = () => {
    const newOrder = order;
    for (let i = 0; i < newOrder.length; i++) {
      if (i == position) {
        newOrder[i].active = true;
      } else {
        newOrder[i].active = false;
      }
    }
    save(newOrder);
    setPosition((position + 1) % newOrder.length);
  };

  const save = (newOrder: Player[], sendUpdate = true) => {
    setOrder(newOrder);
    localStorage.setItem(storageKey, JSON.stringify(newOrder));
    if (sendUpdate) {
      socket.emit("players-change", JSON.stringify(newOrder));
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
            player.active ? "text-green-700" : ""
          }`}
        >
          {player.name} ({player.score})
          <Button onClick={() => removeCharacter(player.name)} label="Remove" />
        </div>
      ))
    );

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("update-players", (data: string) => {
      console.log("Received update");
      save(JSON.parse(data), false);
    });
  };

  useEffect(() => {
    initializeSocket();
    setOrder(JSON.parse(localStorage.getItem(storageKey) ?? "[]"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className="font-semibold text-xl">Initiative order</p>

      <div className="m-4 border-solid border-2" id="order">
        {renderOrder}
      </div>

      <p className="font-semibold text-lg">Add character</p>
      <div className="flex m-4 space-x-3">
        <input
          className="p-2"
          id="newCharacterName"
          type="text"
          placeholder="Character name"
        />
        <input
          className="p-2"
          id="newCharacterScore"
          type="number"
          placeholder="Initiative score"
        />
        <Button label="Add" onClick={addCharacter} />
      </div>

      <p className="font-semibold text-lg mb-4">Controls</p>
      <Button label="Sort" onClick={sort} />
      <Button label="Clear" onClick={clear} />
      <Button label="Next" onClick={next} />
    </>
  );
}
