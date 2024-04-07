import { ObjectId } from "mongodb";

interface BaseCharacter {
  // ID must be optional for when we save a new one
  _id?: ObjectId;
  campaignId: ObjectId;
  name: string;
  race: string;
  gender: string;
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
  images: string[];
}

export interface Character extends BaseCharacter {
  legacyCharacterId?: number;
  player: string;
  playerEmail: string;
}

export interface NPC extends BaseCharacter {
  status: string;
}

export interface Campaign {
  _id?: ObjectId;
  legacyCampaignId?: number;
  name: string;
  type: string;
  dm: string;
  dmEmail: string;
  status: string;
  startDate: Date;
  endDate: Date;
  endLevel: number | null;
  ruleset: string;
}

export interface Document {
  url: string;
  filename: string;
  category: string;
}
