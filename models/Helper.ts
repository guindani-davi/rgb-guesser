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

export { checkValidColorChannel, checkValidMatrix, shuffleMatrix };
