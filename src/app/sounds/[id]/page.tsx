import { getFiles } from "@/actions/storage";
import { RecordingsPlayer } from "@/components/soundsPlayer";
import { cleanSoundTitle } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const recordings = await getFiles(`recordings/${params.id}`);
    const name = cleanSoundTitle(recordings[0])
      .folder.split(" ")
      .slice(1)
      .join(" ");

    return {
      title: `Recordings ${name}`,
      openGraph: {
        title: `Recordings ${name}`,
      },
    };
  } catch (err) {
    return {
      title: "Lost",
    };
  }
}

interface Props {
  params: { id: string };
}

export default async function RecordingsPage({ params }: Readonly<Props>) {
  const recordings = await getFiles(`recordings/${params.id}`);
  if (recordings.length == 0) {
    return notFound();
  }
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
      <div className="title">
        Recordings {parsedRecordings[0].folder.split(" ").slice(1).join(" ")}
      </div>
      <RecordingsPlayer sounds={parsedRecordings} />
    </>
  );
}
