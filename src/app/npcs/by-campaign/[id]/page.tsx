import { getCampaigns } from "@/actions/characters";
import { getNpcs } from "@/actions/npcs";
import NpcCard from "@/components/npcCard";
import Select from "@/components/select";
import { Campaign, NPC } from "@/types/API";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "react-feather";

export default async function CampaignNpcsPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;
  let parsedId: ObjectId;
  try {
    parsedId = new ObjectId(id);
  } catch (err) {
    console.error(err);
    notFound();
  }

  const result = await getNpcs(
    {
      field: "name",
      direction: "ASC",
    },
    { campaignId: parsedId }
  );

  const campaigns = await getCampaigns();
  const campaign = campaigns.data.filter((campaign: Campaign) =>
    parsedId.equals(campaign._id)
  );
  if (campaign.length === 0) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="title">NPCs</span>
        <Link
          href={`/npcs/new?c=${campaign[0]._id}`}
          className="primary button mb-4"
        >
          <Plus />
        </Link>
      </div>

      <Select
        placeholder="Campaign"
        redirectPath="/npcs/by-campaign"
        selectedItem={parsedId.toString()}
        options={campaigns.data.reverse().map((el) => {
          return { name: el.name, value: el._id.toString() };
        })}
      />

      <div className="flex flex-wrap justify-around mt-2">
        {result.success
          ? result?.data.map((npc: NPC) => (
              <NpcCard npc={npc} key={npc._id?.toString()} />
            ))
          : result.message}
        {result.data.length == 0 ? "No NPCs found" : ""}
      </div>
    </>
  );
}
