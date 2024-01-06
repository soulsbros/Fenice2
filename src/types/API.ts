import { ObjectId } from "mongodb";

export interface Character {
  _id?: string | ObjectId;
  characterId: number;
  campaignId: ObjectId;
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
  image: string;
}

export interface Campaign {
  _id?: ObjectId;
  campaignId: number;
  name: string;
  type: string;
  dm: string;
  dmEmail: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

export interface Document {
  url: string;
  filename: string;
  category: string;
}
