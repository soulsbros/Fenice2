import { getFiles, getSignedURL } from "@/actions/storage";
import SoundsPlayer from "@/components/soundsPlayer";
import { authOptions } from "@/lib/authConfig";
import { cleanSoundTitle } from "@/lib/utils";
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

  sounds.forEach(async (sound) => {
    const url = await getSignedURL(sound);
    parsedSounds.push({ name: sound, URL: url });
  });

  const recordings = await getFiles("recordings");
  const parsedRecordings: { name: string; folder: string; fullPath: string }[] =
    [];

  recordings.forEach((sound) => {
    parsedRecordings.push({
      name: cleanSoundTitle(sound).title,
      folder: cleanSoundTitle(sound).folder,
      fullPath: sound,
    });
  });

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
          {Array.from(new Set(parsedRecordings.map((el) => el.folder))).map(
            (folder) => (
              <Link
                key={folder}
                href={`/sounds/${folder.split(" ").slice(0, 1).join(" ")}`}
                className="mb-1 link block"
              >
                {folder.split(" ").slice(1).join(" ")}
              </Link>
            )
          )}
        </>
      ) : null}
    </>
  );
}

// disable pre-render at build time
export const dynamic = "force-dynamic";
