import { SubtextButton } from "@/components/button";
import EditionChanger from "@/components/editionChanger";
import { editions } from "@/lib/skills";

export default function SkillsEdition({
  params,
}: Readonly<{
  params: { edition: string };
}>) {
  let { edition } = params;
  const editionData = editions.find((e) => e.id === edition);
  if (!editionData) {
    return "No skills found";
  }

  return (
    <>
      <p className="title">Skills {editionData.name}</p>

      <EditionChanger currentEdition={edition} type="skills" />

      <div className="flex flex-wrap justify-center sm:justify-between">
        {editionData.skills.map((skill) => (
          <SubtextButton
            url={`/skills/${editionData.id}/${skill.name}`}
            title={skill.name}
            subtitle={skill.ability}
            key={skill.name}
          />
        ))}
      </div>
    </>
  );
}
