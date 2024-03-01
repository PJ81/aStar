import Point from "./point.js";

export default class AStarNode {

  parent: AStarNode;
  pos: Point;
  dir: number;
  h: number;
  g: number;

  constructor(s: Point, h: number = 0, g: number = 0, d: number = -1, p: AStarNode = null) {
    this.parent = p;
    this.pos = s.copy();
    this.dir = d;
    this.h = h;
    this.g = g;
  }

  get cost(): number {
    return this.g + this.h;
  }

  equals(other: AStarNode): boolean {
    return other.pos.equals(this.pos);
  }

  samePos(pos: Point): boolean {
    return this.pos.equals(pos);
  }

}