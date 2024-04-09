export function getValueFromAlignment(alignment: string, type: string) {
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
