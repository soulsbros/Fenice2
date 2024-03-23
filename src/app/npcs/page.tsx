import { redirect } from "next/navigation";
import { getCampaigns } from "../../actions/characters";

export default async function NpcsRootPage() {
  const result = await getCampaigns();
  const campaign = result?.data.reverse()[0];

  redirect(`/npcs/by-campaign/${campaign._id}`);
}
