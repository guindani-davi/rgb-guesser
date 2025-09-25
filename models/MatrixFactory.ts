import type { ColorChannelValue } from "@/models/ColorChannel";
import { ValidationError } from "@/models/Errors";
import { Matrix } from "@/models/Matrix";

function generateRandomDigit(maxValue: number = 9): number {
  return Math.floor(Math.random() * (maxValue + 1));
}

function generateValidColorChannelValue(): ColorChannelValue {
  const firstDigit = generateRandomDigit(2);
  let secondDigit = generateRandomDigit(9);
  let thirdDigit = generateRandomDigit(9);

  if (firstDigit === 2) {
    secondDigit = generateRandomDigit(5);
    if (secondDigit === 5) {
      thirdDigit = generateRandomDigit(5);
    }
  }

  return [firstDigit, secondDigit, thirdDigit];
}

export const MatrixFactory = {
  createEmptyMatrix(): Matrix {
    return Matrix.fromValues([0, 0, 0], [0, 0, 0], [0, 0, 0]);
  },

  createMatrixFromRGB(r: number, g: number, b: number): Matrix {
    if (!Number.isInteger(r) || r < 0 || r > 255) {
      throw new ValidationError(
        `Red value must be an integer between 0 and 255, got ${r}`,
        "r"
      );
    }
    if (!Number.isInteger(g) || g < 0 || g > 255) {
      throw new ValidationError(
        `Green value must be an integer between 0 and 255, got ${g}`,
        "g"
      );
    }
    if (!Number.isInteger(b) || b < 0 || b > 255) {
      throw new ValidationError(
        `Blue value must be an integer between 0 and 255, got ${b}`,
        "b"
      );
    }

    const rString = r.toString().padStart(3, "0");
    const gString = g.toString().padStart(3, "0");
    const bString = b.toString().padStart(3, "0");

    const rValues: ColorChannelValue = [
      parseInt(rString[0], 10),
      parseInt(rString[1], 10),
      parseInt(rString[2], 10),
    ];
    const gValues: ColorChannelValue = [
      parseInt(gString[0], 10),
      parseInt(gString[1], 10),
      parseInt(gString[2], 10),
    ];
    const bValues: ColorChannelValue = [
      parseInt(bString[0], 10),
      parseInt(bString[1], 10),
      parseInt(bString[2], 10),
    ];

    return Matrix.fromValues(rValues, gValues, bValues);
  },
  createRandomMatrix(): Matrix {
    const rValues = generateValidColorChannelValue();
    const gValues = generateValidColorChannelValue();
    const bValues = generateValidColorChannelValue();

    return Matrix.fromValues(rValues, gValues, bValues);
  },
} as const;
