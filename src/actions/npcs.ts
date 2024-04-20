"use server";

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

  const formImages = formData.getAll("images") as File[];
  let images = await parseImageFiles(formImages);

  const npc: NPC = {
    campaignId: new ObjectId(formData.get("campaignId")?.toString() ?? ""),
    name: formData.get("name")?.toString().trim() ?? "",
    race: formData.get("race")?.toString().trim() ?? "",
    gender: formData.get("gender")?.toString().trim() ?? "",
    pronouns: formData.get("pronouns")?.toString().trim() ?? "",
    orientation: formData.get("orientation")?.toString().trim() ?? "",
    class: formData.get("class")?.toString().trim() ?? "",
    status: formData.get("status")?.toString().trim() ?? "",
    backstory: formData.get("backstory")?.toString().trim() ?? "",
    personality: formData.get("personality")?.toString().trim() ?? "",
    images: images,
    createdAt: new Date(),
    updatedAt: new Date(),
    updatedBy: userData?.user.email,
  };

  const result = await insertDocs("npcs", [npc]);
  revalidatePath("/npcs");

  if (result.success) {
    redirect(`/npcs/by-campaign/${npc.campaignId}`);
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

  npc.name = formData.get("name")?.toString().trim() ?? npc.name;
  npc.pronouns = formData.get("pronouns")?.toString().trim() ?? npc.pronouns;
  npc.orientation =
    formData.get("orientation")?.toString().trim() ?? npc.orientation;
  npc.gender = formData.get("gender")?.toString().trim() ?? npc.gender;
  npc.race = formData.get("race")?.toString().trim() ?? npc.race;
  npc.class = formData.get("class")?.toString().trim() ?? npc.class;
  npc.status = formData.get("status")?.toString().trim() ?? npc.status;
  npc.backstory = formData.get("backstory")?.toString().trim() ?? npc.backstory;
  npc.personality =
    formData.get("personality")?.toString().trim() ?? npc.personality;
  npc.campaignId = new ObjectId(formData.get("campaignId")?.toString());
  npc.updatedAt = new Date();
  npc.updatedBy = userData?.user.email;
  npc.images = images;

  const result = await updateDoc("npcs", npc, {
    _id: id,
  });
  revalidatePath("/npcs");

  if (result.success) {
    redirect(`/npcs/by-campaign/${npc.campaignId}`);
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
    redirect(`/npcs/by-campaign/${npc.campaignId}`);
  }
  return { message: result.message };
}
