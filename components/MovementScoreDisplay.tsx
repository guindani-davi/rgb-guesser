import type { JSX } from "react";

interface MovementScoreDisplayProps {
  currentScore: number;
  movementCount: number;
}

export function MovementScoreDisplay({
  currentScore,
  movementCount,
}: MovementScoreDisplayProps): JSX.Element {
  return (
    <div className="box has-background-warning-light">
      <div className="content">
        <h3 className="title is-5 has-text-warning-dark mb-3">
          🔄 Pontuação por Movimentos
        </h3>
        <div className="level is-mobile mb-3">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading has-text-grey">Pontuação Atual</p>
              <p className="title is-3 has-text-warning-dark">{currentScore}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading has-text-grey">Movimentos</p>
              <p className="title is-3 has-text-warning-dark">{movementCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
