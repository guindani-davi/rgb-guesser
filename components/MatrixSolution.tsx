import type { JSX } from "react";
import type { Matrix } from "@/models/Matrix";

interface MatrixSolutionProps {
  matrix: Matrix;
}

export function MatrixSolution({ matrix }: MatrixSolutionProps): JSX.Element {
  const [rChannel, gChannel, bChannel] = matrix.getChannels();
  const rgbColor = matrix.toRGBColor();

  const renderChannelRow = (
    channelName: string,
    channelValues: number[],
    channelColor: string
  ): JSX.Element => (
    <tr key={channelName}>
      <th
        className={`has-text-centered has-text-${channelColor} is-size-4`}
        style={{
          width: "80px",
          padding: "12px",
          fontWeight: "bold",
        }}
      >
        {channelName}
      </th>
      {channelValues.map((value, colIndex) => (
        <td
          key={`${channelName}-${colIndex}`}
          className="has-text-centered is-size-4"
          style={{
            padding: "12px",
            minWidth: "60px",
          }}
        >
          {value}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="box has-background-white-bis">
      <h4 className="title is-5 has-text-centered mb-4">
        ✅ Configuração Correta
      </h4>

      <div className="columns is-mobile is-centered mb-4">
        <div className="column is-narrow">
          <div className="table-container">
            <table className="table is-bordered is-fullwidth">
              <tbody>
                {renderChannelRow("R", [...rChannel.getValue()], "danger")}
                {renderChannelRow("G", [...gChannel.getValue()], "success")}
                {renderChannelRow("B", [...bChannel.getValue()], "info")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="has-text-centered">
        <p className="subtitle is-6 has-text-grey-dark mb-3">
          Essa matriz representa a cor:
        </p>
        <div
          style={{
            width: "120px",
            height: "120px",
            backgroundColor: rgbColor,
            border: "2px solid #dbdbdb",
            borderRadius: "8px",
            margin: "0 auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
        <p className="has-text-grey mt-3 is-family-monospace">{rgbColor}</p>
      </div>
    </div>
  );
}
