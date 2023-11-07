import { Character } from "@/types/Initiative";

export function advanceCharacter(order: Character[], turn: number) {
  const newOrder = [...order];
  let newTurn = turn;
  const currentCharacter = newOrder.findIndex((character) => character.active);
  if (currentCharacter != -1) {
    newOrder[currentCharacter].active = false;
  }
  newOrder[(currentCharacter + 1) % newOrder.length].active = true;

  if (currentCharacter === newOrder.length - 1) {
    newTurn = turn + 1;
  }
  return { newOrder, newTurn };
}

export function getHealthDescription(character: Character) {
  const percentage = character.currentHealth / character.totalHealth;
  if (percentage > 0.8) {
    return "Barely injured";
  } else if (percentage > 0.6) {
    return "Lightly injured";
  } else if (percentage > 0.4) {
    return "Injured";
  } else if (percentage > 0.2) {
    return "Gravely injured";
  } else if (percentage > 0) {
    return "Near death";
  } else {
    return "Unconscious";
  }
}
