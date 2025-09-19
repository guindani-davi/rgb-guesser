import { JSX } from "react";
import { IGameState } from "@/models/GameState"
import { Matrix } from "@/models/Matrix";
import { ColorChannel } from "@/models/ColorChannel";
import { shuffleMatrix } from "@/models/Helper";

export class Playing implements IGameState {
  private currentMatrix: Matrix;
  private targetMatrix: Matrix;

  constructor(private setGameState: (state: IGameState) => void) {
    this.targetMatrix = this.generateTargetMatrix();
    this.currentMatrix = shuffleMatrix(this.targetMatrix);
  }

  private generateTargetMatrix(): Matrix {
    const r = new ColorChannel([this.randomColorValue(), this.randomColorValue(), this.randomColorValue()]);
    const g = new ColorChannel([this.randomColorValue(), this.randomColorValue(), this.randomColorValue()]);
    const b = new ColorChannel([this.randomColorValue(), this.randomColorValue(), this.randomColorValue()]);
    const matrix = new Matrix(r, g, b);
    return matrix;
  }

  private randomColorValue(): number {
    return Math.floor(Math.random() * 255);
  }

  render(): JSX.Element {
    return (
      <>
        <h1>Playing...</h1>
      </>
    );
  }
}
