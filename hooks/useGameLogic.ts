import { useEffect, useState } from "react";
import { GameLogic } from "@/models/GameLogic";
import type { Matrix, Position } from "@/models/Matrix";
import { MatrixFactory } from "@/models/MatrixFactory";

interface UseGameLogicReturn {
	targetMatrix: Matrix;
	currentMatrix: Matrix;
	selectedCell: Position | null;
	isGameWon: boolean;
	correctPositions: Position[];
	handleCellClick: (position: Position) => void;
	resetSelectedCell: () => void;
}

export function useGameLogic(): UseGameLogicReturn {
	const [targetMatrix] = useState(() => MatrixFactory.createRandomMatrix());
	const [currentMatrix, setCurrentMatrix] = useState(() =>
		GameLogic.createShuffledMatrix(targetMatrix),
	);
	const [selectedCell, setSelectedCell] = useState<Position | null>(null);
	const [isGameWon, setIsGameWon] = useState(false);
	const [correctPositions, setCorrectPositions] = useState<Position[]>([]);

	useEffect(() => {
		const gameWon = GameLogic.isGameWon(currentMatrix, targetMatrix);
		const correctPositionsArray =
			currentMatrix.getCorrectPositions(targetMatrix);

		setIsGameWon(gameWon);
		setCorrectPositions(correctPositionsArray);
	}, [currentMatrix, targetMatrix]);

	const handleCellClick = (position: Position): void => {
		if (selectedCell) {
			if (
				selectedCell.row === position.row &&
				selectedCell.col === position.col
			) {
				setSelectedCell(null);
				return;
			}

			const isAdjacent = GameLogic.isAdjacent(selectedCell, position);

			if (isAdjacent) {
				const newMatrix = currentMatrix.withSwappedValues(
					selectedCell,
					position,
				);
				setCurrentMatrix(newMatrix);
				setSelectedCell(null);
			} else {
				setSelectedCell(null);
			}
		} else {
			setSelectedCell(position);
		}
	};

	const resetSelectedCell = (): void => {
		setSelectedCell(null);
	};

	return {
		correctPositions,
		currentMatrix,
		handleCellClick,
		isGameWon,
		resetSelectedCell,
		selectedCell,
		targetMatrix,
	};
}
