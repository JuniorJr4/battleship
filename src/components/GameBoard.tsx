import Ship from "../components/Ship";
import { ShipProps } from "../components/Ship";

interface GameBoardProps {
  width?: number;
  height?: number;
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
    this.width = props.width ?? 10;
    this.height = props.height ?? 10;
    this.ships = [];
    this.missedAttacks = [];
  }

  getShipSegment(newShip: Ship, x: number, y: number, isVertical: boolean) {
    const positions: [number, number][] = [];

    for (let i = 0; i < newShip.length; i++) {
      const position: [number, number] = isVertical ? [x, y + i] : [x + i, y];
      positions.push(position);
    }
    return positions
  }
// returns true if the ship was placed out of bounds
  isOutOfBounds(
    positions: [number, number][],
  ): boolean {
    return positions.some(
      ([x, y]) => x < 0 || x >= this.width || y < 0 || y >= this.height
    );
  }

  // returns true if the ship overlaps with another ship
  doesNewShipOverlap(positions: [number, number][], ships: Ship[]): boolean {
    for (const existingShip of ships) {
      for (const [x, y] of positions) {
        console.log(`Checking segment (${x}, ${y}) of new ship`);
        if (existingShip.location.some(([ex, ey]) => ex === x && ey === y)) {
          return true;
        }
      }
    }
    return false;
  }

  // Finalize placement of the ship if valid

  finalizeShipPlacement(newShip: Ship, positions: [number, number][]) {
    newShip.setLocation(positions);
    this.ships.push(newShip);
  }
  // if (doesNewShipOverlap(newShip, this.ships)) {
  //   return false;
  // }
  // newShip.setLocation(positions);
  // this.ships.push(newShip);
  // return true;
}
