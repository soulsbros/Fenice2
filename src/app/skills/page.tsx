import { SubtextButton } from "@/components/button";
import { editions } from "@/lib/skills";

export default function Skills() {
  return (
    <>
      {editions.map((edition) => (
        <div key={edition.id}>
          <p className="font-semibold text-lg">{edition.name}</p>
          <div className="mb-4">
            {edition.skills.map((skill) => (
              <SubtextButton
                url={`/skills/${edition.id}/${skill.name}`}
                title={skill.name}
                subtitle={skill.ability}
                key={skill.name}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
