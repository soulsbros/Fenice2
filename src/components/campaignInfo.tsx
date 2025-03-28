import { authOptions } from "@/lib/authConfig";
import { Campaign } from "@/types/API";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { LevelUpButton } from "./button";

interface Props {
  campaign: Campaign;
  isCharacterPage: boolean;
}

const formatDateString = (campaign: Campaign) => {
  let dateString = "";
  if (campaign.startDate == null && campaign.endDate == null) {
    return ` - Unknown date`;
  }
  if (campaign.startDate?.toISOString() == campaign.endDate?.toISOString()) {
    return ` - The ${campaign.startDate.toLocaleDateString("en-CH")}`;
  }
  if (campaign.startDate != null) {
    dateString += ` - From ${campaign.startDate.toLocaleDateString("en-CH")}`;
  }
  if (campaign.endDate != null) {
    dateString += ` to ${campaign.endDate.toLocaleDateString("en-CH")}`;
  }
  return dateString;
};

export default async function CampaignInfo({
  campaign,
  isCharacterPage,
}: Readonly<Props>) {
  const userData = await getServerSession(authOptions);

  return (
    <div className="my-2">
      DM: {campaign.dm} - Type: {campaign.type}
      {campaign.ruleset != "" ? ` - Ruleset: ${campaign.ruleset}` : null}
      {formatDateString(campaign)} ({campaign.status}
      {campaign.level ? `, level ${campaign.level}` : null})
      <div className="mt-2">
        <Link
          href={`/alignment/by-campaign/${campaign._id}`}
          className="primary button"
        >
          Alignment
        </Link>
        {isCharacterPage ? (
          <Link
            href={`/npcs/by-campaign/${campaign._id}`}
            className="primary button"
          >
            NPCs
          </Link>
        ) : (
          <Link
            href={`/characters/by-campaign/${campaign._id}`}
            className="primary button"
          >
            Characters
          </Link>
        )}

        {campaign.wikiLink ? (
          <Link
            href={campaign.wikiLink}
            className="primary button"
            target="_blank"
          >
            Wiki page
          </Link>
        ) : null}

        {userData?.user.roles.includes("admin") ? (
          <LevelUpButton campaignId={campaign._id!} />
        ) : null}
      </div>
    </div>
  );
}
