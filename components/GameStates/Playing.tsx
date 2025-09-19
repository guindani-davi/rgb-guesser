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
    const r = this.randomColorChannel();
    const g = this.randomColorChannel();
    const b = this.randomColorChannel();
    const matrix = new Matrix(r, g, b);
    return matrix;
  }

  private randomColorChannel(): ColorChannel {
    let firstDigit = Math.floor(Math.random() * 3);
    firstDigit >= 3 ? firstDigit = 2 : firstDigit = firstDigit;
    let secondDigit = Math.floor(Math.random() * 10);
    if (firstDigit >= 2) {
      secondDigit >= 6 ? secondDigit = 5 : secondDigit = secondDigit;
    } 
    let thirdDigit = Math.floor(Math.random() * 10);
    if (firstDigit >= 2 && secondDigit >= 5) {
      thirdDigit >= 6 ? thirdDigit = 5 : thirdDigit = thirdDigit;
    }
    return new ColorChannel([firstDigit, secondDigit, thirdDigit])
  }

  render(): JSX.Element {
    const [r, g, b] = this.currentMatrix.getRGB();
    const [targetR, targetG, targetB] = this.targetMatrix.getRGB();

    // Criando as strings RGB para os estilos CSS
    const currentColor = `rgb(${r.getValue().join('')}, ${g.getValue().join('')}, ${b.getValue().join('')})`;
    const targetColor = `rgb(${targetR.getValue().join('')}, ${targetG.getValue().join('')}, ${targetB.getValue().join('')})`;

    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-2 has-text-centered mb-6">RGB Matrix</h1>
            <div className="columns is-centered">
              {/* Coluna da Matriz */}
              <div className="column is-narrow">
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

              {/* Coluna das Cores */}
              <div className="column is-narrow">
                <div className="box">
                  <div className="mb-5">
                    <p className="has-text-centered mb-2 is-size-5">Current Color</p>
                    <div 
                      style={{
                        width: '150px',
                        height: '150px',
                        backgroundColor: currentColor,
                        border: '1px solid #dbdbdb',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                  <div>
                    <p className="has-text-centered mb-2 is-size-5">Target Color</p>
                    <div 
                      style={{
                        width: '150px',
                        height: '150px',
                        backgroundColor: targetColor,
                        border: '1px solid #dbdbdb',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}