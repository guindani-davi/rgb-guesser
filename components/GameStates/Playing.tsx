import { JSX } from "react";
import { IGameState } from "@/models/GameState"
import { GameWon } from "@/components/GameStates/GameWon";

export class Playing implements IGameState {
  private score = 0;

  constructor(private setGameState: (state: IGameState) => void) {}

  tick(): void {
    this.score++;
    console.log(`Current score: ${this.score}`);

    if (this.score >= 100) {
      this.setGameState(new GameWon(this.setGameState));
    }
  }

  getView(): JSX.Element {
    return (
      <div>
        <h1>Playing...</h1>
        <p>Score: {this.score}</p>
      </div>
    );
  }
}
