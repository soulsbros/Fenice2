import { getCharacters } from "@/app/actions";
import CharacterForm from "@/components/characterForm";
import { Character } from "@/types/API";
import { ObjectId } from "mongodb";

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
