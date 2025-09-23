import { ColorChannel, type ColorChannelValue } from "@/models/ColorChannel";
import { PositionError } from "@/models/Errors";

type Position = {
	readonly row: number;
	readonly col: number;
};

type RGBChannels = readonly [ColorChannel, ColorChannel, ColorChannel];

class Matrix {
	private readonly _channels: RGBChannels;

	constructor(r: ColorChannel, g: ColorChannel, b: ColorChannel) {
		this._channels = [r, g, b] as const;
	}

	public static fromChannels(channels: RGBChannels): Matrix {
		return new Matrix(channels[0], channels[1], channels[2]);
	}

	public static fromValues(
		rValues: ColorChannelValue,
		gValues: ColorChannelValue,
		bValues: ColorChannelValue,
	): Matrix {
		return new Matrix(
			new ColorChannel(rValues),
			new ColorChannel(gValues),
			new ColorChannel(bValues),
		);
	}

	private validatePosition(position: Position): void {
		const { row, col } = position;

		if (!Number.isInteger(row) || !Number.isInteger(col)) {
			throw new PositionError(
				`Position coordinates must be integers: row=${row}, col=${col}`,
				position,
			);
		}

		if (row < 0 || row > 2 || col < 0 || col > 2) {
			throw new PositionError(
				`Position coordinates must be between 0 and 2: row=${row}, col=${col}`,
				position,
			);
		}
	}

	public getChannels(): RGBChannels {
		return [...this._channels] as RGBChannels;
	}

	public getRedChannel(): ColorChannel {
		return this._channels[0];
	}

	public getGreenChannel(): ColorChannel {
		return this._channels[1];
	}

	public getBlueChannel(): ColorChannel {
		return this._channels[2];
	}

	public getValueAt(position: Position): number {
		this.validatePosition(position);
		return this._channels[position.row].getValueAt(position.col);
	}

	public withValueAt(position: Position, value: number): Matrix {
		this.validatePosition(position);

		const newChannels = [...this._channels] as [
			ColorChannel,
			ColorChannel,
			ColorChannel,
		];
		newChannels[position.row] = this._channels[position.row].withValueAt(
			position.col,
			value,
		);

		return Matrix.fromChannels(newChannels);
	}

	public withSwappedValues(pos1: Position, pos2: Position): Matrix {
		const value1 = this.getValueAt(pos1);
		const value2 = this.getValueAt(pos2);

		return this.withValueAt(pos1, value2).withValueAt(pos2, value1);
	}

	public toRGBColor(): string {
		const [r, g, b] = this._channels;
		return `rgb(${r.toRGBValue()}, ${g.toRGBValue()}, ${b.toRGBValue()})`;
	}

	public equals(other: Matrix): boolean {
		return this._channels.every((channel, index) =>
			channel.equals(other._channels[index]),
		);
	}

	public getAllValues(): number[] {
		return this._channels.flatMap((channel) => [...channel.getValue()]);
	}

	public isValueCorrectAt(position: Position, targetMatrix: Matrix): boolean {
		this.validatePosition(position);
		return this.getValueAt(position) === targetMatrix.getValueAt(position);
	}

	public getCorrectPositions(targetMatrix: Matrix): Position[] {
		const correctPositions: Position[] = [];

		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				const position: Position = { col, row };
				if (this.isValueCorrectAt(position, targetMatrix)) {
					correctPositions.push(position);
				}
			}
		}

		return correctPositions;
	}
}

export { Matrix };
export type { Position, RGBChannels };
