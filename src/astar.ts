import AStarNode from "./astar_node.js";
import Point from "./point.js";

const neighbours = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];

export default class AStar {

  closedList: AStarNode[];
  openList: AStarNode[];
  aStarObj: any;

  inBounds(x: number, y: number): boolean {
    return (x > -1 && y > -1 && x < this.aStarObj.maxW && y < this.aStarObj.maxH && this.aStarObj.board[x][y].type !== 1);
  }

  inList(arr: AStarNode[], node: AStarNode): number {
    for (var i = 0; i < arr.length; i++) {
      if (node.equals(arr[i]))
        return i;
    }
    return -1;
  }

  addNeighbours(node: AStarNode): void {
    let p: number, pt: Point, nNode: AStarNode;

    for (let i = 0; i < neighbours.length; i++) {
      pt = new Point(node.pos.x + neighbours[i].x, node.pos.y + neighbours[i].y);
      nNode = new AStarNode(pt, 0, 0, i, node);

      if (!this.inBounds(pt.x, pt.y) || this.inList(this.closedList, nNode) > -1) continue;

      nNode.g = node.g + 1 + nNode.dir != node.dir ? 1 : 0;
      nNode.h = Math.abs(this.aStarObj.end.x - nNode.pos.x) + Math.abs(this.aStarObj.end.y - nNode.pos.y);

      p = this.inList(this.openList, nNode);
      if (p > -1 && this.openList[p].cost <= nNode.cost) continue;

      this.openList.push(nNode);
    }

    this.openList.sort((a, b) => { return a.cost - b.cost });
  }

  find(aStarObj: any, ctx: CanvasRenderingContext2D): boolean {
    this.closedList = [];
    this.openList = [];
    this.aStarObj = aStarObj;

    this.openList.push(new AStarNode(aStarObj.start));

    while (this.openList.length > 0) {

      let node = this.openList.splice(0, 1)[0];
      this.closedList.push(node);

      if (node.samePos(this.aStarObj.end)) {
        return true;
      }

      this.addNeighbours(node);
    }

    return false;
  }

  makePath(): Point[] {
    let cur = this.closedList[this.closedList.length - 1];
    const path: Point[] = [];

    while (cur !== null) {
      path.push(cur.pos.copy());
      cur = cur.parent;
    }

    return path;
  }
}