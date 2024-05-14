import { getCharacters } from "@/actions/characters";
import CharacterCard from "@/components/characterCard";
import { decrypt } from "@/lib/mongo";
import { Character } from "@/types/API";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function UserCharactersPage({ params }: Readonly<Props>) {
  let { id } = params;
  const parsedEmail = decrypt(id);
  const result = await getCharacters(undefined, { playerEmail: parsedEmail });

  if (result.data.length === 0) {
    notFound();
  }

  return (
    <>
      <div className="title">{result.data[0].player}</div>

      <div className="flex flex-wrap justify-around">
        {result.success
          ? result?.data
              .reverse()
              .map((character: Character) => (
                <CharacterCard
                  character={character}
                  key={character._id?.toString()}
                  showPlayer={false}
                />
              ))
          : result.message}
        {result.data.length == 0 ? "No characters found" : ""}
      </div>
    </>
  );
}
