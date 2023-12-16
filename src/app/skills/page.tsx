import Card from "@/components/card";
import { editions } from "@/lib/skills";
import { Edition } from "@/types/Skills";

export default function Skills() {
  return (
    <>
      <div className="title">Skills</div>

      <div className="space-x-10">
        {editions.map((edition: Edition) => (
          <Card
            links={[{ text: "Explore", url: `/skills/${edition.id}` }]}
            title={edition.name}
            key={edition.id}
          />
        ))}
      </div>
    </>
  );
}
