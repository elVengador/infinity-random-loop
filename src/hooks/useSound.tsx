import { MutableRefObject, useEffect, useRef } from "react";

export const useSound = (soundPath: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onPlayAudio = () => playAudio(audioRef);

  useEffect(() => {
    if (typeof window !== "undefined") audioRef.current = new Audio(soundPath);
  }, [soundPath]);

  return onPlayAudio;
};

const playAudio = (audioRef: MutableRefObject<HTMLAudioElement | null>) => {
  if (!audioRef.current) return;

  if (!audioRef.current.paused) audioRef.current.currentTime = 0;
  audioRef.current.currentTime = 0;
  audioRef.current.play();
};
