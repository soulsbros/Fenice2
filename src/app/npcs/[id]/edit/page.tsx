import { getNpcs } from "@/actions/npcs";
import CharacterForm from "@/components/characterForm";
import { NPC } from "@/types/API";
import { ObjectId } from "mongodb";

export default async function EditNpcPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = params;
  const result = await getNpcs(undefined, {
    _id: new ObjectId(id),
  });
  const previousData = result.data[0] as NPC;

  return (
    <>
      <div className="title">Edit NPC</div>
      {result.success ? (
        <CharacterForm previousData={previousData} isNpc />
      ) : (
        result.message
      )}
    </>
  );
}
