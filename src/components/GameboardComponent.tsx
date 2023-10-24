import React, { useState, useEffect } from "react";
import Gameboard from "./GameBoard";
import Ship from "../components/Ship";

import { MouseEvent } from "react";
interface Props {
  gameboard: Gameboard;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
export default function GameboardComponent({ gameboard, onClick }: Props) {
  const [renderCount, setRenderCount] = useState(0);

  // useEffect(() => {
  //   setRenderCount((prevCount) => prevCount + 1);
  // }, [gameboard]);
  // // selected cell state to use when clicked??
  // const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
  //   null
  // );

  // // return coordinates of clicked cell
  // const handleCellClick = (x: number, y: number) => {
  //   const coords: [number, number] = [x, y];
  //   setSelectedCell(coords);
  //   //gameboard.attackResult(gameboard.ships, [x, y]);
   
  // };
  const rows: React.JSX.Element[] = [];
  if (gameboard.height > 0 && gameboard.width > 0) {
    for (let i = 0; i < gameboard.height; i++) {
      const cells: React.JSX.Element[] = [];
      for (let j = 0; j < gameboard.width; j++) {
        const key = `${i}-${j}`;

        const isShipLocation = gameboard.ships.some((ship) =>
          ship.location.some(
            (location) => location[0] === i && location[1] === j
          )
        );
        //const hitOrMiss = gameboard.getCellClass(i, j);
       //console.log(isShipLocation);
        cells.push(
          <div
            key={key}
            data-x={i}
            data-y={j}
            className={`cell h-8 border border-black border-solid ${
              isShipLocation ? "bg-black" : ""
            }`}
            onClick={(e) => {
              //handleCellClick(i, j);
              onClick && onClick(e);
            }}
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

  return <div className="gameboard grid grid-cols-10 ">{rows} </div>;
}
