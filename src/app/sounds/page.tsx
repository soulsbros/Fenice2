import { getFiles, getSignedURL } from "@/actions/storage";
import SoundsPlayer from "@/components/soundsPlayer";
import { cleanSoundTitle } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sounds",
  openGraph: {
    title: "Sounds",
  },
};

export default async function SoundsPage() {
  const sounds = await getFiles("sounds");
  const parsedSounds: { name: string; URL: string }[] = [];

  sounds.forEach(async (sound) => {
    const url = await getSignedURL(sound);
    parsedSounds.push({ name: sound, URL: url });
  });

  const recordings = await getFiles("recordings");
  const parsedRecordings: { name: string; folder: string; fullPath: string }[] =
    [];

  recordings.forEach(async (sound) => {
    parsedRecordings.push({
      name: cleanSoundTitle(sound).title,
      folder: cleanSoundTitle(sound).folder,
      fullPath: sound,
    });
  });

  let prevCategory = "";
  return (
    <>
      <div className="title">Soundboard</div>
      {sounds.length == 0 ? (
        "No sounds found."
      ) : (
        <SoundsPlayer sounds={parsedSounds} />
      )}

      {/* <div className="title mt-4">Session recordings</div>
      {parsedRecordings.map((sound) => {
        if (sound.folder == prevCategory) {
          return <p key={sound.fullPath}>{sound.name}</p>;
        } else {
          prevCategory = sound.folder;
          return (
            <>
              <div className="subtitle mt-2">{sound.folder}</div>
              <p key={sound.fullPath}>{sound.name}</p>
            </>
          );
        }
      })} */}
    </>
  );
}

// disable pre-render at build time
export const dynamic = "force-dynamic";
