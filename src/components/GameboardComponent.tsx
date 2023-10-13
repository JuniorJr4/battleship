import React, { useEffect } from "react";
import Gameboard from "./GameBoard";

interface Props {
  gameboard: Gameboard;
}

export default function GameboardComponent({ gameboard }: Props) {
  const rows: React.JSX.Element[] = [];
  if (gameboard.height > 0 && gameboard.width > 0) {
    for (let i = 0; i < gameboard.height; i++) {
      const cells: React.JSX.Element[] = [];
      for (let j = 0; j < gameboard.width; j++) {
        const key = `${i}-${j}`;
        console.log(i);
        cells.push(
          <div
            key={key}
            className="cell h-10 border border-black border-solid"
          ></div>
        );
      }
      rows.push(
        <div key={i} className="row flex flex-col">
          {cells}
        </div>
      );
    }
  }

  useEffect(() => {
    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach((cell) => {
     // console.log(cell.getAttribute("key"));
     
    });
  }, []);
  return <div className="gameboard grid grid-cols-10 ">{rows} </div>;
}
