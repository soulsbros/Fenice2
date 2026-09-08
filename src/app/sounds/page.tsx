import { getUserCampaigns } from "@/actions/campaigns";
import { getFiles } from "@/actions/storage";
import SoundsPlayer from "@/components/soundsPlayer";
import { authOptions } from "@/lib/authConfig";
import { cleanSoundTitle, S3_BUCKET_NAME, S3_ENDPOINT_BASE } from "@/lib/utils";
import { Campaign } from "@/types/API";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sounds",
  openGraph: {
    title: "Sounds",
  },
};

export default async function SoundsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const sounds = await getFiles("sounds");
  const parsedSounds: { name: string; URL: string }[] = [];

  sounds.forEach((sound) => {
    parsedSounds.push({
      name: sound,
      URL: `https://${S3_ENDPOINT_BASE}/${S3_BUCKET_NAME}/${sound}`,
    });
  });

  const recordings = user ? await getFiles("recordings") : [];
  const parsedRecordings: { name: string; folder: string; fullPath: string }[] =
    [];

  recordings.forEach((recording) => {
    parsedRecordings.push({
      name: cleanSoundTitle(recording).title,
      folder: cleanSoundTitle(recording).folder,
      fullPath: recording,
    });
  });

  const allowedCampaigns: Campaign[] = user?.roles.includes("player")
    ? await getUserCampaigns(user.email, true)
    : [];

  return (
    <>
      <div className="title">Soundboard</div>
      {parsedSounds.length === 0 ? (
        "No sounds found."
      ) : (
        <SoundsPlayer sounds={parsedSounds} />
      )}

      {user && parsedRecordings.length !== 0 ? (
        <>
          <div className="title mt-4">Session recordings</div>
          {allowedCampaigns.length === 0 ? (
            <>
              <div>
                It seems you don&apos;t have any character recorded yet.
              </div>
              <Link href="/characters" className="primary button">
                Create one?
              </Link>
            </>
          ) : null}
          {Array.from(new Set(parsedRecordings.map((el) => el.folder))).map(
            (folder) =>
              allowedCampaigns.some(
                (campaign) =>
                  campaign.legacyCampaignId.toString() ==
                  folder.split(" ").slice(0, 1)[0]
              ) ? (
                <Link
                  key={folder}
                  href={`/sounds/${folder.split(" ").slice(0, 1)[0]}`}
                  className="mb-1 link block"
                >
                  {folder.split(" ").slice(1).join(" ")}
                </Link>
              ) : null
          )}
        </>
      ) : null}
    </>
  );
}

// disable pre-render at build time
export const dynamic = "force-dynamic";
