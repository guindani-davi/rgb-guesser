export class MovementScoreSystem {
  private static readonly INITIAL_SCORE = 200;
  private static readonly MIN_SCORE = 0;
  private static readonly POINTS_PER_MOVEMENT = 10;

  private movementCount: number;

  constructor() {
    this.movementCount = 0;
  }

  public recordMovement(): void {
    this.movementCount++;
  }

  public getCurrentScore(): number {
    const score =
      MovementScoreSystem.INITIAL_SCORE -
      this.movementCount * MovementScoreSystem.POINTS_PER_MOVEMENT;

    return Math.max(score, MovementScoreSystem.MIN_SCORE);
  }

  public getMovementCount(): number {
    return this.movementCount;
  }

  public static getInitialScore(): number {
    return MovementScoreSystem.INITIAL_SCORE;
  }

  public static getMinScore(): number {
    return MovementScoreSystem.MIN_SCORE;
  }

  public static getPointsPerMovement(): number {
    return MovementScoreSystem.POINTS_PER_MOVEMENT;
  }
}
