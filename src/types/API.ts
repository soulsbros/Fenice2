import { ObjectId } from "mongodb";

export interface Character {
  // ID must be optional for when we save a new one
  _id?: ObjectId;
  characterId?: number; // legacy ID
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
  actionsHistory: [];
  lawfulChaoticValue: number;
  goodEvilValue: number;
  backstory: string;
  personality: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

export interface NPC {
  // ID must be optional for when we save a new one
  _id?: ObjectId;
  campaignId: ObjectId;
  name: string;
  race: string;
  genre: string;
  pronouns: string;
  orientation: string;
  class: string;
  startAlignment: string;
  actualAlignment: string;
  actionsHistory: [];
  lawfulChaoticValue: number;
  goodEvilValue: number;
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
