import { getCharacters } from "@/app/actions";
import CharacterButtons from "@/components/characterButtons";
import CharacterInfo from "@/components/characterInfo";
import { authOptions } from "@/lib/authConfig";
import { Character } from "@/types/API";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function CharacterPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;
  const userData = await getServerSession(authOptions);
  const result = await getCharacters(undefined, { _id: new ObjectId(id) });
  const char = result.data[0] as Character;

  return (
    <>
      <div className="title">Character page</div>

      {result.success && char ? (
        <CharacterInfo character={char} trimTexts={false} />
      ) : (
        result.message ?? "Character not found"
      )}

      {char?.playerEmail === userData?.user.email ? (
        <CharacterButtons id={id} name={char.name} />
      ) : null}
    </>
  );
}
