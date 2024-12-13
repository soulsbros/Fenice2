import { getCharacters } from "@/actions/characters";
import CharacterForm from "@/components/characterForm";
import { authOptions } from "@/lib/authConfig";
import { Character } from "@/types/API";
import { ObjectId } from "mongodb";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const result = await getCharacters(undefined, {
      _id: new ObjectId(params.id),
    });
    const title = `Edit ${(result.data[0] as Character).name}`;
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

export default async function EditCharacterPage({ params }: Readonly<Props>) {
  const { id } = params;
  const result = await getCharacters(undefined, {
    _id: new ObjectId(id),
  });
  const previousData = result.data[0] as Character;
  const userData = await getServerSession(authOptions);

  if (userData?.user.email !== previousData.playerEmail) {
    return <div className="title">Unauthorized</div>;
  }

  return (
    <>
      <div className="title">Edit character</div>
      {result.success ? (
        <CharacterForm previousData={previousData} />
      ) : (
        result.message
      )}
    </>
  );
}
