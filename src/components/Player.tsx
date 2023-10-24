import Ship from "../components/Ship";
import Gameboard from "../components/GameBoard";

interface PlayerProps {
  name: string;
}

export default class Player {
  name: string;
  computerMoves: Set<string>;
  playerMoves: Set<string>;
  isPlayerTurn: boolean;

  constructor(props: PlayerProps) {
    this.name = props.name;
    this.computerMoves = new Set<string>();
    this.playerMoves = new Set<string>();
    this.isPlayerTurn = false;
  }

  //When player selects a starting square to place ship
  playerPlaceShip(
    gameboard: Gameboard,
    ship: Ship,
    x: number,
    y: number,
    isVertical: boolean
  ) {
    const position = gameboard.getShipSegment(ship, x, y, isVertical);
    gameboard.finalizeShipPlacement(ship, position);
  }

  playerAttack(gameboard: Gameboard, x: number, y: number) {
    gameboard.attackResult(gameboard.ships, [x, y]);
  }

  computerRandomAttack(gameboard: Gameboard, selectedPoints: Set<string>) {
    let randomX = Math.floor(Math.random() * gameboard.width);
    let randomY = Math.floor(Math.random() * gameboard.height);
    let point = `${randomX},${randomY}`;

    while (selectedPoints.has(point)) {
      randomX = Math.floor(Math.random() * gameboard.width);
      randomY = Math.floor(Math.random() * gameboard.height);
      point = `${randomX},${randomY}`;
    }

    selectedPoints.add(point);
    gameboard.attackResult(gameboard.ships, [randomX, randomY]);
  }
}
