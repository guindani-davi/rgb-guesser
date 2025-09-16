import type { JSX } from "react";

interface IGameState {
	tick(): void;
	getView(): JSX.Element;
}

export type { IGameState };
