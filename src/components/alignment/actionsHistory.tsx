"use client";

import { getActions } from "@/actions/characters";
import { Action, Character } from "@/types/API";
import { useEffect, useState } from "react";
import Select from "../select";

interface ActionsHistoryProps {
  characters: Character[];
}

export default function ActionsHistory({
  characters,
}: Readonly<ActionsHistoryProps>) {
  const [character, setCharacter] = useState(characters[0]._id!.toString());
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getActions(character);
      setActions(response as Action[]);
    }
    fetchData();
  }, [character]);

  return (
    <div className="inline-block align-top">
      <Select
        placeholder="Character history"
        selectedItem={character}
        onChange={(e) => setCharacter(e.target.value)}
        options={characters.map((el) => {
          return { name: el.name, value: el._id!.toString() };
        })}
      />

      <div className="mt-2">
        {actions.length === 0
          ? "No actions yet"
          : actions.map((action) => (
              <div key={action.timestamp.toISOString()} className="mb-4">
                {action.reason || "Unknown"} ({action.type},{" "}
                {Math.abs(action.value)})
              </div>
            ))}
      </div>
    </div>
  );
}
