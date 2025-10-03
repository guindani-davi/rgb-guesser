import type { JSX } from "react";

interface ScoreDisplayProps {
  currentScore: number;
  elapsedSeconds: number;
}

export function ScoreDisplay({
  currentScore,
  elapsedSeconds,
}: ScoreDisplayProps): JSX.Element {
  return (
    <div className="box has-background-info-light">
      <div className="content">
        <h3 className="title is-5 has-text-info-dark mb-3">
          ⏱️ Pontuação por Tempo
        </h3>
        <div className="level is-mobile mb-3">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading has-text-grey">Pontuação Atual</p>
              <p className="title is-3 has-text-info-dark">{currentScore}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading has-text-grey">Tempo Decorrido</p>
              <p className="title is-3 has-text-info-dark">{elapsedSeconds}s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
