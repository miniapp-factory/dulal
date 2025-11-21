"use client";

import { url } from "@/lib/metadata";
import { Share } from "@/components/share";

type ResultProps = {
  animal: string;
  onRetake: () => void;
};

export default function Result({ animal, onRetake }: ResultProps) {
  const imageMap: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">
        You are most like a {animalNames[animal]}!
      </h2>
      <img
        src={imageMap[animal]}
        alt={animalNames[animal]}
        width={256}
        height={256}
        className="rounded"
      />
      <Share text={`I am a ${animalNames[animal]}! ${url}`} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
