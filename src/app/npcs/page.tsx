import { getDefaultCampaign } from "@/lib/mongo";
import { redirect } from "next/navigation";

export default async function NpcsRootPage() {
  const campaign = await getDefaultCampaign();
  redirect(`/npcs/by-campaign/${campaign}`);
}
