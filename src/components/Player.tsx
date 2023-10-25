import Ship from "../components/Ship";
import Gameboard from "../components/GameBoard";

interface PlayerProps {
  name: string;
}

export default class Player {
  name: string;
  computerMoves: Set<string>;
  attacksMade: Set<string>;

  constructor(props: PlayerProps) {
    this.name = props.name;
    //computerMoves needed?
    this.computerMoves = new Set<string>();
    this.attacksMade = new Set<string>();
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
    this.attacksMade = new Set<string>([...this.attacksMade, selectedPoints]);
    gameboard.attackResult(gameboard.ships, [randomX, randomY]);
  }
}
