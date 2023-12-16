import Card from "@/components/card";
import { editions } from "@/lib/skills";
import { Edition } from "@/types/Skills";

export default async function Documents() {
  return (
    <>
      <div className="title">Documents</div>

      <div className="space-x-10">
        {editions.map((edition: Edition) => (
          <Card
            links={[
              { text: "Explore", url: `/documents/${edition.id}` },
              {
                text: "Download all",
                url: `https://lafenice.soulsbros.ch/docs/docs${edition.id}.zip`,
              },
            ]}
            title={edition.name}
            key={edition.id}
          />
        ))}
      </div>
    </>
  );
}
