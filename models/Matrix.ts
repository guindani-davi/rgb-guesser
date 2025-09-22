import { ColorChannel } from "@/models/ColorChannel";
import { checkValidColorChannel } from "@/models/Helper";

class Matrix {
	private r: ColorChannel;
	private g: ColorChannel;
	private b: ColorChannel;

	constructor(r: ColorChannel, g: ColorChannel, b: ColorChannel) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	private setR(r: ColorChannel): void {
		this.r = r;
	}

	private setG(g: ColorChannel): void {
		this.g = g;
	}

	private setB(b: ColorChannel): void {
		this.b = b;
	}

	private getR(): ColorChannel {
		return this.r;
	}

	private getG(): ColorChannel {
		return this.g;
	}

	private getB(): ColorChannel {
		return this.b;
	}

	public getRGB(): [ColorChannel, ColorChannel, ColorChannel] {
		return [this.getR(), this.getG(), this.getB()];
	}

	public setRGB(matrix: [ColorChannel, ColorChannel, ColorChannel]): void {
		if (!matrix.every(checkValidColorChannel)) {
			throw new Error("Invalid ColorChannel in matrix");
		}

		this.setR(matrix[0]);
		this.setG(matrix[1]);
		this.setB(matrix[2]);
	}

	public getValue(row: number, col: number): number {
		if (row < 0 || row > 2 || col < 0 || col > 2) {
			throw new Error("Invalid position");
		}
		
		const channels = [this.r, this.g, this.b];
		return channels[row].getValue()[col];
	}

	public setValue(row: number, col: number, value: number): void {
		if (row < 0 || row > 2 || col < 0 || col > 2) {
			throw new Error("Invalid position");
		}
		if (value < 0 || value > 9) {
			throw new Error("Invalid value");
		}
		
		const currentValues = row === 0 ? this.r.getValue() : row === 1 ? this.g.getValue() : this.b.getValue();
		const newValues: [number, number, number] = [...currentValues];
		newValues[col] = value;
		
		const newChannel = new ColorChannel(newValues);
		
		if (row === 0) {
			this.setR(newChannel);
		} else if (row === 1) {
			this.setG(newChannel);
		} else {
			this.setB(newChannel);
		}
	}

	public swapValues(row1: number, col1: number, row2: number, col2: number): void {
		const value1 = this.getValue(row1, col1);
		const value2 = this.getValue(row2, col2);
		
		this.setValue(row1, col1, value2);
		this.setValue(row2, col2, value1);
	}
}

export { Matrix };
