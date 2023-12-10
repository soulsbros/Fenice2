export interface Edition {
  id: string;
  name: string;
  skills: Skill[];
}

export type Ability = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface Skill {
  name: string;
  ability: Ability;
  armorPenalty: boolean;
  requiresTraining: boolean;
}
