import { findSkill, getWikiURL } from "@/lib/skills";
import { notFound } from "next/navigation";
import { AlertTriangle, Book } from "react-feather";

interface Props {
  params: { skill: string; edition: string };
}

export default function SingleSkillPage({ params }: Readonly<Props>) {
  let { skill, edition } = params;
  skill = decodeURIComponent(skill);

  if (!findSkill(skill, edition)) {
    notFound();
  }

  return (
    <>
      <div className="flex space-x-4">
        {findSkill(skill, edition).armorPenalty && (
          <div className="flex space-x-2 mb-3">
            <AlertTriangle />
            <span>Armor penalty applies</span>
          </div>
        )}
        {findSkill(skill, edition).requiresTraining && (
          <div className="flex space-x-2 mb-3">
            <Book />
            <span>Requires training</span>
          </div>
        )}
      </div>

      <iframe
        title="wikiPage"
        src={getWikiURL(skill, edition)}
        loading="eager"
        className="w-full h-full"
      />
    </>
  );
}
