import  Gameboard  from '../components/GameBoard';
import  Ship  from '../components/Ship';
import  Player  from '../components/Player';

describe('Player', () => {
  let player: Player;
  let gameboard: Gameboard;
  let ship: Ship;

  beforeEach(() => {
    player = new Player({ name: 'Player 1' });
    gameboard = new Gameboard({ width: 10, height: 10 });
    ship = new Ship({ length: 3 });
  });

  describe('playerPlaceShip', () => {
    it('should place a ship on the gameboard', () => {
      player.playerPlaceShip(gameboard, ship, 0, 0, true);
      expect(gameboard.ships.length).toBe(1);
    });

    it('should place the ship in the correct position', () => {
      player.playerPlaceShip(gameboard, ship, 0, 0, true);
      const expectedPosition = [[0, 0], [0, 1], [0, 2]];
      expect(gameboard.ships[0].location).toEqual(expectedPosition);
    });
  });

  describe('playerAttack', () => {
    it('should attack the gameboard', () => {
      jest.spyOn(gameboard, 'attackResult');
      player.playerAttack(gameboard, 0, 0);
      expect(gameboard.attackResult).toHaveBeenCalledWith(gameboard.ships, [0, 0]);
    });
  });

  describe('computerRandomAttack', () => {
    it('should attack a random point on the gameboard', () => {
      jest.spyOn(gameboard, 'attackResult');
      const selectedPoints = new Set<string>();
      player.computerRandomAttack(gameboard, selectedPoints);
      expect(gameboard.attackResult).toHaveBeenCalled();
    });

    it('should not attack the same point twice', () => {
      jest.spyOn(gameboard, 'attackResult');
      const selectedPoints = new Set<string>();
      player.computerRandomAttack(gameboard, selectedPoints);
      player.computerRandomAttack(gameboard, selectedPoints);
      expect(gameboard.attackResult).toHaveBeenCalledTimes(2);
      expect(selectedPoints).toBe(2);
    });
  });
});