import { useEffect, useRef, useState } from "react";
import { ScoreSystem } from "@/models/ScoreSystem";

interface UseScoreSystemReturn {
  currentScore: number;
  elapsedSeconds: number;
  finalScore: number | null;
  finalize: () => void;
}

export function useScoreSystem(): UseScoreSystemReturn {
  const scoreSystemRef = useRef<ScoreSystem | null>(null);
  const [currentScore, setCurrentScore] = useState(
    ScoreSystem.getInitialScore()
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  useEffect(() => {
    scoreSystemRef.current = new ScoreSystem();

    const intervalId = setInterval(() => {
      if (scoreSystemRef.current && finalScore === null) {
        setCurrentScore(scoreSystemRef.current.getCurrentScore());
        setElapsedSeconds(scoreSystemRef.current.getElapsedSeconds());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [finalScore]);

  const finalize = (): void => {
    if (scoreSystemRef.current && finalScore === null) {
      const score = scoreSystemRef.current.getCurrentScore();
      setFinalScore(score);
      setCurrentScore(score);
    }
  };

  return {
    currentScore,
    elapsedSeconds,
    finalScore,
    finalize,
  };
}
