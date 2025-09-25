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
    <div className="mb-4">
      <p className="has-text-centered mb-2 is-size-6-mobile is-size-5-tablet is-size-5-desktop">{label}</p>
      <div
        style={{
          width: "100%",
          maxWidth: "200px",
          height: "150px",
          backgroundColor: color,
          border: "1px solid #dbdbdb",
          borderRadius: "4px",
          margin: "0 auto",
        }}
      />
    </div>
  );
}

export function ColorDisplay({
  currentMatrix,
  targetMatrix,
}: ColorDisplayProps): JSX.Element {
  const currentColor = currentMatrix.toRGBColor();
  const targetColor = targetMatrix.toRGBColor();

  return (
    <>
      <style>
        {`
          @media screen and (min-width: 1024px) {
            .color-display-desktop {
              min-height: 380px;
              padding: 1.5rem !important;
            }
          }
        `}
      </style>
      <div className="box color-display-desktop">
        <div className="columns is-mobile is-gapless">
          <div className="column">
            <ColorBox color={currentColor} label="Cor Atual" />
          </div>
          <div className="column">
            <ColorBox color={targetColor} label="Cor Alvo" />
          </div>
        </div>
      </div>
    </>
  );
}
