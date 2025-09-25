export class GameError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "GameError";
  }
}

export class ValidationError extends GameError {
  constructor(message: string, public readonly field: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class PositionError extends GameError {
  constructor(
    message: string,
    public readonly position: { row: number; col: number }
  ) {
    super(message, "POSITION_ERROR");
    this.name = "PositionError";
  }
}

export class ColorChannelError extends GameError {
  constructor(message: string, public readonly value?: unknown) {
    super(message, "COLOR_CHANNEL_ERROR");
    this.name = "ColorChannelError";
  }
}

export class MatrixError extends GameError {
  constructor(message: string) {
    super(message, "MATRIX_ERROR");
    this.name = "MatrixError";
  }
}

export class GameStateError extends GameError {
  constructor(message: string, public readonly currentState?: string) {
    super(message, "GAME_STATE_ERROR");
    this.name = "GameStateError";
  }
}
