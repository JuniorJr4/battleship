import Ship from '../components/Ship';


describe('Ship', () => {
  it('should create a ship with the correct length', () => {
    const ship = new Ship({ length: 3 });
    expect(ship.length).toBe(3);
  });

  it('should hit a position on the ship', () => {
    const ship = new Ship({ length: 3 });
    ship.hit(1);
    expect(ship.hits).toEqual([0, 1, 0]);
  });

  it('should not hit a position outside the ship', () => {
    const ship = new Ship({ length: 3 });
    ship.hit(-1);
    ship.hit(3);
    expect(ship.hits).toEqual([0, 0, 0]);
  });

  it('should sink the ship when all positions are hit', () => {
    const ship = new Ship({ length: 3 });
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk).toBe(true);
  });

  it('should not sink the ship when not all positions are hit', () => {
    const ship = new Ship({ length: 3 });
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk).toBe(false);
  });
});