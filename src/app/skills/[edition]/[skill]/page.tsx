import { Edition } from "@/types/Skills";
import { findSkill, getWikiURL } from "@/util/skills";
import { AlertTriangle, Book } from "react-feather";

export default function Skills({
  params,
}: {
  params: { skill: string; edition: Edition };
}) {
  let { skill, edition } = params;
  skill = decodeURIComponent(skill);

  if (!findSkill(skill, edition)) {
    return "Not found";
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
