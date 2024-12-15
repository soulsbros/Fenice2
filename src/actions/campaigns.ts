"use server";

import { updateFields } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function levelUp(campaignId: ObjectId) {
  return await updateFields(
    "campaigns",
    { $inc: { level: 1 } },
    { _id: new ObjectId(campaignId) }
  );
}
