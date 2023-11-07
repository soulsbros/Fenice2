export interface Character {
  name: string;
  score: number;
  active: boolean;
  player: string;
  totalHealth: number;
  currentHealth: number;
}

export interface GameData {
  order: Character[];
  turn: number;
}
