import { authOptions } from "@/lib/authConfig";
import { Campaign } from "@/types/API";
import { getServerSession } from "next-auth";
import { Edit3, Octagon, Users } from "react-feather";
import { IconLink, LevelUpButton } from "./button";

interface Props {
  campaign: Campaign;
  isCharacterPage: boolean;
}

const formatDateString = (campaign: Campaign) => {
  if (campaign.startDate == null && campaign.endDate == null) {
    return `Unknown`;
  }
  if (campaign.startDate?.toISOString() == campaign.endDate?.toISOString()) {
    return `The ${campaign.startDate.toLocaleDateString("en-CH")}`;
  }

  let dateString = "";
  if (campaign.startDate != null) {
    dateString += `From ${campaign.startDate.toLocaleDateString("en-CH")}`;
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
      <div>
        DM: {campaign.dm} - Type: {campaign.type}{" "}
        {campaign.level ? `- Level ${campaign.level}` : null}
        <br />
        {campaign.ruleset != "" ? (
          <>
            Ruleset: {`${campaign.ruleset}`}
            <br />
          </>
        ) : null}
        {formatDateString(campaign)} ({campaign.status})
      </div>

      <div className="mt-2">
        <IconLink
          href={`/alignment/by-campaign/${campaign._id}`}
          icon={<Octagon />}
          label="Alignment"
        />

        <IconLink
          href={`/${isCharacterPage ? "npcs" : "characters"}/by-campaign/${campaign._id}`}
          icon={<Users />}
          label={isCharacterPage ? "NPCs" : "Characters"}
        />

        {campaign.wikiLink ? (
          <IconLink
            href={campaign.wikiLink}
            icon={<Edit3 />}
            label="Wiki"
            target="_blank"
          />
        ) : null}

        {userData?.user.roles.includes("admin") &&
        campaign.status == "Ongoing" ? (
          <LevelUpButton campaignId={campaign._id!} />
        ) : null}
      </div>
    </div>
  );
}
