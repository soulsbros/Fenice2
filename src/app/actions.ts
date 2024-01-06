"use server";

import { authOptions } from "@/lib/authConfig";
import { deleteDoc, getWithFilter, insertDocs, updateDoc } from "@/lib/mongo";
import { Character } from "@/types/API";
import { Document, Filter, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getCharacters(
  sortingParam?: { field: string; direction: string },
  filter = {} as Filter<Document>
) {
  return await getWithFilter("characters", sortingParam, filter);
}

export async function insertCharacter(prevState: any, formData: FormData) {
  const userData = await getServerSession(authOptions);

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

  const char: Character = {
    name: formData.get("name")?.toString() ?? "",
    // TODO fix those
    characterId: 999,
    image: "",
    // --
    campaignId: new ObjectId(formData.get("campaignId")?.toString() ?? ""),
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

  const result = await insertDocs("characters", [char]);

  return { message: result.message };
}

export async function updateCharacter(prevState: any, formData: FormData) {
  const userData = await getServerSession(authOptions);
  const id = new ObjectId(formData.get("_id")?.toString() ?? "");
  const oldData = await getCharacters(undefined, {
    _id: id,
  });
  const char = oldData.data[0] as Character;

  if (!oldData.success) {
    return { message: "Error: invalid character ID" };
  }
  if (!userData) {
    return { message: "Error: invalid user data. Try logging out and back in" };
  }
  if (userData?.user.email !== char.playerEmail) {
    return { message: "Error: you can only edit your character" };
  }
  if (
    !formData.get("name") ||
    !formData.get("race") ||
    !formData.get("class") ||
    !formData.get("alignment")
  ) {
    return { message: "Error: missing one or more required fields" };
  }

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

  const result = await updateDoc("characters", char, {
    _id: id,
  });

  return { message: result.message };
}

export async function deleteCharacter(id: string) {
  const userData = await getServerSession(authOptions);
  const oldData = await getCharacters(undefined, {
    _id: new ObjectId(id),
  });
  const char = oldData.data[0] as Character;

  if (!oldData.success) {
    return { message: "Error: invalid character ID" };
  }
  if (!userData) {
    return { message: "Error: invalid user data. Try logging out and back in" };
  }
  if (userData?.user.email !== char.playerEmail) {
    return { message: "Error: you can only delete your character" };
  }

  const result = await deleteDoc("characters", {
    _id: new ObjectId(id),
  });
  revalidatePath("/characters");

  return { message: result.message };
}
