import { getCampaigns } from "@/actions/characters";
import { getNpcs } from "@/actions/npcs";
import CampaignInfo from "@/components/campaignInfo";
import NpcCard from "@/components/npcCard";
import Select from "@/components/select";
import { Campaign, NPC } from "@/types/API";
import { ObjectId } from "mongodb";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "react-feather";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const campaign = await getCampaigns(undefined, {
      _id: new ObjectId(params.id),
    });
    const title = `NPCs ${(campaign.data[0] as Campaign).name}`;
    return {
      title: title,
      openGraph: {
        title: title,
      },
    };
  } catch (err) {
    return {
      title: "Lost",
    };
  }
}

export default async function CampaignNpcsPage({ params }: Readonly<Props>) {
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
      field: "createdAt",
      direction: "DESC",
    },
    { campaignId: parsedId }
  );

  const campaigns = await getCampaigns();
  const campaign = campaigns.data.filter((campaign: Campaign) =>
    parsedId.equals(campaign._id)
  )[0] as Campaign;
  if (!campaign) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="title !mb-0">NPCs</div>
        <Link
          href={`/npcs/new?c=${campaign._id}`}
          className="primary button mb-4"
        >
          <Plus />
        </Link>
      </div>

      <Select
        redirectPath="/npcs/by-campaign"
        selectedItem={parsedId.toString()}
        options={campaigns.data.reverse().map((el) => {
          return { name: el.name, value: el._id.toString() };
        })}
      />

      <CampaignInfo campaign={campaign} isCharacterPage={false} />

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
