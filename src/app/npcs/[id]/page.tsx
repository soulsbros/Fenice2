import { getNpcs } from "@/actions/npcs";
import CharacterButtons from "@/components/characterButtons";
import NpcInfo from "@/components/npcInfo";
import { NPC } from "@/types/API";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function SingleNpcPage({ params }: Readonly<Props>) {
  let { id } = params;
  let parsedId;
  try {
    parsedId = new ObjectId(id);
  } catch (err) {
    console.error(err);
    notFound();
  }

  const result = await getNpcs(undefined, { _id: parsedId });
  if (result.data.length === 0) {
    notFound();
  }
  const npc = result.data[0] as NPC;

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="title">{npc.name}</span>
        <CharacterButtons id={id} name={npc.name} isNpc />
      </div>

      {result.success ? <NpcInfo npc={npc} /> : result.message}
    </>
  );
}
