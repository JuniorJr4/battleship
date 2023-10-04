import Ship from "./Ship";
import { ShipProps } from "./Ship";

interface GameBoardProps {
  width: number;
  height: number;
}

interface AttackResult {
  hit: boolean;
  sunk: boolean;
}

export default class Gameboard {
  width: number;
  height: number;
  ships: Ship[];
  missedAttacks: number[][];

  constructor(props: GameBoardProps) {
    this.width = props.width;
    this.height = props.height;
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(shipProps: ShipProps, x: number, y: number, isVertical: boolean) {
    const ship = new Ship(shipProps);
    const positions: [number, number][] = [];

    for (let i = 0; i < ship.length; i++) {
      const position: [number, number] = isVertical ? [x, y + i] : [x + i, y];
      positions.push(position);
    }

    const outOfBounds = positions.some(
      ([x, y]) => x < 0 || x >= this.width || y < 0 || y >= this.height
    );

    if (outOfBounds) {
      return false;
    }

    const overlapping = this.ships.some((existingShip) =>
    existingShip.location.some(([x, y]) =>
    positions.some(([newX, newY]) => existingShip.getLocation(existingShip.location.indexOf([x, y])).x === newX && existingShip.getLocation(existingShip.location.indexOf([x, y])).y === newY)
      )
    );

    return !overlapping;
  }
}
