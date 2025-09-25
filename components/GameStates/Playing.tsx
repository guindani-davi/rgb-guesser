import type { JSX } from "react";
import { useEffect } from "react";
import type { IGameState, GameStateTransition } from "@/models/GameState";
import { GameWon } from "@/components/GameStates/GameWon";
import { MatrixGrid } from "@/components/MatrixGrid";
import { ColorDisplay } from "@/components/ColorDisplay";
import { HelpPanel } from "@/components/HelpPanel";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useHelpPanel } from "@/hooks/useHelpPanel";

interface PlayingProps {
  onGameWon: () => void;
}

function PlayingComponent({ onGameWon }: PlayingProps): JSX.Element {
  const {
    targetMatrix,
    currentMatrix,
    selectedCell,
    correctPositions,
    isGameWon,
    handleCellClick,
    resetSelectedCell,
  } = useGameLogic();

  const { isHelpVisible, toggleHelp } = useHelpPanel(true);

  useEffect(() => {
    if (isGameWon) {
      onGameWon();
    }
  }, [isGameWon, onGameWon]);

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-3-mobile is-2-tablet has-text-centered mb-4">
            RGB Matrix
          </h1>

          <div className="columns is-centered is-vcentered mb-4 is-multiline">
            <div className="column is-narrow-tablet is-full-mobile">
              <MatrixGrid
                matrix={currentMatrix}
                selectedCell={selectedCell}
                correctPositions={correctPositions}
                onCellClick={handleCellClick}
                onClickOutside={resetSelectedCell}
              />
            </div>
            <div className="column is-narrow-tablet is-full-mobile">
              <ColorDisplay
                currentMatrix={currentMatrix}
                targetMatrix={targetMatrix}
              />
            </div>
          </div>

          {/* Painel de Ajuda - Layout Inferior */}
          <div className="columns is-centered">
            <div className="column is-two-thirds-desktop is-full-tablet is-full-mobile">
              <HelpPanel isVisible={isHelpVisible} onToggle={toggleHelp} />
            </div>
          </div>
        </div>
      </div>
    </section>
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
        onGameWon={() => this.transitionTo(new GameWon(this.transitionTo))}
      />
    );
  }
}
