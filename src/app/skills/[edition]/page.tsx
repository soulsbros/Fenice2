import { SubtextButton } from "@/components/button";
import Select from "@/components/select";
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

      <Select
        placeholder="Edition"
        options={editions.map((edition) => {
          return { name: edition.name, value: edition.id };
        })}
        redirectPath="/skills"
        selectedItem={edition}
      />

      <div className="flex flex-wrap justify-center sm:justify-between mt-4">
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
