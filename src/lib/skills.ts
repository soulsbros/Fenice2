import { Edition } from "@/types/Skills";

export const findSkill = (skill: string, edition: string) =>
  editions
    .filter((ed) => ed.id === edition)[0]
    .skills.filter((el) => el.name.toLowerCase() === skill.toLowerCase())[0];

export const getWikiURL = (skillName: string, edition: string) => {
  switch (edition) {
    case editions[0].id:
      return `https://www.d20srd.org/srd/skills/${
        skillName[0].toLowerCase() + skillName.replaceAll(" ", "").slice(1)
      }.htm`;
    case editions[1].id:
      return `https://www.dandwiki.com/wiki/5e_SRD:${skillName.replaceAll(
        " ",
        "_"
      )}_Skill`;
    case editions[2].id:
      return (
        "https://2e.aonprd.com/Skills.aspx?ID=" +
        (editions[2].skills.findIndex(
          (el) => el.name.toLowerCase() === skillName.toLowerCase()
        ) +
          1)
      );
  }
};

export const editions: Edition[] = [
  {
    id: "DnD3.5",
    name: "D&D 3.5e",
    skills: [
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
        name: "Decipher Script",
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
        name: "Disable Device",
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
        name: "Escape Artist",
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
        name: "Gather Information",
        ability: "CHA",
        armorPenalty: false,
        requiresTraining: false,
      },
      {
        name: "Handle Animal",
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
        name: "Move Silently",
        ability: "DEX",
        armorPenalty: true,
        requiresTraining: false,
      },
      {
        name: "Open Lock",
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
        name: "Sense Motive",
        ability: "WIS",
        armorPenalty: false,
        requiresTraining: false,
      },
      {
        name: "Sleight of Hand",
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
        name: "Use Magic Device",
        ability: "CHA",
        armorPenalty: false,
        requiresTraining: true,
      },
      {
        name: "Use Psionic Device",
        ability: "CHA",
        armorPenalty: false,
        requiresTraining: true,
      },
      {
        name: "Use Rope",
        ability: "DEX",
        armorPenalty: false,
        requiresTraining: false,
      },
    ],
  },
  {
    id: "DnD5",
    name: "D&D 5e",
    skills: [
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
  },
  {
    id: "pf2",
    name: "Pathfinder 2e",
    skills: [
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
  },
];
