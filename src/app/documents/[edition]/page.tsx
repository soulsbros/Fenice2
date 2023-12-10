import EditionChanger from "@/components/editionChanger";
import { editions } from "@/lib/skills";
import { Document } from "@/types/API";
import Link from "next/link";

export default async function Documents({
  params,
}: Readonly<{
  params: { edition: string };
}>) {
  let { edition } = params;
  const result = await fetch(
    `https://lafenice.soulsbros.ch/api/docs.php?folder=${edition}`
  );
  const docs = await result.json();
  const editionString =
    editions.find((ed) => ed.id === edition)?.name || edition;

  return (
    <>
      <div className="title">Documents {editionString}</div>

      <EditionChanger currentEdition={edition} />

      {docs.length == 0
        ? "No documents found"
        : docs.map((doc: Document) => (
            <Link
              href={doc.url}
              className="block"
              key={doc.category + doc.filename}
            >
              {doc.filename} ({doc.category})
            </Link>
          ))}
    </>
  );
}
