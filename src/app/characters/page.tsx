import { getDefaultCampaign } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function CharactersRootPage() {
  const campaign = await getDefaultCampaign();
  redirect(`/characters/by-campaign/${campaign}`);
}
