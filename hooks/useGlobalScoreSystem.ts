import { useMemo } from "react";
import { GlobalScoreSystem } from "@/models/GlobalScoreSystem";

interface UseGlobalScoreSystemProps {
  timeScore: number;
  movementScore: number;
}

interface UseGlobalScoreSystemReturn {
  globalScore: number;
  scoreMessage: string;
}

export function useGlobalScoreSystem({
  timeScore,
  movementScore,
}: UseGlobalScoreSystemProps): UseGlobalScoreSystemReturn {
  const globalScore = useMemo(
    () => GlobalScoreSystem.calculateGlobalScore(timeScore, movementScore),
    [timeScore, movementScore]
  );

  const scoreMessage = useMemo(
    () => GlobalScoreSystem.getScoreMessage(globalScore),
    [globalScore]
  );

  return {
    globalScore,
    scoreMessage,
  };
}
