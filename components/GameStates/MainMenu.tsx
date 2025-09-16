import { JSX } from "react";
import { IGameState } from "@/models/GameState"
import { Playing } from "@/components/GameStates/Playing";

export class MainMenu implements IGameState {
  constructor(private setGameState: (state: IGameState) => void) {}

  tick(): void {
  }

  getView(): JSX.Element {
    return (
      <div>
        <h1>Main Menu</h1>
        <button onClick={() => this.setGameState(new Playing(this.setGameState))}>
          Start Game
        </button>
      </div>
    );
  }
}
