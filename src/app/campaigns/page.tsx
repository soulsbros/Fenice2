import { getCampaigns } from "@/actions/characters";
import CampaignInfo from "@/components/campaignInfo";
import { Campaign } from "@/types/API";
import Link from "next/link";

export default async function CampaignsPage() {
  const result = await getCampaigns();
  const campaigns = result.data as Campaign[];

  return campaigns.map((campaign) => (
    <div key={campaign._id!.toString()} className="mb-6">
      <div className="subtitle">{campaign.name}</div>
      <CampaignInfo campaign={campaign} />
      <Link href={`/characters/by-campaign/${campaign._id}`} className="link">
        See characters
      </Link>
      {" - "}
      <Link href={`/npcs/by-campaign/${campaign._id}`} className="link">
        See NPCs
      </Link>
    </div>
  ));
}
