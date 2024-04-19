import { Character } from "@/types/API";

export function getValueFromAlignment(alignment: string, type: string) {
  if (alignment.toLowerCase() === "unknown") {
    return -999;
  }

  // lawful - chaotic scale
  if (type == "LC") {
    if (alignment.toLowerCase().includes("lawful")) {
      return -100;
    }
    if (alignment.toLowerCase().includes("chaotic")) {
      return 100;
    }
  }
  // good - evil scale
  if (type == "GE") {
    if (alignment.toLowerCase().includes("good")) {
      return -100;
    }
    if (alignment.toLowerCase().includes("evil")) {
      return 100;
    }
  }
  return 0;
}

export function getActualAlignment(character: Character) {
  if (
    !character ||
    (character.lawfulChaoticValue == -999 && character.goodEvilValue == -999)
  ) {
    return "Unknown";
  }

  let result = "";
  const THRESHOLD = 33;

  // -100  lawful  [-33  neutral  33]  chaotic  100
  if (character.lawfulChaoticValue < -THRESHOLD) {
    result += "Lawful";
  } else if (character.lawfulChaoticValue > THRESHOLD) {
    result += "Chaotic";
  } else {
    result += "Neutral";
  }

  // -100  good  [-33  neutral  33]  evil  100
  if (character.goodEvilValue < -THRESHOLD) {
    result += " good";
  } else if (character.goodEvilValue > THRESHOLD) {
    result += " evil";
  } else if (result != "Neutral") {
    // check to avoid "Neutral neutral" lol
    result += " neutral";
  }

  return result;
}

export const alignments = [
  "Unknown",
  "Chaotic Good",
  "Chaotic Neutral",
  "Chaotic Evil",
  "Neutral Good",
  "Neutral",
  "Neutral Evil",
  "Lawful Good",
  "Lawful Neutral",
  "Lawful Evil",
];
