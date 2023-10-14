export enum Edition {
  pf2 = "pf2e",
  DnD3 = "DnD3",
  DnD5 = "DnD5",
}

export type Ability = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface Skill {
  name: string;
  ability: Ability;
  armorPenalty: boolean;
  requiresTraining: boolean;
}
