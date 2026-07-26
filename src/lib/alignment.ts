import { Character } from "@/types/API";

export const UNKNOWN_VALUE = -999;

export const alignmentsDnD = [
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

export const alignmentsDW = [
  "Unknown",
  "Good",
  "Neutral",
  "Evil",
  "Lawful",
  "Chaotic",
];

export function getValueFromAlignment(alignment: string, type: string) {
  if (alignment.toLowerCase() === "unknown") {
    return UNKNOWN_VALUE;
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
    (character.lawfulChaoticValue == UNKNOWN_VALUE &&
      character.goodEvilValue == UNKNOWN_VALUE)
  ) {
    return "Unknown";
  }

  // fix for Dungeon World - if we have only one word (Good/Neutral/Evil/etc.),
  // skip the calculations entirely
  if (character.startAlignment.split(" ").length == 1) {
    return character.startAlignment;
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
    result += " Good";
  } else if (character.goodEvilValue > THRESHOLD) {
    result += " Evil";
  } else if (result != "Neutral") {
    // check to avoid "Neutral neutral" lol
    result += " Neutral";
  }

  return result;
}
