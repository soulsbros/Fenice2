import { getDefaultCampaign } from "@/lib/mongo";
import { redirect } from "next/navigation";

export default async function AlignmentRootPage() {
  const campaign = await getDefaultCampaign();
  redirect(`/alignment/by-campaign/${campaign}`);
}
