"use server";

import { getValueFromAlignment } from "@/lib/alignment";
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

export async function getCampaigns(
  sortingParam?: { field: string; direction: string },
  filter = {} as Filter<Document>
) {
  return await getWithFilter("campaigns", sortingParam, filter);
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

  const alignment = formData.get("alignment")?.toString() ?? "";
  let image = "";
  const imageFile = formData.get("image") as File;
  const buffer = await imageFile.arrayBuffer();
  if (buffer.byteLength > 0) {
    image = "data:image/jpeg;base64," + Buffer.from(buffer).toString("base64");
  }

  const char: Character = {
    campaignId: new ObjectId(formData.get("campaignId")?.toString() ?? ""),
    player: userData?.user.name?.split(" ")[0] ?? "",
    playerEmail: userData?.user.email ?? "",
    name: formData.get("name")?.toString() ?? "",
    race: formData.get("race")?.toString() ?? "",
    genre: formData.get("genre")?.toString() ?? "",
    pronouns: formData.get("pronouns")?.toString() ?? "",
    orientation: formData.get("orientation")?.toString() ?? "",
    class: formData.get("class")?.toString() ?? "",
    startAlignment: alignment,
    actualAlignment: alignment,
    actionsHistory: [],
    lawfulChaoticValue: getValueFromAlignment(alignment, "LC"),
    goodEvilValue: getValueFromAlignment(alignment, "GE"),
    backstory: formData.get("backstory")?.toString() ?? "",
    personality: formData.get("personality")?.toString() ?? "",
    image: image,
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

  const imageFile = formData.get("image") as File;
  const buffer = await imageFile.arrayBuffer();
  let image = char.image;
  if (buffer.byteLength > 0) {
    image = "data:image/jpeg;base64," + Buffer.from(buffer).toString("base64");
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
  char.campaignId = new ObjectId(formData.get("campaignId")?.toString());
  char.updatedAt = new Date();
  char.image = image;

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
