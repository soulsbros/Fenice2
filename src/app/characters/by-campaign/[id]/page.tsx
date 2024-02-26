import { getCampaigns, getCharacters } from "@/actions/characters";
import CharacterCard from "@/components/characterCard";
import { Character } from "@/types/API";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "react-feather";

export default async function CharacterPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;
  let parsedId;
  try {
    parsedId = new ObjectId(id);
  } catch (err) {
    console.error(err);
    notFound();
  }

  const result = await getCharacters(
    {
      field: "name",
      direction: "ASC",
    },
    { campaignId: parsedId }
  );

  const campaign = await getCampaigns(undefined, { _id: parsedId });
  if (campaign.data.length === 0) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="title">{campaign.data[0].name}</span>
        <Link
          href={`/characters/new?c=${campaign.data[0]._id}`}
          className="primary button mb-4"
        >
          <Plus />
        </Link>
      </div>

      <div className="flex flex-wrap justify-around">
        {result.success
          ? result?.data.map((character: Character) => (
              <CharacterCard
                character={character}
                key={character._id?.toString()}
              />
            ))
          : result.message}
      </div>
    </>
  );
}
