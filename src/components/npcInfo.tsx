import defaultUser from "@/img/defaultUser.png";
import { getWithFilter } from "@/lib/mongo";
import { Campaign, NPC } from "@/types/API";
import Link from "next/link";
import { ReactElement } from "react";
import ImageWithFallback from "./imageWithFallback";

interface NpcInfoProps {
  npc: NPC;
}

function NpcAttribute(key: string, value: string | ReactElement) {
  return (
    <div className="flex mb-4">
      <div className="font-extrabold flex-1">{key}</div>
      <div className="flex-[2] m-auto">{value || "Unknown"}</div>
    </div>
  );
}

export default async function NpcInfo({ npc }: Readonly<NpcInfoProps>) {
  const campaignInfo = await getWithFilter("campaigns", undefined, {
    _id: npc.campaignId,
  });
  const campaign = campaignInfo?.data[0] as Campaign;

  return (
    <div className="mb-5 p-5 border rounded-md shadow-md">
      <div className="text-center">
        {npc.images.length === 0 ? "No NPC image(s)" : null}
        {npc.images.map((image) => (
          <ImageWithFallback
            src={image}
            fallbackSrc={defaultUser}
            alt={`Image for ${npc.name}`}
            width={300}
            height={300}
            className="rounded inline-block"
            key={image.substring(25)}
          />
        ))}
      </div>

      <div className="mt-4">
        {NpcAttribute(
          "Campaign",
          <Link href={`/npcs/by-campaign/${campaign._id}`} className="link">
            {campaign.name}
          </Link>
        )}
        {NpcAttribute("Status", npc.status)}
        {NpcAttribute("Class", npc.class)}
        {NpcAttribute("Race", npc.race)}
        {NpcAttribute(
          "Gender and pronouns",
          `${npc.gender}${npc.pronouns ? ", " : ""}${npc.pronouns}`
        )}
        {NpcAttribute("Sexual orientation", npc.orientation)}
        {NpcAttribute("Personality", npc.personality)}
        {NpcAttribute("Backstory", npc.backstory)}
      </div>
    </div>
  );
}
