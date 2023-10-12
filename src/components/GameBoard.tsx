import Ship from "../components/Ship";

interface GameBoardProps {
  width?: number;
  height?: number;
}

export default class Gameboard {
  width: number;
  height: number;
  ships: Ship[];
  allSunk: boolean;
  missedAttacks: number[][];

  constructor(props: GameBoardProps) {
    this.width = props.width ?? 10;
    this.height = props.height ?? 10;
    this.ships = [
      { name: "Carrier", length: 5 },
      { name: "Battleship", length: 4 },
      { name: "Cruiser", length: 3 },
      { name: "Submarine", length: 3 },
      { name: "Destroyer", length: 2 },
    ].map((props) => new Ship(props));
    this.missedAttacks = [];
    this.allSunk = false;
  }


  // still needed?
  getShipLocations(): [number, number][][] {
    return this.ships.map((ship) => ship.location);
  }

  // returns all the places a that a ship occupies
  getShipSegment(newShip: Ship, x: number, y: number, isVertical: boolean) {
    const positions: [number, number][] = [];
    for (let i = 0; i < newShip.length; i++) {
      const position: [number, number] = isVertical ? [x, y + i] : [x + i, y];
      positions.push(position);
    }
    return positions;
  }
  // returns true if the ship was placed out of bounds
  isOutOfBounds(positions: [number, number][]): boolean {
    return positions.some(
      ([x, y]) => x < 0 || x >= this.width || y < 0 || y >= this.height
    );
  }

  // returns true if the ship overlaps with another ship
  doesNewShipOverlap(positions: [number, number][], ships: Ship[]): boolean {
    for (const existingShip of ships) {
      for (const [x, y] of positions) {
        //console.log(`Checking segment (${x}, ${y}) of new ship`);
        if (existingShip.location.some(([ex, ey]) => ex === x && ey === y)) {
          return true;
        }
      }
    }
    return false;
  }

  // Finalize placement of the ship if valid (maybe not needed??)
  finalizeShipPlacement(newShip: Ship, positions: [number, number][]): boolean {
    if (
      !this.doesNewShipOverlap(positions, this.ships) &&
      !this.isOutOfBounds(positions)
    ) {
      newShip.setLocation(positions);
      // need to fix as ships are predefined
      this.ships.push(newShip);
      return true;
    }
    return false;
  }

  placeShipRandomly(ship: Ship) {
    const isVertical = Math.random() > 0.5;
    const maxLength = isVertical
      ? this.height - ship.length + 1
      : this.width - ship.length + 1;
    const x = Math.floor(Math.random() * maxLength);
    const y = Math.floor(Math.random() * maxLength);

    const location: [number, number][] = [];
    for (let i = 0; i < ship.length; i++) {
      const set: [number, number] = isVertical ? [x, y + i] : [x + i, y];
      location.push(set);
    }

    if (this.doesNewShipOverlap(location, this.ships)) {
      return false;
    }
    ship.setLocation(location);
    return true;
  }

  placeAllShipsRandomly() {
    // need to fix as ships are predefined
    // const carrier = new Ship({ length: 5 });
    // const battleship = new Ship({ length: 4 });
    // const cruiser = new Ship({ length: 3 });
    // const submarine = new Ship({ length: 3 });
    // const destroyer = new Ship({ length: 2 });
    // this.ships.push(carrier, battleship, cruiser, submarine, destroyer);

    for (const ship of this.ships) {
      let isPlaced = false;
      while (!isPlaced) {
        isPlaced = this.placeShipRandomly(ship);
      }
    }
  }

  //Returns ship that has been hit or null if no ship hit (and adds missed attack)
  attackResult(allShips: Ship[], [x, y]: [number, number]): Ship | null {
    for (const hitShip of allShips) {
      if (hitShip.location.some(([ex, ey]) => ex === x && ey === y)) {
        const hitIndex = hitShip.location.findIndex(
          (set) => JSON.stringify(set) === JSON.stringify([x, y])
        );
        //console.log(hitIndex);
        hitShip.hit(hitIndex);
        return hitShip;
      }
    }
    this.missedAttacks.push([x, y]);
    return null;
  }

  // Returns true if all ships have been sunk
  allShipsSunk(allShips: Ship[]): boolean {
    return allShips.every((ship) => ship.isSunk);
  }
}
