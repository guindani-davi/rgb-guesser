import type { JSX } from "react";

interface IGameState {
	render(): JSX.Element;
	getStateName(): string;
}

type GameStateTransition = (newState: IGameState) => void;

class GameStateManager {
	private currentState: IGameState;
	private transitionCallback: GameStateTransition;

	constructor(
		initialState: IGameState,
		transitionCallback: GameStateTransition,
	) {
		this.currentState = initialState;
		this.transitionCallback = transitionCallback;
	}

	public getCurrentState(): IGameState {
		return this.currentState;
	}

	public transitionTo(newState: IGameState): void {
		this.currentState = newState;
		this.transitionCallback(newState);
	}

	public render(): JSX.Element {
		return this.currentState.render();
	}
}

export { GameStateManager };
export type { IGameState, GameStateTransition };
