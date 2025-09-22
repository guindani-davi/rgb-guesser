import { ColorChannel } from "@/models/ColorChannel";
import { Matrix } from "@/models/Matrix";

function checkValidColorChannel(colorChannel: ColorChannel): boolean {
	return (
		colorChannel.getValue().length === 3 &&
		colorChannel
			.getValue()
			.every((v) => Number.isInteger(v) && v >= 0 && v <= 9)
	);
}

function checkValidMatrix(matrix: Matrix): boolean {
	const rgb = matrix.getRGB();
	return (
		rgb.length === 3 && rgb.every((channel) => checkValidColorChannel(channel))
	);
}

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

function shuffleMatrix(matrix: Matrix): Matrix {
	if (!checkValidMatrix(matrix)) {
		throw new Error("Invalid matrix");
	}

	const [r, g, b] = matrix.getRGB();

	const allNumbers = [...r.getValue(), ...g.getValue(), ...b.getValue()];

	const shuffledNumbers = shuffleArray(allNumbers);

	const shuffledR = new ColorChannel(
		shuffledNumbers.slice(0, 3) as [number, number, number],
	);
	const shuffledG = new ColorChannel(
		shuffledNumbers.slice(3, 6) as [number, number, number],
	);
	const shuffledB = new ColorChannel(
		shuffledNumbers.slice(6, 9) as [number, number, number],
	);

	return new Matrix(shuffledR, shuffledG, shuffledB);
}

function matricesEqual(matrix1: Matrix, matrix2: Matrix): boolean {
	const [r1, g1, b1] = matrix1.getRGB();
	const [r2, g2, b2] = matrix2.getRGB();
	
	return (
		r1.getValue().every((val, idx) => val === r2.getValue()[idx]) &&
		g1.getValue().every((val, idx) => val === g2.getValue()[idx]) &&
		b1.getValue().every((val, idx) => val === b2.getValue()[idx])
	);
}

function getAdjacentCells(row: number, col: number): { row: number; col: number }[] {
	const adjacent = [];
	const directions = [
		[-1, 0], [1, 0], [0, -1], [0, 1],
		[-1, -1], [-1, 1], [1, -1], [1, 1]
	];
	
	for (const [dr, dc] of directions) {
		const newRow = row + dr;
		const newCol = col + dc;
		if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
			adjacent.push({ row: newRow, col: newCol });
		}
	}
	
	return adjacent;
}

export { checkValidColorChannel, checkValidMatrix, shuffleMatrix, matricesEqual, getAdjacentCells };
