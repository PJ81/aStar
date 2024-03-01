import Point from "./point.js";

export default class Cell {

  pos: Point;
  type: number;

  constructor(pt: Point, type: number) {
    this.pos = pt.copy();
    this.type = type;
  }

}