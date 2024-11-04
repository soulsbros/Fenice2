import { getCharacters } from "@/actions/characters";
import CharacterButtons from "@/components/characterButtons";
import CharacterInfo from "@/components/characterInfo";
import { authOptions } from "@/lib/authConfig";
import { Character } from "@/types/API";
import { ObjectId } from "mongodb";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const result = await getCharacters(undefined, {
      _id: new ObjectId(params.id),
    });
    const char = result.data[0] as Character;
    return {
      title: `${char.name}`,
    };
  } catch (err) {
    return {
      title: "Lost",
    };
  }
}

export default async function SingleCharacterPage({ params }: Readonly<Props>) {
  let { id } = params;
  let parsedId;
  try {
    parsedId = new ObjectId(id);
  } catch (err) {
    console.error(err);
    notFound();
  }

  const userData = await getServerSession(authOptions);
  const result = await getCharacters(undefined, { _id: parsedId });
  if (result.data.length === 0) {
    notFound();
  }
  const char = result.data[0] as Character;

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="title">{char.name}</span>
        {char?.playerEmail === userData?.user.email ? (
          <CharacterButtons id={id} name={char.name} />
        ) : null}
      </div>

      {result.success ? <CharacterInfo character={char} /> : result.message}
    </>
  );
}
