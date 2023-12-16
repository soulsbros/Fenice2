import Card from "@/components/card";
import EditionChanger from "@/components/editionChanger";
import { editions } from "@/lib/skills";
import { Document } from "@/types/API";

export default async function DocumentsEdition({
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
    editions.find((ed) => ed.id === edition)?.name ?? edition;

  return (
    <>
      <div className="title">Documents {editionString}</div>

      <EditionChanger currentEdition={edition} type="documents" />

      {docs.length == 0 ? (
        "No documents found"
      ) : (
        <div className="flex flex-wrap justify-center sm:justify-between">
          {docs.map((doc: Document) => (
            <Card
              links={[{ text: "Read", url: doc.url }]}
              title={doc.filename}
              text={doc.category}
              key={doc.category + doc.filename}
            />
          ))}
        </div>
      )}
    </>
  );
}
