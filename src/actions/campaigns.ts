"use server";

import { updateFields } from "@/lib/mongo";
import { Campaign, Character } from "@/types/API";
import { ObjectId } from "mongodb";
import { getCampaigns, getCharacters } from "./characters";

// Increases the level of the given campaign by 1
export async function levelUp(campaignId: ObjectId) {
  return await updateFields(
    "campaigns",
    { $inc: { level: 1 } },
    { _id: new ObjectId(campaignId) }
  );
}

// Returns the set of campaigns where a user has a character in.
// If includeDM is true, also add the ones where they were the DM
export async function getUserCampaigns(email: string, includeDM = false) {
  const characters = await getCharacters(undefined, {
    playerEmail: email,
  });
  const campaigns = await getCampaigns();

  return campaigns.data.filter(
    (campaign: Campaign) =>
      characters.data.some((character: Character) =>
        character.campaignId.equals(campaign._id)
      ) ||
      (includeDM && campaign.dmEmail === email)
  );
}

// Returns the set of campaigns that a user was DM for.
export async function getDMCampaigns(email: string) {
  const campaigns = await getCampaigns();

  return campaigns.data.filter(
    (campaign: Campaign) => campaign.dmEmail === email
  );
}
