import type { JSX } from "react";
import { useRef, useEffect } from "react";
import { Matrix, type Position } from "@/models/Matrix";
import { GameLogic } from "@/models/GameLogic";

interface MatrixGridProps {
	matrix: Matrix;
	selectedCell: Position | null;
	onCellClick: (position: Position) => void;
	onClickOutside: () => void;
}

interface MatrixCellProps {
	value: number;
	position: Position;
	isSelected: boolean;
	isAdjacent: boolean;
	onClick: () => void;
	channelColor: string;
}

function MatrixCell({
	value,
	isSelected,
	isAdjacent,
	onClick,
	channelColor
}: MatrixCellProps): JSX.Element {
	const getCellStyle = () => {
		if (isSelected) {
			return { backgroundColor: '#48c774', cursor: 'pointer' };
		}
		if (isAdjacent) {
			return { backgroundColor: '#ffdd57', cursor: 'pointer' };
		}
		return { cursor: 'pointer' };
	};

	return (
		<td
			className={`has-text-centered is-size-4 has-text-${channelColor}`}
			style={getCellStyle()}
			onClick={onClick}
		>
			{value}
		</td>
	);
}

export function MatrixGrid({
	matrix,
	selectedCell,
	onCellClick,
	onClickOutside
}: MatrixGridProps): JSX.Element {
	const matrixRef = useRef<HTMLTableElement>(null);
	const [rChannel, gChannel, bChannel] = matrix.getChannels();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (matrixRef.current && !matrixRef.current.contains(event.target as Node)) {
				onClickOutside();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [onClickOutside]);

	const getAdjacentPositions = (position: Position | null): Position[] => {
		return position ? GameLogic.getAdjacentPositions(position) : [];
	};

	const isPositionAdjacent = (position: Position, adjacentPositions: Position[]): boolean => {
		return adjacentPositions.some(
			pos => pos.row === position.row && pos.col === position.col
		);
	};

	const adjacentPositions = getAdjacentPositions(selectedCell);

	const renderChannelRow = (
		channelName: string,
		channelValues: number[],
		rowIndex: number,
		channelColor: string
	): JSX.Element => (
		<tr key={channelName}>
			<th
				className={`has-text-centered has-text-${channelColor} is-size-4`}
				style={{ width: '50px' }}
			>
				{channelName}
			</th>
			{channelValues.map((value, colIndex) => {
				const position: Position = { row: rowIndex, col: colIndex };
				const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
				const isAdjacent = isPositionAdjacent(position, adjacentPositions);

				return (
					<MatrixCell
						key={`${channelName}-${colIndex}`}
						value={value}
						position={position}
						isSelected={isSelected}
						isAdjacent={isAdjacent}
						onClick={() => onCellClick(position)}
						channelColor={channelColor}
					/>
				);
			})}
		</tr>
	);

	return (
		<div className="box">
			<table ref={matrixRef} className="table is-bordered">
				<tbody>
					{renderChannelRow("R", [...rChannel.getValue()], 0, "danger")}
					{renderChannelRow("G", [...gChannel.getValue()], 1, "success")}
					{renderChannelRow("B", [...bChannel.getValue()], 2, "info")}
				</tbody>
			</table>
		</div>
	);
}