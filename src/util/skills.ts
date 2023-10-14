import { Edition } from "@/types/Skills";

export const findSkill = (skill: string, edition: Edition) =>
  skills[edition].filter(
    (el) => el.name.toLowerCase() === skill.toLowerCase()
  )[0];

export const getWikiURL = (skillName: string, edition: Edition) => {
  switch (edition) {
    case Edition.DnD3:
      return `https://www.d20srd.org/srd/skills/${skillName.toLowerCase()}.htm`;
    case Edition.DnD5:
      return `https://www.dandwiki.com/wiki/5e_SRD:${skillName.replaceAll(
        " ",
        "_"
      )}_Skill`;
    case Edition.pf2:
      const baseURL = "https://2e.aonprd.com/Skills.aspx?ID=";
      return (
        baseURL +
        (skills[Edition.pf2].findIndex(
          (el) => el.name.toLowerCase() === skillName.toLowerCase()
        ) +
          1)
      );
  }
};

export const skills = {
  [Edition.pf2]: [
    {
      name: "Acrobatics",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Arcana",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Athletics",
      ability: "STR",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Crafting",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Deception",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Diplomacy",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Intimidation",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Lore",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Medicine",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Nature",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Occultism",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Performance",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Religion",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Society",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Stealth",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Survival",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Thievery",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: false,
    },
  ],

  [Edition.DnD3]: [
    {
      name: "Appraise",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Autohypnosis",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Balance",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Bluff",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Climb",
      ability: "STR",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Concentration",
      ability: "CON",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Craft",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Decipher script",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Diplomacy",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Disable device",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Disguise",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Escape artist",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Forgery",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Gather information",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Handle animal",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Heal",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Hide",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Intimidate",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Jump",
      ability: "STR",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Knowledge",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Listen",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Move silently",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Open lock",
      ability: "DEX",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Perform",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Profession",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Psicraft",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Ride",
      ability: "DEX",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Search",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Sense motive",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Sleight of hand",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: true,
    },
    {
      name: "Spellcraft",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Spot",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Survival",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Swim",
      ability: "STR",
      armorPenalty: true,
      requiresTraining: false,
    },
    {
      name: "Tumble",
      ability: "DEX",
      armorPenalty: true,
      requiresTraining: true,
    },
    {
      name: "Use magic device",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Use psionic device",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: true,
    },
    {
      name: "Use rope",
      ability: "DEX",
      armorPenalty: false,
      requiresTraining: false,
    },
  ],
  [Edition.DnD5]: [
    {
      name: "Acrobatics",
      ability: "DEX",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Animal Handling",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Arcana",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Athletics",
      ability: "STR",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Deception",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "History",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Insight",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Intimidation",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Investigation",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Medicine",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Nature",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Perception",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Performance",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Persuasion",
      ability: "CHA",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Religion",
      ability: "INT",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Sleight of Hand",
      ability: "DEX",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Stealth",
      ability: "DEX",
      armorPenalty: false,
      requiresTraining: false,
    },
    {
      name: "Survival",
      ability: "WIS",
      armorPenalty: false,
      requiresTraining: false,
    },
  ],
};
