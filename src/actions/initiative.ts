"use server";

import { getWithFilter, insertDocs } from "@/lib/mongo";
import { Character } from "@/types/Initiative";

export async function saveInitiative(order: Character[]) {
  const newOrder = {
    order: order,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await insertDocs("initiative", [newOrder]);
  return { message: result.message };
}

export async function loadInitiative() {
  const doc = await getWithFilter("initiative", {
    field: "updatedAt",
    direction: "DESC",
  });
  return doc;
}
