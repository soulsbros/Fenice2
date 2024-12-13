import { getNpcs } from "@/actions/npcs";
import CharacterForm from "@/components/characterForm";
import { NPC } from "@/types/API";
import { ObjectId } from "mongodb";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const result = await getNpcs(undefined, { _id: new ObjectId(params.id) });
    const title = `Edit ${(result.data[0] as NPC).name}`;
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

export default async function EditNpcPage({ params }: Readonly<Props>) {
  let { id } = params;
  let parsedId;
  try {
    parsedId = new ObjectId(id);
  } catch (err) {
    console.error(err);
    notFound();
  }

  const result = await getNpcs(undefined, {
    _id: new ObjectId(parsedId),
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
