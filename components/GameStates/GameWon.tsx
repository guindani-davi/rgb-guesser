import { JSX } from "react";
import { IGameState } from "@/models/GameState";
import { MainMenu } from "@/components/GameStates/MainMenu";

export class GameWon implements IGameState {
  constructor(private setGameState: (state: IGameState) => void) {}

  tick(): void {
  }

  getView(): JSX.Element {
    return (
      <div>
        <h1>🎉 Você venceu!</h1>
        <button onClick={() => this.setGameState(new MainMenu(this.setGameState))}>
          Voltar ao Menu
        </button>
      </div>
    );
  }
}
