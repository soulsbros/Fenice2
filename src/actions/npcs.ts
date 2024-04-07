"use server";

import { getValueFromAlignment } from "@/lib/alignment";
import { authOptions } from "@/lib/authConfig";
import {
  deleteDoc,
  getWithFilter,
  insertDocs,
  parseImageFiles,
  updateDoc,
} from "@/lib/mongo";
import { NPC } from "@/types/API";
import { Document, Filter, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getNpcs(
  sortingParam?: { field: string; direction: string },
  filter = {} as Filter<Document>
) {
  return await getWithFilter("npcs", sortingParam, filter);
}

export async function insertNpc(prevState: any, formData: FormData) {
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
  const formImages = formData.getAll("images") as File[];
  let images = await parseImageFiles(formImages);

  const npc: NPC = {
    campaignId: new ObjectId(formData.get("campaignId")?.toString() ?? ""),
    name: formData.get("name")?.toString() ?? "",
    race: formData.get("race")?.toString() ?? "",
    gender: formData.get("gender")?.toString() ?? "",
    pronouns: formData.get("pronouns")?.toString() ?? "",
    orientation: formData.get("orientation")?.toString() ?? "",
    class: formData.get("class")?.toString() ?? "",
    status: formData.get("status")?.toString() ?? "",
    startAlignment: alignment,
    actualAlignment: alignment,
    actionsHistory: [],
    lawfulChaoticValue: getValueFromAlignment(alignment, "LC"),
    goodEvilValue: getValueFromAlignment(alignment, "GE"),
    backstory: formData.get("backstory")?.toString() ?? "",
    personality: formData.get("personality")?.toString() ?? "",
    images: images,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await insertDocs("npcs", [npc]);
  revalidatePath("/npcs");

  if (result.success) {
    redirect(`/npcs/${npc.campaignId}`);
  }
  return { message: result.message };
}

export async function updateNpc(prevState: any, formData: FormData) {
  const userData = await getServerSession(authOptions);
  const id = new ObjectId(formData.get("_id")?.toString() ?? "");
  const oldData = await getNpcs(undefined, {
    _id: id,
  });
  const npc = oldData.data[0] as NPC;

  if (!oldData.success) {
    return { message: "Error: invalid NPC ID" };
  }
  if (!userData) {
    return { message: "Error: invalid user data. Try logging out and back in" };
  }
  if (
    !formData.get("name") ||
    !formData.get("race") ||
    !formData.get("class") ||
    !formData.get("alignment")
  ) {
    return { message: "Error: missing one or more required fields" };
  }

  const formImages = formData.getAll("images") as File[];
  let images = [...npc.images, ...(await parseImageFiles(formImages))];

  npc.name = formData.get("name")?.toString() ?? npc.name;
  npc.pronouns = formData.get("pronouns")?.toString() ?? npc.pronouns;
  npc.orientation = formData.get("orientation")?.toString() ?? npc.orientation;
  npc.gender = formData.get("gender")?.toString() ?? npc.gender;
  npc.race = formData.get("race")?.toString() ?? npc.race;
  npc.class = formData.get("class")?.toString() ?? npc.class;
  npc.status = formData.get("status")?.toString() ?? npc.status;
  npc.actualAlignment =
    formData.get("alignment")?.toString() ?? npc.actualAlignment;
  npc.backstory = formData.get("backstory")?.toString() ?? npc.backstory;
  npc.personality = formData.get("personality")?.toString() ?? npc.personality;
  npc.campaignId = new ObjectId(formData.get("campaignId")?.toString());
  npc.updatedAt = new Date();
  npc.images = images;

  const result = await updateDoc("npcs", npc, {
    _id: id,
  });
  revalidatePath("/npcs");

  if (result.success) {
    redirect(`/npcs/${npc.campaignId}`);
  }
  return { message: result.message };
}

export async function deleteNpc(id: string) {
  const userData = await getServerSession(authOptions);
  const oldData = await getNpcs(undefined, {
    _id: new ObjectId(id),
  });
  const npc = oldData.data[0] as NPC;

  if (!oldData.success) {
    return { message: "Error: invalid NPC ID" };
  }
  if (!userData) {
    return { message: "Error: invalid user data. Try logging out and back in" };
  }

  const result = await deleteDoc("npcs", {
    _id: new ObjectId(id),
  });
  revalidatePath("/npcs");

  if (result.success) {
    redirect(`/npcs/${npc.campaignId}`);
  }
  return { message: result.message };
}
