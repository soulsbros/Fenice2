import { Campaign } from "@/types/API";
import { redirect } from "next/navigation";
import { getCampaigns } from "../../actions/characters";

export default async function AlignmentRootPage() {
  const result = await getCampaigns();
  const campaign = result?.data.reverse()[0] as Campaign;

  redirect(`/alignment/by-campaign/${campaign._id}`);
}
