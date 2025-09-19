import type { ColorChannel } from "@/models/ColorChannel";
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
}

export { Matrix };
