export const ValidationUtils = {
  isValidChannelDigit(digit: number): boolean {
    return Number.isInteger(digit) && digit >= 0 && digit <= 9;
  },

  isValidMatrixPosition(row: number, col: number): boolean {
    return (
      Number.isInteger(row) &&
      row >= 0 &&
      row < 3 &&
      Number.isInteger(col) &&
      col >= 0 &&
      col < 3
    );
  },
  isValidRGBValue(value: number): boolean {
    return Number.isInteger(value) && value >= 0 && value <= 255;
  },
} as const;

export const MathUtils = {
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  },

  randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
} as const;
