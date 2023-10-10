"use client";

import DiceBox from "@3d-dice/dice-box";
import { AdvancedRoller, DisplayResults } from "@3d-dice/dice-ui";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Button from "./button";

let rollDice = (notation: string) => {
  console.error("Dice not initialized yet");
};

let updateColor = (color: string) => {
  diceBox.updateConfig({ themeColor: color });
};

let diceBox: any;

export default function DiceRoller() {
  const searchParams = useSearchParams();
  const diceString = searchParams!.get("d");

  useEffect(() => {
    diceBox = new DiceBox("#dice-box", {
      assetPath: "/assets/",
      settleTimeout: 2000,
      themeColor: "#1e7098",
    });

    diceBox.init().then(async () => {
      const Display = new DisplayResults("#dice-box");

      const Roller = new AdvancedRoller({
        target: "#dice-box",
        onSubmit: (notation: any) => {
          diceBox.clear();
          Display.clear();
          diceBox.roll(notation);
        },
        onClear: () => {
          diceBox.clear();
          Display.clear();
        },
        onReroll: (rolls: any) => {
          rolls.forEach((roll: any) => diceBox.add(roll));
        },
        onResults: (results: any) => {
          Display.showResults(results);
        },
      });

      rollDice = (notation: string) => {
        Roller.onClear();
        Roller.form.firstElementChild.value = notation;
        Roller.submitForm(new Event("nothing"));
      };

      diceBox.onRollComplete = (results: any) => {
        Roller.handleResults(results);
      };

      if (diceString) {
        rollDice(diceString);
      }
    });
  }, [diceString]);

  return (
    <>
      <Button label="d20 advantage" onClick={() => rollDice("2d20kh1")} />
      <Button label="Fireball" onClick={() => rollDice("6d6")} />
      <Button label="Stat roll" onClick={() => rollDice("4d6dl1")} />
      <Button label="Holy shit" onClick={() => rollDice("200d20")} />

      <select
        id="colors"
        onChange={(option) => updateColor(option.target.value)}
        className="border rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
      >
        <option value="#1e7098">Blue</option>
        <option value="#07fc03">Green</option>
        <option value="#fca503">Orange</option>
        <option value="#34035e">Purple</option>
        <option value="#ff0000">Red</option>
      </select>

      <div id="dice-box" className="relative"></div>
    </>
  );
}
