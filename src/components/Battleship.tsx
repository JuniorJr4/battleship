import React, { useState, useEffect, MouseEvent } from "react";
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

  // const [renderCount, setRenderCount] = useState(0);

  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );

  const [isGameRunning, setIsGameRunning] = useState(false);

  const startGame = () => {
    setSelectedCell(null);
    setIsGameRunning(true);
  };

  const stopGame = () => {
    setIsGameRunning(false);
  };

  //to re-render board
  // useEffect(() => {
  //   setRenderCount((prevCount) => prevCount + 1);
  // }, [computerGameboard, playerGameboard]);

  //temp set to place all ships randomly
  function handlePlayerPlaceShip() {
    const newPlayerGameboard = new Gameboard({ width: 10, height: 10 });
    newPlayerGameboard.placeAllShipsRandomly();
    setPlayerGameboard(newPlayerGameboard);
    //setRenderCount((prevCount) => prevCount + 1);
  }

  function handlePlayerClick(e: MouseEvent<HTMLDivElement>) {
    const x = parseInt((e.target as HTMLDivElement).getAttribute("data-x")!);
    const y = parseInt((e.target as HTMLDivElement).getAttribute("data-y")!);
    const coords: [number, number] = [x, y];
    setSelectedCell(coords);
    console.log(
      computerGameboard.missedAttacks,
      playerGameboard,
      computerGameboard
    );
  }

  function handleComputerPlaceShips() {
    const newComputerGameboard = new Gameboard({ width: 10, height: 10 });
    newComputerGameboard.placeAllShipsRandomly();
    console.log(newComputerGameboard.ships);
    setComputerGameboard(newComputerGameboard);
    //setRenderCount((prevCount) => prevCount + 1);
  }

  useEffect(() => {
    function handlePlayerAttack() {
      console.log(selectedCell);
      if (selectedCell) {
        const [x, y] = selectedCell;
        const isHit = computerGameboard.attackResult(
          computerGameboard,
          selectedCell
        );
        computerGameboard.updateCellClass(x, y, isHit, true);
        setComputerGameboard(computerGameboard);
        //setRenderCount((prevCount) => prevCount + 1);
      }
    }

    function handleComputerAttack() {
      const randomAttack = computerPlayer.computerRandomAttack(
        playerGameboard,
        computerPlayer.attacksMade
      );
      const [x, y] = randomAttack.split(",").map(Number);
      const isHit = playerGameboard.attackResult(playerGameboard, [x, y]);
      playerGameboard.updateCellClass(x, y, isHit, false);
      setPlayerGameboard(playerGameboard);
      //attackResult === null ?
      //setComputerGameboard(...computerGameboard, );
    }

    if (isGameRunning) {
      if (playerGameboard.allShipsSunk() || computerGameboard.allShipsSunk()) {
        stopGame();
        return;
      }

      if (currentPlayer === player && selectedCell) {
        //player turn
        // const [x, y] = selectedCell;
        handlePlayerAttack();
        setCurrentPlayer(computerPlayer);
        setSelectedCell(null);
      } else if (currentPlayer === computerPlayer) {
        //computer turn
        handleComputerAttack();
        setCurrentPlayer(player);
        setSelectedCell(null);
      }
    }
  }, [
    computerGameboard,
    computerPlayer,
    currentPlayer,
    isGameRunning,
    player,
    playerGameboard,
    selectedCell,
    setComputerGameboard,
  ]);

  // useEffect(() => {
  //   if (isGameRunning) {
  //     if (
  //       playerGameboard.allShipsSunk(playerGameboard.ships) ||
  //       computerGameboard.allShipsSunk(computerGameboard.ships)
  //     ) {
  //       stopGame();
  //       return;
  //     }

  //     if (currentPlayer === player && selectedCell) {
  //       //player turn
  //       // const [x, y] = selectedCell;
  //       handlePlayerAttack();
  //     }
  //   }
  // }, [computerGameboard, currentPlayer, isGameRunning, player, playerGameboard, selectedCell]);

  return (
    <div>
      <h1>Battleship</h1>
      <h2>{currentPlayer.name}'s turn</h2>

      <div className="gameboards flex justify-around ">
        <div className="player-gameboard">
          <h3>Player</h3>
          <GameboardComponent gameboard={playerGameboard} />
          <button className="player-place-ship" onClick={handlePlayerPlaceShip}>
            Player Place Ship
          </button>
        </div>
        <div className="computer-gameboard">
          <h3>Computer</h3>
          <GameboardComponent
            onClick={handlePlayerClick}
            gameboard={computerGameboard}
          />
          <button className="comp" onClick={handleComputerPlaceShips}>
            Computer Place Ships
          </button>
          {/* <button onClick={handleComputerAttack}>Computer Attack</button> */}
        </div>
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}
