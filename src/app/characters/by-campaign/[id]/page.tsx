import { getCampaigns, getCharacters } from "@/actions/characters";
import CharacterCard from "@/components/characterCard";
import { Character } from "@/types/API";
import { ObjectId } from "mongodb";

export default async function CharacterPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;
  const result = await getCharacters(
    {
      field: "name",
      direction: "ASC",
    },
    { campaignId: new ObjectId(id) }
  );
  const campaign = await getCampaigns(undefined, { _id: new ObjectId(id) });

  return (
    <>
      <div className="title">Characters - {campaign.data[0].name}</div>

      <div className="flex flex-wrap justify-around m-5">
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
