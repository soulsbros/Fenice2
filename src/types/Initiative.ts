export interface Player {
  name: string;
  score: number;
  active: boolean;
}

export interface GameData {
  order: Player[];
  turn: number;
}
