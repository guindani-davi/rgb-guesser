export class GlobalScoreSystem {
  private static readonly MAX_SCORE = 290;

  public static calculateGlobalScore(
    timeScore: number,
    movementScore: number
  ): number {
    return timeScore + movementScore;
  }

  public static getMaxScore(): number {
    return GlobalScoreSystem.MAX_SCORE;
  }

  public static getScoreMessage(globalScore: number): string {
    const percentage = (globalScore / GlobalScoreSystem.MAX_SCORE) * 100;

    if (percentage >= 90) return "Incrível! Pontuação perfeita!";
    if (percentage >= 75) return "Excelente! Você foi muito rápido e eficiente!";
    if (percentage >= 60) return "Muito bom! Ótimo desempenho!";
    if (percentage >= 45) return "Bom trabalho!";
    if (percentage >= 30) return "Você conseguiu!";
    return "Paciência e dedicação valem a pena!";
  }
}
