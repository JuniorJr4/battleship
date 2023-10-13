import React, { useState, useEffect } from "react";
import Gameboard from "../components/GameBoard";
import Player from "../components/Player";
import GameboardComponent from "../components/GameboardComponent";

export default function Battleship() {
  const [playerGameboard, setPlayerGameboard] = useState(
    new Gameboard({ width: 10, height: 10 })
  );
  const [computerGameboard, setComputerGameboard] = useState(
    new Gameboard({ width: 10, height: 10 })
  );
  const [player, setPlayer] = useState(new Player({ name: "Player1" }));
  const [computerPlayer, setComputerPlayer] = useState(
    new Player({ name: "Computer" })
  );
  const [currentPlayer, setCurrentPlayer] = useState(player);

  useEffect(() => {
    const playerPlaceShipBtn = document.querySelector(".player-place-ship");
    function handlePlayerPlaceShip(x: number, y: number) {
      player.playerPlaceShip(
        playerGameboard,
        playerGameboard.ships[0],
        x,
        y,
        true
      );
      console.log(playerGameboard.ships[0]);
    }
    playerPlaceShipBtn?.addEventListener("click", () => {
      handlePlayerPlaceShip(0, 0);
    });
    return () => {
      playerPlaceShipBtn?.removeEventListener("click", () => {
        handlePlayerPlaceShip(0, 0);
      });
    }
  }, [player, playerGameboard]);

  // function handlePlayerPlaceShip(x: number, y: number) {
  //   player.playerPlaceShip(
  //     playerGameboard,
  //     playerGameboard.ships[0],
  //     x,
  //     y,
  //     true
  //   );
  // }

  function handleComputerPlaceShips() {
    computerGameboard.placeAllShipsRandomly();
    console.log(computerGameboard.ships);
  }

  function handleComputerAttack() {
    computerPlayer.computerRandomAttack(
      computerGameboard,
      computerPlayer.computerMoves
    );
  }

  return (
    <div>
      <h1>Battleship</h1>
      <h2>{currentPlayer.name}'s turn</h2>

      <div className="gameboards  ">
        <div className="player-gameboard"></div>
        <h3>Player</h3>
        <GameboardComponent gameboard={playerGameboard} />
        <button className="player-place-ship">Player Place Ship</button>

        <div className="computer-gameboard"></div>
        <h3>Computer</h3>
        <GameboardComponent gameboard={computerGameboard} />
      </div>

      <button onClick={handleComputerPlaceShips}>Computer Place Ships</button>
      <button onClick={handleComputerAttack}>Computer Attack</button>
    </div>
  );
}
