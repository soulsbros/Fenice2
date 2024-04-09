import { getCampaigns, getCharacters } from "@/actions/characters";
import Canvas from "@/components/alignment/canvas";
import Select from "@/components/select";
import { Campaign, Character } from "@/types/API";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

export default async function AlignmentDetailPage({
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

  const campaigns = await getCampaigns();
  const campaign = campaigns.data.filter((campaign: Campaign) =>
    parsedId.equals(campaign._id)
  )[0] as Campaign;
  if (!campaign) {
    notFound();
  }

  const result = await getCharacters(
    {
      field: "name",
      direction: "ASC",
    },
    { campaignId: parsedId }
  );

  return (
    <>
      <Select
        placeholder="Campaign"
        redirectPath="/alignment/by-campaign"
        selectedItem={parsedId.toString()}
        options={campaigns.data.reverse().map((el) => {
          return { name: el.name, value: el._id.toString() };
        })}
      />
      <Canvas characters={result.data as Character[]} />
    </>
  );
}
