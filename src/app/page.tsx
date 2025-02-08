import { getCampaigns } from "@/actions/characters";
import Countdown from "@/components/countdown";
import DiceRoller from "@/components/diceRoller";
import { fetchNextSession } from "@/lib/calendarEvents";
import { Campaign } from "@/types/API";
import Link from "next/link";

export default async function Home() {
  const countdownDate = await fetchNextSession();

  let result = await getCampaigns(
    { field: "name", direction: "DESC" },
    { status: "Ongoing" }
  );
  const campaigns = (result.data.reverse() as Campaign[]) ?? [];

  return (
    <>
      <div className="title">Welcome!</div>
      <div className="mb-4">
        This is the website for our D&D group. Feel free to start exploring by
        browsing the tabs in the menu! More features to come ＼(＾O＾)／
        <br />
        Pictures and audio recordings are still hosted on the{" "}
        <Link href="https://lafenice.soulsbros.ch" className="link">
          old website
        </Link>{" "}
        for now.
      </div>

      <div className="subtitle">Active campaigns</div>
      <div className="mb-4">
        {campaigns.length == 0
          ? "None for now :("
          : campaigns.map((campaign) => (
              <div key={campaign._id?.toString()}>
                <Link
                  href={`/characters/by-campaign/${campaign._id}`}
                  className="link"
                >
                  {campaign.name}
                </Link>
              </div>
            ))}
      </div>

      {countdownDate && new Date(countdownDate) >= new Date() ? ( // show only if in the future
        <>
          <p className="subtitle">Next session in...</p>
          <Countdown targetDate={countdownDate} />
        </>
      ) : null}

      <div className="subtitle">Roll some dice!</div>
      <DiceRoller />
    </>
  );
}

// disable pre-render at build time
export const dynamic = "force-dynamic";
