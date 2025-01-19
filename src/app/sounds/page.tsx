import { getFiles, getSignedURL } from "@/actions/storage";
import SoundsPlayer from "@/components/soundsPlayer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soundboard",
  openGraph: {
    title: "Soundboard",
  },
};

export default async function SoundsPage() {
  const sounds = await getFiles(`sounds`);
  const parsedSounds: { name: string; URL: string }[] = [];

  sounds.forEach(async (sound) => {
    const url = await getSignedURL(sound);
    parsedSounds.push({ name: sound, URL: url });
  });

  return (
    <>
      <div className="title">Soundboard</div>
      {sounds.length == 0 ? (
        "No sounds found."
      ) : (
        <SoundsPlayer sounds={parsedSounds} />
      )}
    </>
  );
}
