import type { JSX } from "react";
import type { IGameState, GameStateTransition } from "@/models/GameState";
import { Playing } from "@/components/GameStates/Playing";

interface MainMenuProps {
  onStartGame: () => void;
}

function MainMenuComponent({ onStartGame }: MainMenuProps): JSX.Element {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2-mobile is-1-tablet mb-6">RGB Guesser</h1>
          <button
            className="button is-primary is-large is-rounded"
            onClick={onStartGame}
            type="button"
          >
            <span className="icon">
              <span>🎮</span>
            </span>
            <span>Jogar</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export class MainMenu implements IGameState {
  constructor(private transitionTo: GameStateTransition) {}

  getStateName(): string {
    return "MainMenu";
  }

  render(): JSX.Element {
    return (
      <MainMenuComponent
        onStartGame={() => this.transitionTo(new Playing(this.transitionTo))}
      />
    );
  }
}
