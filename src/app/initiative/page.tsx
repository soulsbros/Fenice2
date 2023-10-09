"use client";

import Button from "@/components/button";
import { useState } from "react";

interface Player {
  name: string;
  score: number;
  active: boolean;
}

export default function Initiative() {
  const [order, setOrder] = useState<Player[]>([]);
  const [position, setPosition] = useState(0);
  const comparator = (playerA: Player, playerB: Player) =>
    playerB.score - playerA.score;

  const addCharacter = () => {
    let name = document.querySelector("#newCharacterName") as HTMLInputElement;
    let score = document.querySelector(
      "#newCharacterScore"
    ) as HTMLInputElement;

    //TODO check for double names

    if (name && score) {
      setOrder(
        [
          ...order,
          { name: name.value, score: parseInt(score.value), active: false },
        ].toSorted(comparator)
      );
      name.value = "";
      score.value = "";
    }
  };

  const removeCharacter = (name: string) => {
    setOrder(order.filter((player) => player.name !== name));
  };

  const sort = () => {
    setOrder(order.toSorted(comparator));
  };

  const clear = () => {
    setOrder([]);
    setPosition(0);
    document.querySelector<HTMLInputElement>("#newCharacterName")!.value = "";
    document.querySelector<HTMLInputElement>("#newCharacterScore")!.value = "";
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
    setOrder(newOrder);
    setPosition((position + 1) % newOrder.length);
  };

  const renderOrder =
    order.length === 0 ? (
      <p className="p-2">Empty</p>
    ) : (
      order.map((player) => (
        <div key={player.name} className="m-2 flex justify-between">
          <p className={player.active ? "text-green-700" : ""}>
            {player.name} ({player.score})
          </p>
          <Button onClick={() => removeCharacter(player.name)} label="Remove" />
        </div>
      ))
    );

  return (
    <>
      <p className="font-semibold text-lg">Initiative order</p>

      <div className="m-4 border-solid border-2" id="order">
        {renderOrder}
      </div>

      <div className="flex justify-between mt-3 mb-3">
        <input id="newCharacterName" type="text" placeholder="Character name" />
        <input
          id="newCharacterScore"
          type="number"
          placeholder="Initiative score"
        />
        <Button label="Add character" onClick={addCharacter} />
      </div>

      <Button label="Sort" onClick={sort} />
      <Button label="Clear" onClick={clear} />
      <Button label="Next" onClick={next} />
    </>
  );
}
