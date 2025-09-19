import { checkValidColorChannel } from "@/models/Helper";

class ColorChannel {
	private value: [number, number, number];

	constructor(value: [number, number, number]) {
		this.value = value;
	}

	public getValue(): [number, number, number] {
		return this.value;
	}

	public setValue(newColorChannel: ColorChannel) {
		if (!checkValidColorChannel(newColorChannel)) {
			throw new Error("Invalid color channel values");
		}
		this.value = newColorChannel.getValue();
	}
}
export { ColorChannel };
