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
  });
});
