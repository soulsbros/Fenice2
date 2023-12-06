import { getCharacters } from "@/app/actions";
import CharacterInfo from "@/components/characterInfo";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function CharacterPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;
  const result = await getCharacters(undefined, { _id: new ObjectId(id) });

  return (
    <>
      <div className="title">Character page</div>

      {result.success ? (
        <>
          <CharacterInfo character={result.data[0]} trimTexts={false} />

          <Link href={`/characters/${id}/edit`} className="primary button">
            Edit
          </Link>
        </>
      ) : (
        "Not found"
      )}
    </>
  );
}
