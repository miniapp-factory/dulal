"use client";

import { useState } from "react";
import Result from "./result";

type Question = {
  text: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What’s your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to spend a weekend?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring", animal: "fox" },
      { text: "Storing food", animal: "hamster" },
      { text: "Running", animal: "horse" },
    ],
  },
  {
    text: "What’s your ideal living space?",
    options: [
      { text: "A cozy corner", animal: "cat" },
      { text: "A big yard", animal: "dog" },
      { text: "A forest", animal: "fox" },
      { text: "A nest", animal: "hamster" },
      { text: "A pasture", animal: "horse" },
    ],
  },
  {
    text: "Which trait describes you best?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Loyal", animal: "dog" },
      { text: "Clever", animal: "fox" },
      { text: "Resourceful", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    text: "What’s your favorite activity?",
    options: [
      { text: "Purring", animal: "cat" },
      { text: "Barking", animal: "dog" },
      { text: "Hunting", animal: "fox" },
      { text: "Chewing", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [shuffledOptions, setShuffledOptions] = useState(
    shuffleArray(questions[0].options)
  );

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setShuffledOptions(shuffleArray(questions[current + 1].options));
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShuffledOptions(shuffleArray(questions[0].options));
  };

  if (current < questions.length) {
    const q = questions[current];
    return (
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-xl font-semibold">{q.text}</h2>
        <div className="flex flex-col gap-2">
          {shuffledOptions.map((opt, idx) => (
            <button
              key={idx}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
              onClick={() => handleAnswer(opt.animal)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const bestAnimal = Object.entries(scores).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  return (
    <Result animal={bestAnimal} onRetake={retake} />
  );
}
