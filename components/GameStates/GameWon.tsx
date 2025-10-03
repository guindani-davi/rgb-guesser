import type { JSX } from "react";
import type { IGameState, GameStateTransition } from "@/models/GameState";
import { MainMenu } from "@/components/GameStates/MainMenu";
import { GlobalScoreSystem } from "@/models/GlobalScoreSystem";
import type { Matrix } from "@/models/Matrix";
import { MatrixSolution } from "@/components/MatrixSolution";

interface GameWonProps {
  onBackToMenu: () => void;
  finalScore: number;
  targetMatrix: Matrix;
}

function GameWonComponent({
  onBackToMenu,
  finalScore,
  targetMatrix,
}: GameWonProps): JSX.Element {
  const scoreMessage = GlobalScoreSystem.getScoreMessage(finalScore);

  return (
    <section className="hero is-fullheight has-background-success-light">
      <div className="hero-body">
        <div className="container has-text-centered px-4">
          <div
            className="box has-background-white has-shadow"
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              padding: "2rem",
            }}
          >
            <div className="content">
              <span
                className="icon is-large has-text-success mb-4"
                style={{ fontSize: "3rem" }}
              >
                🎉
              </span>
              <h1 className="title is-2-mobile is-1-tablet has-text-success mb-4">
                Parabéns!
              </h1>
              <h2 className="subtitle is-5-mobile is-4-tablet has-text-grey-dark mb-4">
                Você conseguiu organizar a matriz RGB corretamente!
              </h2>

              <div className="box has-background-info-light mb-5">
                <p className="heading has-text-grey mb-2">Pontuação Final</p>
                <p className="title is-1 has-text-info-dark mb-3">
                  {finalScore}
                </p>
                <p className="subtitle is-6 has-text-grey-dark">
                  {scoreMessage}
                </p>
              </div>

              <MatrixSolution matrix={targetMatrix} />

              <div className="buttons is-centered mt-5">
                <button
                  className="button is-primary is-large is-rounded"
                  onClick={onBackToMenu}
                  type="button"
                >
                  <span className="icon">
                    <span>🏠</span>
                  </span>
                  <span>Voltar ao Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export class GameWon implements IGameState {
  constructor(
    private transitionTo: GameStateTransition,
    private finalScore: number,
    private targetMatrix: Matrix
  ) {}

  getStateName(): string {
    return "GameWon";
  }

  render(): JSX.Element {
    return (
      <GameWonComponent
        onBackToMenu={() => this.transitionTo(new MainMenu(this.transitionTo))}
        finalScore={this.finalScore}
        targetMatrix={this.targetMatrix}
      />
    );
  }
}
