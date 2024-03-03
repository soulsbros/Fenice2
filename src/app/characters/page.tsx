import { redirect } from "next/navigation";
import { getCampaigns } from "../../actions/characters";

export default async function Characters() {
  const result = await getCampaigns();
  const campaign = result?.data.reverse()[0];

  redirect(`/characters/by-campaign/${campaign._id}`);
}
