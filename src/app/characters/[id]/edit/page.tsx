import { getCharacters } from "@/actions/characters";
import CharacterForm from "@/components/characterForm";
import { authOptions } from "@/lib/authConfig";
import { Character } from "@/types/API";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function EditCharacter({
  params,
}: Readonly<{
  params: { id: string };
}>) {
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
