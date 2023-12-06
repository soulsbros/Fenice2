import { ObjectId } from "mongodb";

export interface Character {
  _id?: string | ObjectId;
  characterId: number;
  campaignId: number;
  player: string;
  playerEmail: string;
  name: string;
  race: string;
  genre: string;
  pronouns: string;
  orientation: string;
  class: string;
  startAlignment: string;
  actualAlignment: string;
  backstory: string;
  personality: string;
  createdAt: Date;
  updatedAt: Date;
}
