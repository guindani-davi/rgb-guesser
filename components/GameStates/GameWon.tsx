import type { JSX } from "react";
import type { IGameState, GameStateTransition } from "@/models/GameState";
import { MainMenu } from "@/components/GameStates/MainMenu";

interface GameWonProps {
	onBackToMenu: () => void;
}

function GameWonComponent({ onBackToMenu }: GameWonProps): JSX.Element {
	return (
		<section className="hero is-fullheight has-background-success-light">
			<div className="hero-body">
				<div className="container has-text-centered">
					<div
						className="box has-background-white has-shadow"
						style={{ maxWidth: '500px', margin: '0 auto' }}
					>
						<div className="content">
							<span
								className="icon is-large has-text-success mb-4"
								style={{ fontSize: '4rem' }}
							>
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
									onClick={onBackToMenu}
									type="button"
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

export class GameWon implements IGameState {
	constructor(private transitionTo: GameStateTransition) {}

	getStateName(): string {
		return "GameWon";
	}

	render(): JSX.Element {
		return (
			<GameWonComponent
				onBackToMenu={() => this.transitionTo(new MainMenu(this.transitionTo))}
			/>
		);
	}
}
