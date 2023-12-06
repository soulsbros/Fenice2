"use server";

import { authOptions } from "@/lib/authConfig";
import { getWithFilter, insertDocs, updateDoc } from "@/lib/mongo";
import { Character } from "@/types/API";
import { Document, Filter, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export async function getCharacters(
  sortingParam?: string,
  filter = {} as Filter<Document>
) {
  return await getWithFilter("characters", sortingParam, filter);
}

export async function insertCharacter(prevState: any, formData: FormData) {
  const userData = await getServerSession(authOptions);
  const char: Character = {
    name: formData.get("name")?.toString() ?? "",
    // TODO fix those IDs
    characterId: 999,
    campaignId: 999,
    player: userData?.user.name?.split(" ")[0] ?? "",
    playerEmail: userData?.user.email ?? "",
    pronouns: formData.get("pronouns")?.toString() ?? "",
    orientation: formData.get("orientation")?.toString() ?? "",
    genre: formData.get("genre")?.toString() ?? "",
    race: formData.get("race")?.toString() ?? "",
    class: formData.get("class")?.toString() ?? "",
    startAlignment: formData.get("alignment")?.toString() ?? "",
    actualAlignment: formData.get("alignment")?.toString() ?? "",
    backstory: formData.get("backstory")?.toString() ?? "",
    personality: formData.get("personality")?.toString() ?? "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!userData) {
    return { message: "Error: invalid user data. Try logging out and back in" };
  }
  if (
    !formData.get("name") ||
    !formData.get("race") ||
    !formData.get("class") ||
    !formData.get("alignment")
  ) {
    return { message: "Error: missing required data" };
  }

  const result = await insertDocs("characters", [char]);

  return { message: result.message };
}

export async function updateCharacter(prevState: any, formData: FormData) {
  const userData = await getServerSession(authOptions);
  const id = new ObjectId(formData.get("_id")?.toString() ?? "");
  const oldData = await getCharacters(undefined, {
    _id: id,
  });

  if (!oldData.success) {
    return { message: "Error: invalid character ID" };
  }
  const char = oldData.data[0];

  char.name = formData.get("name")?.toString() ?? char.name;
  char.pronouns = formData.get("pronouns")?.toString() ?? char.pronouns;
  char.orientation =
    formData.get("orientation")?.toString() ?? char.orientation;
  char.genre = formData.get("genre")?.toString() ?? char.genre;
  char.race = formData.get("race")?.toString() ?? char.race;
  char.class = formData.get("class")?.toString() ?? char.class;
  char.actualAlignment =
    formData.get("alignment")?.toString() ?? char.actualAlignment;
  char.backstory = formData.get("backstory")?.toString() ?? char.backstory;
  char.personality =
    formData.get("personality")?.toString() ?? char.personality;
  char.updatedAt = new Date();

  if (!userData) {
    return { message: "Error: invalid user data. Try logging out and back in" };
  }
  if (
    !formData.get("name") ||
    !formData.get("race") ||
    !formData.get("class") ||
    !formData.get("alignment")
  ) {
    return { message: "Error: missing required data" };
  }

  const result = await updateDoc("characters", char, {
    _id: id,
  });

  return { message: result.message };
}
