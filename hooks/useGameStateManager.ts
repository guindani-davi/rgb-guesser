import { useCallback, useEffect, useState } from "react";
import { MainMenu } from "@/components/GameStates/MainMenu";
import type { GameStateTransition, IGameState } from "@/models/GameState";
import { GameStateManager } from "@/models/GameStateManager";

interface UseGameStateManagerReturn {
	gameStateManager: GameStateManager;
	currentStateName: string;
}

export function useGameStateManager(): UseGameStateManagerReturn {
	const [currentState, setCurrentState] = useState<IGameState | null>(null);

	const handleStateTransition: GameStateTransition = useCallback(
		(newState: IGameState) => {
			setCurrentState(newState);
		},
		[],
	);

	useEffect(() => {
		const initialState = new MainMenu(handleStateTransition);
		setCurrentState(initialState);
	}, [handleStateTransition]);

	const gameStateManager = currentState
		? new GameStateManager(currentState, handleStateTransition)
		: new GameStateManager(new MainMenu(() => {}), () => {});

	return {
		currentStateName: currentState?.getStateName() ?? "Loading",
		gameStateManager,
	};
}
