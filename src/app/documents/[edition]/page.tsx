import { SubtextButton } from "@/components/button";
import Select from "@/components/select";
import { editions } from "@/lib/skills";
import { Document } from "@/types/API";
import { notFound } from "next/navigation";

interface Props {
  params: { edition: string };
}

export default async function DocumentsPage({ params }: Readonly<Props>) {
  let { edition } = params;
  const result = await fetch(
    `https://lafenice.soulsbros.ch/api/docs.php?folder=${edition}`
  );
  const docs = await result.json();

  const editionString = editions.find((ed) => ed.id === edition)?.name;
  if (!editionString) {
    notFound();
  }

  return (
    <>
      <div className="title">Documents {editionString}</div>

      <Select
        placeholder="Edition"
        options={editions.map((edition) => {
          return { name: edition.name, value: edition.id };
        })}
        redirectPath="/documents"
        selectedItem={edition}
      />

      {docs.length == 0 ? (
        "No documents found"
      ) : (
        <div className="flex flex-wrap justify-center sm:justify-between mt-4">
          {docs.map((doc: Document) => (
            <SubtextButton
              url={doc.url}
              title={doc.filename}
              subtitle={doc.category}
              key={doc.category + doc.filename}
            />
          ))}
        </div>
      )}
    </>
  );
}
