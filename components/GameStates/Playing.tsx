import type { JSX } from "react";
import { useEffect } from "react";
import type { IGameState, GameStateTransition } from "@/models/GameState";
import { GameWon } from "@/components/GameStates/GameWon";
import { MatrixGrid } from "@/components/MatrixGrid";
import { ColorDisplay } from "@/components/ColorDisplay";
import { useGameLogic } from "@/hooks/useGameLogic";

interface PlayingProps {
	onGameWon: () => void;
}

function PlayingComponent({ onGameWon }: PlayingProps): JSX.Element {
	const {
		targetMatrix,
		currentMatrix,
		selectedCell,
		isGameWon,
		handleCellClick,
		resetSelectedCell,
	} = useGameLogic();

	useEffect(() => {
		if (isGameWon) {
			onGameWon();
		}
	}, [isGameWon, onGameWon]);

	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container">
					<h1 className="title is-2 has-text-centered mb-6">RGB Matrix</h1>
					<div className="columns is-centered">
						<div className="column is-narrow">
							<MatrixGrid
								matrix={currentMatrix}
								selectedCell={selectedCell}
								onCellClick={handleCellClick}
								onClickOutside={resetSelectedCell}
							/>
						</div>
						<div className="column is-narrow">
							<ColorDisplay
								currentMatrix={currentMatrix}
								targetMatrix={targetMatrix}
							/>
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