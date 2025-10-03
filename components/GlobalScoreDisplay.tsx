import type { JSX } from "react";

interface GlobalScoreDisplayProps {
  globalScore: number;
}

export function GlobalScoreDisplay({
  globalScore,
}: GlobalScoreDisplayProps): JSX.Element {
  return (
    <div className="box has-background-primary-light">
      <div className="content">
        <h3 className="title is-5 has-text-primary-dark mb-3">
          🏆 Pontuação Global
        </h3>
        <div className="level is-mobile mb-3">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading has-text-grey">Pontuação Total</p>
              <p className="title is-2 has-text-primary-dark">{globalScore}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
