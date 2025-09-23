import { ColorChannelError } from "@/models/Errors";

type ColorChannelValue = readonly [number, number, number];

class ColorChannel {
	private readonly _value: ColorChannelValue;

	constructor(value: ColorChannelValue) {
		this._value = this.validateAndNormalize(value);
	}

	private validateAndNormalize(value: ColorChannelValue): ColorChannelValue {
		if (!Array.isArray(value)) {
			throw new ColorChannelError("ColorChannel value must be an array", value);
		}

		if (value.length !== 3) {
			throw new ColorChannelError(
				`ColorChannel must have exactly 3 values, got ${value.length}`,
				value,
			);
		}

		for (let i = 0; i < value.length; i++) {
			const digit = value[i];
			if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
				throw new ColorChannelError(
					`ColorChannel value at index ${i} must be an integer between 0 and 9, got ${digit}`,
					digit,
				);
			}
		}

		return value;
	}

	public getValue(): ColorChannelValue {
		return [...this._value] as ColorChannelValue;
	}

	public getValueAt(index: number): number {
		if (!Number.isInteger(index) || index < 0 || index > 2) {
			throw new ColorChannelError(
				`Index must be an integer between 0 and 2, got ${index}`,
				index,
			);
		}
		return this._value[index];
	}

	public withValueAt(index: number, newValue: number): ColorChannel {
		if (!Number.isInteger(index) || index < 0 || index > 2) {
			throw new ColorChannelError(
				`Index must be an integer between 0 and 2, got ${index}`,
				index,
			);
		}

		if (!Number.isInteger(newValue) || newValue < 0 || newValue > 9) {
			throw new ColorChannelError(
				`New value must be an integer between 0 and 9, got ${newValue}`,
				newValue,
			);
		}

		const newValues = [...this._value] as [number, number, number];
		newValues[index] = newValue;
		return new ColorChannel(newValues);
	}

	public toRGBValue(): number {
		return parseInt(this._value.join(""), 10);
	}

	public equals(other: ColorChannel): boolean {
		return this._value.every((value, index) => value === other._value[index]);
	}

	public toString(): string {
		return this._value.join("");
	}
}

export { ColorChannel };
export type { ColorChannelValue };
