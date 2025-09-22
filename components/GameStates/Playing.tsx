import { JSX, useEffect, useRef, useState } from "react";
import { IGameState } from "@/models/GameState"
import { Matrix } from "@/models/Matrix";
import { ColorChannel } from "@/models/ColorChannel";
import { shuffleMatrix, matricesEqual, getAdjacentCells } from "@/models/Helper";
import { GameWon } from "@/components/GameStates/GameWon";

interface PlayingProps {
  setGameState: (state: IGameState) => void;
}

function generateTargetMatrix(): Matrix {
  const randomColorChannel = (): ColorChannel => {
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
  };

  const r = randomColorChannel();
  const g = randomColorChannel();
  const b = randomColorChannel();
  return new Matrix(r, g, b);
}

export function PlayingComponent({ setGameState }: PlayingProps): JSX.Element {
  const [targetMatrix] = useState(() => generateTargetMatrix());
  const [currentMatrix, setCurrentMatrix] = useState(() => shuffleMatrix(targetMatrix));
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const matrixRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (matricesEqual(currentMatrix, targetMatrix)) {
      setGameState(new GameWon(setGameState));
    }
  }, [currentMatrix, targetMatrix, setGameState]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (matrixRef.current && !matrixRef.current.contains(event.target as Node)) {
        setSelectedCell(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (selectedCell) {
      if (selectedCell.row === row && selectedCell.col === col) {
        setSelectedCell(null);
        return;
      }

      const adjacentCells = getAdjacentCells(selectedCell.row, selectedCell.col);
      const isAdjacent = adjacentCells.some(cell => cell.row === row && cell.col === col);

      if (isAdjacent) {
        const newMatrix = new Matrix(...currentMatrix.getRGB());
        newMatrix.swapValues(selectedCell.row, selectedCell.col, row, col);
        setCurrentMatrix(newMatrix);
        setSelectedCell(null);
      } else {
        setSelectedCell(null);
      }
    } else {
      setSelectedCell({ row, col });
    }
  };

  const getCellStyle = (row: number, col: number) => {
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      return { backgroundColor: '#48c774', cursor: 'pointer' };
    }
    
    if (selectedCell) {
      const adjacentCells = getAdjacentCells(selectedCell.row, selectedCell.col);
      const isAdjacent = adjacentCells.some(cell => cell.row === row && cell.col === col);
      if (isAdjacent) {
        return { backgroundColor: '#ffdd57', cursor: 'pointer' };
      }
    }
    
    return { cursor: 'pointer' };
  };

  const [r, g, b] = currentMatrix.getRGB();
  const [targetR, targetG, targetB] = targetMatrix.getRGB();

  const currentColor = `rgb(${r.getValue().join('')}, ${g.getValue().join('')}, ${b.getValue().join('')})`;
  const targetColor = `rgb(${targetR.getValue().join('')}, ${targetG.getValue().join('')}, ${targetB.getValue().join('')})`;

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-2 has-text-centered mb-6">RGB Matrix</h1>
          <div className="columns is-centered">
            <div className="column is-narrow">
              <div className="box">
                <table ref={matrixRef} className="table is-bordered">
                  <tbody>
                    <tr>
                      <th className="has-text-centered has-text-danger is-size-4" style={{width: '50px'}}>R</th>
                      {r.getValue().map((value: number, index: number) => (
                        <td 
                          key={`r-${index}`} 
                          className="has-text-centered is-size-4"
                          style={getCellStyle(0, index)}
                          onClick={() => handleCellClick(0, index)}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="has-text-centered has-text-success is-size-4" style={{width: '50px'}}>G</th>
                      {g.getValue().map((value: number, index: number) => (
                        <td 
                          key={`g-${index}`} 
                          className="has-text-centered is-size-4"
                          style={getCellStyle(1, index)}
                          onClick={() => handleCellClick(1, index)}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="has-text-centered has-text-info is-size-4" style={{width: '50px'}}>B</th>
                      {b.getValue().map((value: number, index: number) => (
                        <td 
                          key={`b-${index}`} 
                          className="has-text-centered is-size-4"
                          style={getCellStyle(2, index)}
                          onClick={() => handleCellClick(2, index)}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

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

export class Playing implements IGameState {
  constructor(private setGameState: (state: IGameState) => void) {}

  render(): JSX.Element {
    return <PlayingComponent setGameState={this.setGameState} />;
  }
}