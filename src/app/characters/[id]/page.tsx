import { getCharacters } from "@/app/actions";
import CharacterInfo from "@/components/characterInfo";
import { authOptions } from "@/lib/authConfig";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function CharacterPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;
  const userData = await getServerSession(authOptions);
  const result = await getCharacters(undefined, { _id: new ObjectId(id) });

  return (
    <>
      <div className="title">Character page</div>

      {result.success ? (
        <CharacterInfo character={result.data[0]} trimTexts={false} />
      ) : (
        result.message
      )}

      {result.data[0].playerEmail === userData?.user.email ? (
        <Link href={`/characters/${id}/edit`} className="primary button">
          Edit
        </Link>
      ) : null}
    </>
  );
}
