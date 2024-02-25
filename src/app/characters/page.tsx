import { Campaign } from "@/types/API";
import Link from "next/link";
import { getCampaigns } from "../../actions/characters";

export default async function Characters() {
  const result = await getCampaigns();

  return (
    <>
      <div className="title">Characters</div>

      <div>
        {result.success
          ? result?.data.reverse().map((campaign: Campaign) => (
              <div key={campaign._id?.toString()} className="mb-2">
                <Link
                  href={`/characters/by-campaign/${campaign._id}`}
                  className="font-bold"
                >
                  {campaign.name}
                </Link>
                <br />
                {campaign.type} - from{" "}
                {campaign.startDate
                  ? campaign.startDate.toLocaleDateString("en-CH")
                  : "?"}{" "}
                to {campaign.endDate?.toLocaleDateString("en-CH") || "?"} (
                {campaign.status})
              </div>
            ))
          : result.message}
      </div>
    </>
  );
}
