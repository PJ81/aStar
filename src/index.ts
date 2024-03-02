import AStar from "./astar.js";
import Cell from "./cell.js";
import Point from "./point.js";

const W = 50, H = 50, S = 12;

class AStarTest {

  board: Cell[][];
  aStar: AStar;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.aStar = new AStar();

    this.canvas = document.createElement("canvas");
    this.canvas.width = S * W;
    this.canvas.height = S * H;
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    const start = new Point(), end = new Point(W - 1, H - 1);

    while (true) {
      this.createBoard();
      if (this.board[start.x][start.y].type !== 1 && this.board[end.x][end.y].type !== 1) break;
    }

    this.drawBoard();

    if (this.aStar.find({
      start,
      end,
      maxW: W,
      maxH: H,
      board: this.board
    })) {

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
    } else {
      this.ctx.font = "25px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "#ddd";
      this.ctx.shadowColor = "black";
      this.ctx.shadowOffsetX = this.ctx.shadowOffsetY = 3;
      this.ctx.fillText("No path found!", this.canvas.width >> 1, this.canvas.height >> 1);
      this.ctx.shadowColor = "transparent";
    }
  }

  createBoard(): void {
    this.board = new Array(W);
    for (let x = 0; x < W; x++) {
      this.board[x] = new Array(H);
      for (let y = 0; y < H; y++) {
        this.board[x][y] = new Cell(new Point(x, y), Math.random() < .3 ? 1 : 0);
      }
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