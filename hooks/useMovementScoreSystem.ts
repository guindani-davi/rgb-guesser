import { useRef, useState } from "react";
import { MovementScoreSystem } from "@/models/MovementScoreSystem";

interface UseMovementScoreSystemReturn {
  currentScore: number;
  movementCount: number;
  recordMovement: () => void;
}

export function useMovementScoreSystem(): UseMovementScoreSystemReturn {
  const scoreSystemRef = useRef<MovementScoreSystem>(new MovementScoreSystem());
  const [currentScore, setCurrentScore] = useState(
    MovementScoreSystem.getInitialScore()
  );
  const [movementCount, setMovementCount] = useState(0);

  const recordMovement = (): void => {
    if (scoreSystemRef.current) {
      scoreSystemRef.current.recordMovement();
      setCurrentScore(scoreSystemRef.current.getCurrentScore());
      setMovementCount(scoreSystemRef.current.getMovementCount());
    }
  };

  return {
    currentScore,
    movementCount,
    recordMovement,
  };
}
