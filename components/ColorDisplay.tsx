import type { JSX } from "react";
import { Matrix } from "@/models/Matrix";

interface ColorDisplayProps {
	currentMatrix: Matrix;
	targetMatrix: Matrix;
}

interface ColorBoxProps {
	color: string;
	label: string;
}

function ColorBox({ color, label }: ColorBoxProps): JSX.Element {
	return (
		<div className="mb-5">
			<p className="has-text-centered mb-2 is-size-5">{label}</p>
			<div
				style={{
					width: '150px',
					height: '150px',
					backgroundColor: color,
					border: '1px solid #dbdbdb',
					borderRadius: '4px'
				}}
			/>
		</div>
	);
}

export function ColorDisplay({ currentMatrix, targetMatrix }: ColorDisplayProps): JSX.Element {
	const currentColor = currentMatrix.toRGBColor();
	const targetColor = targetMatrix.toRGBColor();

	return (
		<div className="box">
			<ColorBox color={currentColor} label="Cor Atual" />
			<ColorBox color={targetColor} label="Cor Alvo" />
		</div>
	);
}