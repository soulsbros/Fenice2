"use client";

import { getSignedURL } from "@/actions/storage";
import { cleanSoundTitle } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  sounds: { name: string; URL: string }[];
}

export default function SoundsPlayer({ sounds }: Readonly<Props>) {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  function playSound(src: string) {
    audio!.src = src;
    audio!.play();
  }

  useEffect(() => {
    setAudio(document.getElementById("player")! as HTMLAudioElement);
  }, []);

  return (
    <>
      <div className="text-center">
        {sounds.map((sound) => (
          <button
            className="button primary"
            key={sound.name}
            onClick={() => playSound(sound.URL)}
          >
            {cleanSoundTitle(sound.name).title}
          </button>
        ))}
      </div>
      <audio id="player" controls className="hidden" />
    </>
  );
}

interface RecordingsProps {
  sounds: { name: string; folder: string; fullPath: string }[];
}

export function RecordingsPlayer({ sounds }: Readonly<RecordingsProps>) {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [title, setTitle] = useState("");

  async function playRecording(sound: {
    name: string;
    folder: string;
    fullPath: string;
  }) {
    setTitle(sound.name);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const url = await getSignedURL(sound.fullPath);
    audio!.src = url;
    audio!.play();
  }

  useEffect(() => {
    setAudio(document.getElementById("recordingsPlayer")! as HTMLAudioElement);
  }, []);

  return (
    <>
      {title ? <p>Now playing: {title}</p> : null}
      <audio
        id="recordingsPlayer"
        controls
        className={`w-full mb-6 ${title ? "" : "hidden"}`}
      />

      {sounds.map((sound) => {
        return (
          <div key={sound.fullPath}>
            <button onClick={() => playRecording(sound)} className="mb-1">
              {sound.name}
            </button>
          </div>
        );
      })}
    </>
  );
}
