export interface Player {
  name: string;
  score: number;
  active: boolean;
  health: string;
}

export interface GameData {
  order: Player[];
  turn: number;
}
