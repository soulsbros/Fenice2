"use client";

import { addAction } from "@/actions/characters";
import { Action, Character } from "@/types/API";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../button";
import Select from "../select";

interface CharacterActionProps {
  characters: Character[];
}

export default function CharacterAction({
  characters,
}: Readonly<CharacterActionProps>) {
  const [actionWeight, setActionWeight] = useState(1);
  const [character, setCharacter] = useState(characters[0]._id!.toString());
  const [reason, setReason] = useState("");

  const session = useSession();
  const isDM = session?.data?.user.roles.includes("dm");
  const isAdmin = session?.data?.user.roles.includes("admin");
  if (!isAdmin && !isDM) {
    return;
  }

  const handleClick = async (actionType: string) => {
    let val = actionWeight;

    if (actionType === "Good" || actionType === "Lawful") {
      val = -actionWeight;
    }
    let action: Action = {
      type: actionType,
      timestamp: new Date(),
      reason: reason,
      value: val,
    };

    const result = await addAction(character, action);
    setReason("");
    let timerInterval: NodeJS.Timeout;
    Swal.fire({
      title: "Character updated",
      html: result.message,
      icon: result.success ? "success" : "error",
      timer: result.success ? 1500 : undefined,
      timerProgressBar: result.success,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  return (
    <div>
      <Select
        placeholder="Character"
        selectedItem={character}
        onChange={(e) => setCharacter(e.target.value)}
        options={characters.map((el) => {
          return { name: el.name, value: el._id!.toString() };
        })}
      />
      <div className="inline-block m-2">
        <label htmlFor="reasonInput">Action reason</label>
        <br />
        <input
          id="reasonInput"
          type="text"
          className="p-2 m-2"
          onChange={(e) => setReason(e.target.value)}
          value={reason}
        />
      </div>
      <div className="inline-block m-2">
        <label htmlFor="actionWeight">Action weight</label>
        <br />
        <input
          id="actionWeight"
          min={0}
          type="number"
          className="p-2 m-2"
          onChange={(e) => setActionWeight(parseFloat(e.target.value) || 0)}
          value={actionWeight}
        />
      </div>

      <div className="text-center mb-4">
        <Button onClick={() => handleClick("Good")} label="Good action" />
        <br />
        <Button onClick={() => handleClick("Lawful")} label="Lawful action" />
        <Button onClick={() => handleClick("Chaotic")} label="Chaotic action" />
        <br />
        <Button onClick={() => handleClick("Evil")} label="Evil action" />
      </div>
    </div>
  );
}
