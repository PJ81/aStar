import AStar from "./astar.js";
import Cell from "./cell.js";
import Point from "./point.js";

const W = 250, H = 150, S = 6;

class AStarTest {

  board: Cell[][];
  aStar: AStar;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.aStar = new AStar();

    this.board = new Array(W);
    for (let x = 0; x < W; x++) {
      this.board[x] = new Array(H);
      for (let y = 0; y < H; y++) {
        this.board[x][y] = new Cell(new Point(x, y), Math.random() < .3 ? 1 : 0);
      }
    }

    this.canvas = document.createElement("canvas");
    this.canvas.width = S * W;
    this.canvas.height = S * H;
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    this.drawBoard();

    if (this.aStar.find({
      start: new Point(0, 0),
      end: new Point(W - 1, H - 1),
      maxW: W,
      maxH: H,
      board: this.board
    }, this.ctx)) {

      let op: Point[] = [];
      this.aStar.openList.forEach(n => {
        op.push(n.pos);
      });

      let cl: Point[] = [];
      this.aStar.closedList.forEach(n => {
        cl.push(n.pos);
      });

      this.drawPoints(op, "green");
      this.drawPoints(cl, "red");
      this.drawPoints(this.aStar.makePath(), "blue");

    }

  }

  drawPoints(arr: Point[], clr: string) {
    this.ctx.fillStyle = clr;
    this.ctx.beginPath();

    arr.forEach(pt => {
      const a = pt.x * S, b = pt.y * S;
      this.ctx.fillRect(a, b, S, S);
      this.ctx.rect(a, b, S, S);
    });

    this.ctx.stroke();
  }

  drawBoard(): void {
    this.ctx.beginPath();
    this.board.forEach(x => {
      x.forEach(y => {

        const a = S * y.pos.x, b = S * y.pos.y;

        if (y.type === 1) {
          this.ctx.fillRect(a, b, S, S);
        }

        this.ctx.rect(a, b, S, S);

      });
    });

    this.ctx.stroke();
  }
}

const a = new AStarTest();