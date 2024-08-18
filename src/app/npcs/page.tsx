import { getDefaultCampaign } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function NpcsRootPage() {
  const campaign = await getDefaultCampaign();
  redirect(`/npcs/by-campaign/${campaign}`);
}
