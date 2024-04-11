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
import { Action, Character } from "@/types/API";
import { Document, Filter, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  const formImages = formData.getAll("images") as File[];
  let images = await parseImageFiles(formImages);

  const char: Character = {
    campaignId: new ObjectId(formData.get("campaignId")?.toString() ?? ""),
    player: userData?.user.nickname ?? userData?.user.firstName,
    playerEmail: userData?.user.email ?? "",
    name: formData.get("name")?.toString() ?? "",
    race: formData.get("race")?.toString() ?? "",
    gender: formData.get("gender")?.toString() ?? "",
    pronouns: formData.get("pronouns")?.toString() ?? "",
    orientation: formData.get("orientation")?.toString() ?? "",
    class: formData.get("class")?.toString() ?? "",
    startAlignment: alignment,
    actionsHistory: [],
    lawfulChaoticValue: getValueFromAlignment(alignment, "LC"),
    goodEvilValue: getValueFromAlignment(alignment, "GE"),
    backstory: formData.get("backstory")?.toString() ?? "",
    personality: formData.get("personality")?.toString() ?? "",
    images: images,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await insertDocs("characters", [char]);
  revalidatePath("/characters");

  if (result.success) {
    redirect(`/characters/by-campaign/${char.campaignId}`);
  }
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

  const alignment = formData.get("alignment")?.toString() ?? "";
  const formImages = formData.getAll("images") as File[];
  let images = [...char.images, ...(await parseImageFiles(formImages))];

  char.name = formData.get("name")?.toString() ?? char.name;
  char.pronouns = formData.get("pronouns")?.toString() ?? char.pronouns;
  char.orientation =
    formData.get("orientation")?.toString() ?? char.orientation;
  char.gender = formData.get("gender")?.toString() ?? char.gender;
  char.race = formData.get("race")?.toString() ?? char.race;
  char.class = formData.get("class")?.toString() ?? char.class;
  char.lawfulChaoticValue = getValueFromAlignment(alignment, "LC");
  char.goodEvilValue = getValueFromAlignment(alignment, "GE");
  char.backstory = formData.get("backstory")?.toString() ?? char.backstory;
  char.personality =
    formData.get("personality")?.toString() ?? char.personality;
  char.campaignId = new ObjectId(formData.get("campaignId")?.toString());
  char.player = userData?.user.nickname ?? userData?.user.firstName;
  char.updatedAt = new Date();
  char.images = images;

  const result = await updateDoc("characters", char, {
    _id: id,
  });
  revalidatePath("/characters");

  if (result.success) {
    redirect(`/characters/by-campaign/${char.campaignId}`);
  }
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

  if (result.success) {
    redirect(`/characters/by-campaign/${char.campaignId}`);
  }
  return { message: result.message };
}

export async function addAction(id: string, action: Action) {
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

  if (action.type === "Good" || action.type === "Evil") {
    let newValue = char.goodEvilValue + action.value;
    if (newValue < -100) {
      newValue = -100;
    } else if (newValue > 100) {
      newValue = 100;
    }
    char.goodEvilValue = newValue;
  } else {
    let newValue = char.lawfulChaoticValue + action.value;
    if (newValue < -100) {
      newValue = -100;
    } else if (newValue > 100) {
      newValue = 100;
    }
    char.lawfulChaoticValue = newValue;
  }
  char.actionsHistory.push(action);

  const result = await updateDoc("characters", char, {
    _id: new ObjectId(id),
  });
  revalidatePath("/characters");

  return { message: result.message, success: result.success };
}

export async function getActions(id: string) {
  const oldData = await getCharacters(undefined, {
    _id: new ObjectId(id),
  });
  const char = oldData.data[0] as Character;

  if (!oldData.success) {
    return { message: "Error: invalid character ID" };
  }

  return char.actionsHistory;
}
