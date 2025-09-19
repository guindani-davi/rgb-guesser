import { JSX } from "react";
import { IGameState } from "@/models/GameState"
import { Playing } from "@/components/GameStates/Playing";

export class MainMenu implements IGameState {
  constructor(private setGameState: (state: IGameState) => void) {}

  render(): JSX.Element {
    return (
      <>
        <h1>RGB Guesser</h1>
        <button onClick={() => this.setGameState(new Playing(this.setGameState))}>
          Play
        </button>
      </>
    );
  }
}
