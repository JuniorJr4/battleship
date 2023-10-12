//Define Ship interface to be used in Ship component
export interface ShipProps {
  name?: string;
  length: number;
}

export default class Ship {
  name: string;
  length: number;
  hits: number[];
  isSunk: boolean;
  location: [number, number][];

  constructor(props: ShipProps) {
    this.length = props.length;
    this.hits = new Array(props.length).fill(0);
    this.isSunk = false;
    this.name = props.name ?? "";
    this.location = [];
  }

  setLocation(location: [number, number][]) {
    this.location = location;
  }
  // not needed?
  getLocation(index: number) {
    return { x: this.location[index][0], y: this.location[index][1] };
  }

  hit(position: number) {
    if (position < 0 || position >= this.length) {
      //throw new Error(`Invalid position: ${position}`);
      return;
    }

    this.hits[position] = 1;
    this.isSunk = this.hits.every((hit) => hit === 1);
  }
}
