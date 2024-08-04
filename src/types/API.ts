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
  backstory: string;
  personality: string;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  songLinks: string[];
}

export interface Character extends BaseCharacter {
  legacyCharacterId?: number;
  player: string;
  playerEmail: string;
  // all alignment fields are exclusive to Characters
  startAlignment: string;
  actionsHistory: Action[];
  lawfulChaoticValue: number;
  goodEvilValue: number;
}

export interface NPC extends BaseCharacter {
  status: string;
  updatedBy: string;
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
  wikiLink?: string;
}

export interface Document {
  url: string;
  filename: string;
  category: string;
}

export interface Action {
  type: string;
  timestamp: Date;
  reason: string;
  value: number;
}
