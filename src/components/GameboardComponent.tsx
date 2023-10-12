import React from "react";
import Gameboard from "./GameBoard";

interface Props {
  gameboard: Gameboard;
}

export default function GameboardComponent({ gameboard }: Props) {
  const rows: JSX.Element[] = [];
  if (gameboard.height > 0 && gameboard.width > 0) {
    for (let i = 0; i < gameboard.height; i++) {
      const cells: JSX.Element[] = [];
      for (let j = 0; j < gameboard.width; j++) {
        cells.push(<div key={j} className="cell"></div>);
      }
      rows.push(
        <div key={i} className="row">
          {cells}
        </div>
      );
    }
  }

  return <div className="gameboard">{rows}</div>;
}
