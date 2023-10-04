//Define Ship interface to be used in Ship component
 export interface ShipProps {
  length: number;
}

export default class Ship {
  length: number;
  hits: number[];
  isSunk: boolean;

  constructor(props: ShipProps) {
    this.length = props.length;
    this.hits = new Array(props.length).fill(0);
    this.isSunk = false;
  }
  hit(position: number) {
    if (position < 0 || position >= this.length) {
      //throw new Error(`Invalid position: ${position}`);
      return
    }
    this.hits[position] = 1;
    this.isSunk = this.hits.every((hit) => hit === 1);
  }
}
