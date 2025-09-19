import { JSX } from "react";
import { IGameState } from "@/models/GameState"
import { Matrix } from "@/models/Matrix";
import { ColorChannel } from "@/models/ColorChannel";
import { shuffleMatrix } from "@/models/Helper";
import styles from "./Playing.module.css";

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
    const [r, g, b] = this.currentMatrix.getRGB();

    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-narrow">
                <h1 className="title is-2 has-text-centered mb-6">RGB Matrix</h1>
                <div className="box">
                  <table className="table is-bordered">
                    <tbody>
                      <tr>
                        <th className="has-text-centered has-text-danger is-size-4" style={{width: '50px'}}>R</th>
                        {r.getValue().map((value: number, index: number) => (
                          <td key={`r-${index}`} className="has-text-centered is-size-4">{value}</td>
                        ))}
                      </tr>
                      <tr>
                        <th className="has-text-centered has-text-success is-size-4" style={{width: '50px'}}>G</th>
                        {g.getValue().map((value: number, index: number) => (
                          <td key={`g-${index}`} className="has-text-centered is-size-4">{value}</td>
                        ))}
                      </tr>
                      <tr>
                        <th className="has-text-centered has-text-info is-size-4" style={{width: '50px'}}>B</th>
                        {b.getValue().map((value: number, index: number) => (
                          <td key={`b-${index}`} className="has-text-centered is-size-4">{value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}