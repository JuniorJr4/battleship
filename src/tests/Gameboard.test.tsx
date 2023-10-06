import Gameboard from "../components/GameBoard";
import Ship from "../components/Ship";

describe("Gameboard", () => {
  describe("placeShip", () => {
    it("should return true if ship can be placed on empty board", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps = { length: 3 };
      const newShip = new Ship(shipProps);
      const result = gameboard.placeShip(newShip, 0, 0, true);
      expect(result).toBe(true);
    });

    it("should return false if ship is out of bounds", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps = { length: 3 };
      const newShip = new Ship(shipProps);
      const result = gameboard.placeShip(newShip, 7, 7, true);
      expect(result).toBe(true);
    });

    it("Show ship location", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps = { length: 3 };
      const newShip = new Ship(shipProps);
      gameboard.placeShip(newShip, 1, 1, true);
      expect(newShip.location).toEqual([
        [1, 1],
        [1, 2],
        [1, 3],
      ]);
    });

    it("should return false if ship overlaps with existing ship", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps1 = { length: 3 };
      const shipProps2 = { length: 2 };
      const newShip1 = new Ship(shipProps1);
      const newShip2 = new Ship(shipProps2);
      gameboard.placeShip(newShip1, 0, 0, true);
      const result = gameboard.placeShip(newShip2, 0, 0, false);
      expect(newShip1.location).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
      expect(newShip2.location).toEqual([
        [0, 0],
        [1, 0],
      ]);
      expect(result).toBe(false);
    });

    it.only("doesNewShipOverlap detects overlap correctly", () => {
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
        [5, 5],
        [5, 6],
      ]);
      gameboard.ships.push(ship1);
      gameboard.ships.push(ship2);
      const overlap = gameboard.placeShip(ship3, 2, 5, false);
      expect(overlap).toBe(true);
      const noOverlap = gameboard.placeShip(ship3, 7, 7, false);
      expect(noOverlap).toBe(true);
    });

    it("should add ship to ships array if ship can be placed", () => {
      const gameboard = new Gameboard({ width: 10, height: 10 });
      const shipProps1 = { length: 3 };
      const shipProps2 = { length: 2 };
      const newShip1 = new Ship(shipProps1);
      const newShip2 = new Ship(shipProps2);
      gameboard.placeShip(newShip1, 0, 0, true);
      gameboard.placeShip(newShip2, 0, 0, true);
      expect(newShip1.location).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
      expect(newShip2.location).toEqual([
        [0, 0],
        [0, 1],
      ]);
      expect(gameboard.ships.length).toBe(1);
      expect(gameboard.ships[0]).toBeInstanceOf(Ship);
      expect(gameboard.ships[0].length).toBe(shipProps1.length);
    });
  });
});
