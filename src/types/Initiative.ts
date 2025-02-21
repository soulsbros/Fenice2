export interface Character {
  name: string;
  score: number;
  active: boolean;
  player: string;
  isPlayer: boolean;
  isEnemy: boolean;
  totalHealth: number;
  currentHealth: number;
  notes: string;
}

export interface Player {
  nickname: string;
  email: string;
  socketId: string;
}

export interface GameData {
  order: Character[];
  turn: number;
  shouldTTS: boolean;
  players: Player[];
}
