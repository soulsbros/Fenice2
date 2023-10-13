import { findSkill, getWikiURL } from "@/util/pf2skills";
import { Triangle } from "react-feather";

export default function Skills({ params }: { params: { skill: string } }) {
  let skill = params.skill;
  if (!findSkill(skill)) {
    return "Not found";
  }

  return (
    <>
      <div>
        {findSkill(skill).armorPenalty && (
          <div className="flex">
            <Triangle />
            <span>Armor penalty applies</span>
          </div>
        )}
        {findSkill(skill).requiresTraining && (
          <div className="flex">
            <Triangle />
            <span>Requires training</span>
          </div>
        )}
      </div>

      <iframe
        title="wikiPage"
        src={getWikiURL(skill)}
        loading="eager"
        className="w-full h-full"
      />
    </>
  );
}
