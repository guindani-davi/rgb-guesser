import { Matrix, type Position } from "@/models/Matrix";

export const GameLogic = {
  createShuffledMatrix(originalMatrix: Matrix): Matrix {
    const allValues = originalMatrix.getAllValues();
    const shuffledValues = this.shuffleArray(allValues);

    return Matrix.fromValues(
      [shuffledValues[0], shuffledValues[1], shuffledValues[2]],
      [shuffledValues[3], shuffledValues[4], shuffledValues[5]],
      [shuffledValues[6], shuffledValues[7], shuffledValues[8]]
    );
  },
  getAdjacentPositions(position: Position): Position[] {
    const { row, col } = position;
    const adjacent: Position[] = [];
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const [deltaRow, deltaCol] of directions) {
      const newRow = row + deltaRow;
      const newCol = col + deltaCol;

      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
        adjacent.push({ col: newCol, row: newRow });
      }
    }

    return adjacent;
  },

  isAdjacent(pos1: Position, pos2: Position): boolean {
    const adjacentPositions = this.getAdjacentPositions(pos1);
    return adjacentPositions.some(
      (pos) => pos.row === pos2.row && pos.col === pos2.col
    );
  },

  isGameWon(currentMatrix: Matrix, targetMatrix: Matrix): boolean {
    return currentMatrix.equals(targetMatrix);
  },

  shuffleArray<T>(array: readonly T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
} as const;
