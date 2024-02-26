import { getCharacters } from "@/actions/characters";
import CharacterCard from "@/components/characterCard";
import { Character } from "@/types/API";
import { notFound } from "next/navigation";

export default async function CharacterPage({
  params,
}: Readonly<{
  params: { email: string };
}>) {
  let { email } = params;
  const parsedEmail = decodeURIComponent(email);
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
                />
              ))
          : result.message}
      </div>
    </>
  );
}
