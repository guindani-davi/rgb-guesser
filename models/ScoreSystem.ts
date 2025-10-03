export class ScoreSystem {
  private static readonly INITIAL_SCORE = 90;
  private static readonly MIN_SCORE = 0;
  private static readonly POINTS_PER_SECOND = 1;

  private readonly startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  public getCurrentScore(): number {
    const elapsedTime = Date.now() - this.startTime;
    const elapsedSeconds = Math.floor(elapsedTime / 1000);
    const score =
      ScoreSystem.INITIAL_SCORE -
      elapsedSeconds * ScoreSystem.POINTS_PER_SECOND;

    return Math.max(score, ScoreSystem.MIN_SCORE);
  }

  public getElapsedSeconds(): number {
    const elapsedTime = Date.now() - this.startTime;
    return Math.floor(elapsedTime / 1000);
  }

  public static getInitialScore(): number {
    return ScoreSystem.INITIAL_SCORE;
  }

  public static getMinScore(): number {
    return ScoreSystem.MIN_SCORE;
  }

  public static getPointsPerSecond(): number {
    return ScoreSystem.POINTS_PER_SECOND;
  }
}
