import Card from "@/components/card";
import EditionChanger from "@/components/editionChanger";
import { editions } from "@/lib/skills";
import { Document } from "@/types/API";

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
    editions.find((ed) => ed.id === edition)?.name ?? edition;

  return (
    <>
      <div className="title">Documents {editionString}</div>

      <EditionChanger currentEdition={edition} />

      {docs.length == 0 ? (
        "No documents found"
      ) : (
        <div className="">
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
