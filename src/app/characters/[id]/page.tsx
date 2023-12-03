import CharacterInfo from "@/components/characterInfo";
import fetcher from "@/lib/fetcher";
import Link from "next/link";

export default async function CharacterPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;
  const characterData = await fetcher(`/api/characters?id=${id}`);

  return (
    <>
      <div className="title">Character page</div>

      <CharacterInfo character={characterData[0]} trimTexts={false} />

      <Link href={`/characters/${id}/edit`} className="button">
        Edit
      </Link>
    </>
  );
}
