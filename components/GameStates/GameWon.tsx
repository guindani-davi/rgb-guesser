import { JSX } from "react";
import { IGameState } from "@/models/GameState";
import { MainMenu } from "@/components/GameStates/MainMenu";

export class GameWon implements IGameState {
  constructor(private setGameState: (state: IGameState) => void) {}

  render(): JSX.Element {
    return (
      <section className="hero is-fullheight has-background-success-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="box has-background-white has-shadow" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div className="content">
                <span className="icon is-large has-text-success mb-4" style={{ fontSize: '4rem' }}>
                  🎉
                </span>
                <h1 className="title is-1 has-text-success mb-4">
                  Parabéns!
                </h1>
                <h2 className="subtitle is-4 has-text-grey-dark mb-5">
                  Você conseguiu organizar a matriz RGB corretamente!
                </h2>
                <div className="buttons is-centered">
                  <button 
                    className="button is-primary is-large is-rounded"
                    onClick={() => this.setGameState(new MainMenu(this.setGameState))}
                  >
                    <span className="icon">
                      <span>🏠</span>
                    </span>
                    <span>Voltar ao Menu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
