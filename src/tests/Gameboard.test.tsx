import Gameboard from "../components/GameBoard";
import Ship from "../components/Ship";

describe("Gameboard", () => {
  describe("getShipSegment", () => {
    it("should return segment of placed ship", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps = { length: 4 };
      const newShip = new Ship(shipProps);
      const result = gameboard.getShipSegment(newShip, 0, 0, false);
      expect(result).toStrictEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ]);
    });

    it("should return true if ship is out of bounds", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps = { length: 3 };
      const newShip = new Ship(shipProps);
      const positions = gameboard.getShipSegment(newShip, 9, 9, true);
      const result = gameboard.isOutOfBounds(positions);
      expect(result).toBe(true);
    });

    it("Show ship location", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps = { length: 4 };
      const newShip = new Ship(shipProps);
      const result = gameboard.getShipSegment(newShip, 1, 1, true);
      expect(result).toEqual([
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
      ]);
    });


    it("doesNewShipOverlap detects overlap correctly", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const ship1 = new Ship({ length: 3 });
      const ship2 = new Ship({ length: 4 });
      const ship3 = new Ship({ length: 2 });
      ship1.setLocation([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
      ship2.setLocation([
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
      ]);
      ship3.setLocation([
        [2, 2],
        [2, 3],
      ]);
      gameboard.ships.push(ship1);
      gameboard.ships.push(ship2);
      const overlap = gameboard.doesNewShipOverlap(
        ship3.location,
        gameboard.ships
      );
      expect(overlap).toBe(true);
      // const noOverlap = gameboard.placeShip(ship3, 7, 7, false);
      // expect(noOverlap).toBe(true);
    });

    it("should add ship to ships array if ship can be placed", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps1 = { length: 3 };
      const shipProps2 = { length: 2 };
      const newShip1 = new Ship(shipProps1);
      const newShip2 = new Ship(shipProps2);
      const ship1Segement = gameboard.getShipSegment(newShip1, 0, 0, true);
      const ship2Segement = gameboard.getShipSegment(newShip2, 3, 3, false);
      const isInBounds1 = gameboard.isOutOfBounds(ship1Segement);
      const isInBounds2 = gameboard.isOutOfBounds(ship2Segement);
      const doesOverlap1 = gameboard.doesNewShipOverlap(
        ship1Segement,
        gameboard.ships
      );
      const doesOverlap2 = gameboard.doesNewShipOverlap(
        ship2Segement,
        gameboard.ships
      );
      if (!isInBounds1 && !doesOverlap1) {
        gameboard.finalizeShipPlacement(newShip1, ship1Segement);
      }
      if (!isInBounds2 && !doesOverlap2) {
        gameboard.finalizeShipPlacement(newShip2, ship2Segement);
      }
      expect(newShip1.location).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
      expect(newShip2.location).toEqual([
        [3, 3],
        [4, 3],
      ]);
      expect(gameboard.ships.length).toBe(2);
      expect(gameboard.ships[0]).toBeInstanceOf(Ship);
      expect(gameboard.ships[0].length).toBe(shipProps1.length);
    });
    it("should return true if attack is a hit", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps1 = { length: 3 };
      const newShip1 = new Ship(shipProps1);
      const ship1Segement = gameboard.getShipSegment(newShip1, 0, 0, true);
      gameboard.finalizeShipPlacement(newShip1, ship1Segement);
      const result = gameboard.attackResult(gameboard.ships, [0, 0]);
      expect(result).toBe(newShip1);
    });
  });
});
describe('attackResult', () => {
  let gameboard: Gameboard;
  let ship1: Ship;
  let ship2: Ship;

  beforeEach(() => {
    gameboard = new Gameboard({ width: 10, height: 10 });
    ship1 = new Ship({ length: 3 });
    ship2 = new Ship({ length: 4 });
    ship1.setLocation([[0, 0], [0, 1], [0, 2]]);
    ship2.setLocation([[2, 2], [2, 3], [2, 4], [2, 5]]);
    gameboard.ships.push(ship1);
    gameboard.ships.push(ship2);
  });

  it('should return the hit ship if a ship is hit', () => {
    const hitShip = gameboard.attackResult(gameboard.ships, [2, 3]);
    expect(hitShip).toBe(ship2);
  });

  it('should return null if no ship is hit', () => {
    const hitShip = gameboard.attackResult(gameboard.ships, [7, 8]);
    expect(hitShip).toBeNull();
  });

  it('should add the missed attack to the missedAttacks array if no ship is hit', () => {
    gameboard.attackResult(gameboard.ships, [7, 8]);
    expect(gameboard.missedAttacks).toContainEqual([7, 8]);
  });

  it('should mark the correct segment of the hit ship as hit', () => {
    const hitShip = gameboard.attackResult(gameboard.ships, [2, 3]);
    expect(hitShip?.hits).toEqual([0, 1, 0, 0]);
  });

  it('should mark the hit ship as sunk if all segments are hit', () => {
    gameboard.attackResult(gameboard.ships, [2, 2]);
    gameboard.attackResult(gameboard.ships, [2, 3]);
    gameboard.attackResult(gameboard.ships, [2, 4]);
    gameboard.attackResult(gameboard.ships, [2, 5]);
    expect(ship2.isSunk).toBe(true);
  });
});
describe('allShipsSunk', () => {
  let gameboard: Gameboard;
  let ship1: Ship;
  let ship2: Ship;

  beforeEach(() => {
    gameboard = new Gameboard({ width: 10, height: 10 });
    ship1 = new Ship({ length: 3 });
    ship2 = new Ship({ length: 4 });
    ship1.setLocation([[0, 0], [0, 1], [0, 2]]);
    ship2.setLocation([[2, 2], [2, 3], [2, 4], [2, 5]]);
    gameboard.ships.push(ship1);
    gameboard.ships.push(ship2);
  });
  it('should return true if all ships are sunk', () => {
    const ships = gameboard.ships;
    ships[0].isSunk = true;
    ships[1].isSunk = true; 
    
    expect(gameboard.allShipsSunk(ships)).toBe(true);
  });

  it('should return false if not all ships are sunk', () => {
    const ships = gameboard.ships;

    ships[0].hit(0);
    ships[1].hit(1);

    expect(gameboard.allShipsSunk(ships)).toBe(false);
  });

  it('should return true if there are no ships', () => {
    const ships: Ship[] = [];

    expect(gameboard.allShipsSunk(ships)).toBe(true);
  });
});
describe('GameBoard', () => {
  describe('placeShipRandomly', () => {
    it('should place a ship randomly on the game board', () => {
      const gameBoard = new Gameboard({ width: 10, height: 10 });
      const ship = new Ship({ length: 3 });
      const isPlaced = gameBoard.placeShipRandomly(ship);
      expect(isPlaced).toBe(true);
      expect(ship.location.length).toBe(3);
    });

    it('should not place a ship that overlaps with another ship', () => {
      const gameBoard = new Gameboard({ width: 10, height: 10 });
      const ship1 = new Ship({ length: 3 });
      const ship2 = new Ship({ length: 3 });
      gameBoard.placeShipRandomly(ship1);
      const isPlaced = gameBoard.placeShipRandomly(ship2);
      expect(isPlaced).toBe(false);
    });
  });

  // describe('placeAllShipsRandomly', () => {
  //   it('should place all ships randomly on the game board', () => {
  //     const gameBoard = new GameBoard({ width: 10, height: 10 });
  //     gameBoard.placeAllShipsRandomly();
  //     expect(gameBoard.ships.length).toBe(5);
  //     for (const ship of gameBoard.ships) {
  //       expect(ship.location.length).toBe(ship.length);
  //     }
  //   });

  //   it('should not place ships that overlap with each other', () => {
  //     const gameBoard = new GameBoard({ width: 10, height: 10 });
  //     gameBoard.placeAllShipsRandomly();
  //     const isOverlap = gameBoard.isAnyShipOverlap();
  //     expect(isOverlap).toBe(false);
  //   });
  // });
});
