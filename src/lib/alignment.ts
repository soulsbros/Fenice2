export function getValueFromAlignment(alignment: string, type: string) {
  // lawful - chaotic scale
  if (type == "LC") {
    if (alignment.toLowerCase().includes("lawful")) {
      return 0;
    }
    if (alignment.toLowerCase().includes("chaotic")) {
      return 100;
    }
  }
  // good - evil scale
  if (type == "GE") {
    if (alignment.toLowerCase().includes("good")) {
      return 0;
    }
    if (alignment.toLowerCase().includes("evil")) {
      return 100;
    }
  }
  return 50;
}
