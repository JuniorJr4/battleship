import Ship from "../components/Ship";
import { ShipProps } from "../components/Ship";

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

  placeShip(newShip: Ship, x: number, y: number, isVertical: boolean) {
    const positions: [number, number][] = [];

    for (let i = 0; i < newShip.length; i++) {
      const position: [number, number] = isVertical ? [x, y + i] : [x + i, y];
      positions.push(position);
    }

    const outOfBounds = positions.some(
      ([x, y]) => x < 0 || x >= this.width || y < 0 || y >= this.height
    );

    if (outOfBounds) {
      return false;
    }

    const doesNewShipOverlap = (): boolean => {
      for (const existingShip of this.ships) {
        for (const [x, y] of newShip.location) {
          console.log(`Checking segment (${x}, ${y}) of new ship`);
          if (existingShip.location.some(([ex, ey]) => ex === x && ey === y)) {
            console.log(`Checking segment (${ex}, ${ey}) of existing ship`);
            return true;
          }
        }
      }
      return false;
    };

    if (doesNewShipOverlap()) {
      return false;
    }
    newShip.setLocation(positions);
    this.ships.push(newShip);
    return true;
  }
}
