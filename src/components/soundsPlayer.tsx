"use client";

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
