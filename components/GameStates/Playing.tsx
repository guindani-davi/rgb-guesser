import type { JSX } from "react";
import { useEffect } from "react";
import type { IGameState, GameStateTransition } from "@/models/GameState";
import { GameWon } from "@/components/GameStates/GameWon";
import { MatrixGrid } from "@/components/MatrixGrid";
import { ColorDisplay } from "@/components/ColorDisplay";
import { HelpPanel } from "@/components/HelpPanel";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { MovementScoreDisplay } from "@/components/MovementScoreDisplay";
import { GlobalScoreDisplay } from "@/components/GlobalScoreDisplay";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useHelpPanel } from "@/hooks/useHelpPanel";
import { useScoreSystem } from "@/hooks/useScoreSystem";
import { useMovementScoreSystem } from "@/hooks/useMovementScoreSystem";
import { useGlobalScoreSystem } from "@/hooks/useGlobalScoreSystem";

interface PlayingProps {
  onGameWon: (finalScore: number) => void;
}

function PlayingComponent({ onGameWon }: PlayingProps): JSX.Element {
  const {
    currentScore: movementScore,
    movementCount,
    recordMovement,
  } = useMovementScoreSystem();

  const {
    targetMatrix,
    currentMatrix,
    selectedCell,
    correctPositions,
    isGameWon,
    handleCellClick,
    resetSelectedCell,
  } = useGameLogic({ onMovementMade: recordMovement });

  const { isHelpVisible, toggleHelp } = useHelpPanel(true);
  const { currentScore, elapsedSeconds, finalize } = useScoreSystem();

  const { globalScore } = useGlobalScoreSystem({
    timeScore: currentScore,
    movementScore,
  });

  useEffect(() => {
    if (isGameWon) {
      finalize();
      onGameWon(globalScore);
    }
  }, [isGameWon, onGameWon, globalScore, finalize]);

  return (
    <div className="hero">
      <div className="hero-body">
        <div className="columns">
          <div className="column">
            <GlobalScoreDisplay globalScore={globalScore}></GlobalScoreDisplay>
            <ScoreDisplay
              currentScore={currentScore}
              elapsedSeconds={elapsedSeconds}
            ></ScoreDisplay>
            <MovementScoreDisplay
              currentScore={movementScore}
              movementCount={movementCount}
            ></MovementScoreDisplay>
          </div>
          <div className="column is-6">
            <div className="container has-text-centered">
              <p className="title">RGB Guesser</p>
              <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                  <MatrixGrid
                    matrix={currentMatrix}
                    selectedCell={selectedCell}
                    correctPositions={correctPositions}
                    onCellClick={handleCellClick}
                    onClickOutside={resetSelectedCell}
                  ></MatrixGrid>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                  <ColorDisplay
                    currentMatrix={currentMatrix}
                    targetMatrix={targetMatrix}
                  ></ColorDisplay>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <HelpPanel
              isVisible={isHelpVisible}
              onToggle={toggleHelp}
            ></HelpPanel>
          </div>
        </div>
      </div>
    </div>
  );
}

export class Playing implements IGameState {
  constructor(private transitionTo: GameStateTransition) {}

  getStateName(): string {
    return "Playing";
  }

  render(): JSX.Element {
    return (
      <PlayingComponent
        onGameWon={(finalScore: number) =>
          this.transitionTo(new GameWon(this.transitionTo, finalScore))
        }
      />
    );
  }
}
