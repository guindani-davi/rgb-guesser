import { JSX } from "react";
import { IGameState } from "@/models/GameState"
import { Playing } from "@/components/GameStates/Playing";

export class MainMenu implements IGameState {
  constructor(private setGameState: (state: IGameState) => void) {}

  render(): JSX.Element {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 mb-6">
              RGB Guesser
            </h1>
            <button 
              className="button is-primary is-large"
              onClick={() => this.setGameState(new Playing(this.setGameState))}
            >
              Play
            </button>
          </div>
        </div>
      </section>
    );
  }
}
