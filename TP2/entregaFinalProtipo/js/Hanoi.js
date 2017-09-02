class Hanoi {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isDragging = false;
    this.dragPiece; //current draging piece
    this.pieces = [
      new Rectangle(100, 50, 50, 50, "#CF4848", this.ctx),
      new Rectangle(120, 50, 50, 100, "#48CF64", this.ctx),
      new Rectangle(140, 50, 0, 150, "#4D0202", this.ctx),
      new Rectangle(160, 50, 0, 200, "#F0A9A9", this.ctx)
    ];
    this.offSet = {};
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    this.clear();
    for (let i = 0; i < this.pieces.length; i++) {
      let piece = this.pieces[i];
      if (this.isDragging && piece === this.dragPiece) {
        this.ctx.shadowColor = "black";
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
        this.ctx.shadowBlur = 8;
      }
      this.ctx.fillStyle = piece.color;
      this.ctx.fillRect(piece.x, piece.y, piece.w, piece.h)
      this.ctx.shadowColor = null;
      this.ctx.shadowOffsetX = null;
      this.ctx.shadowOffsetY = null;
      this.ctx.shadowBlur = null;
    }
  }

  onMouseDown(e) {
    for (var i = 0; i < this.pieces.length; i++) {
      let piece = this.pieces[i];
      if (piece.isClicked(e)) {
        this.isDragging = true;
        this.dragPiece = piece;
        this.canvas.addEventListener("mousemove", this.onMouseMove);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
        this.offSet.x = e.clientX - piece.x;
        this.offSet.y = e.clientY - piece.y;
        this.draw();
      }
    }
  }

  onMouseMove(e) {

    this.dragPiece.x = e.clientX - this.offSet.x;
    this.dragPiece.y = e.clientY - this.offSet.y;
    this.draw();
  }

  onMouseUp(e) {
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    this.isDragging = false;
    this.draw();
  }

  drawBoard() {

      this.ctx.fillStyle = '#614126';
      this.ctx.strokeStyle = '#614126';

      var postWidth = this.canvas.width / 3;
      var postGap = postWidth * .1;
      var postWidth = postWidth - postGap * 1.5;

      var tokenHeight = this.canvas.height / 8;
      var postBottom = this.canvas.height - tokenHeight;

      for (var i = 0; i < 3; i ++) {
          var postLeft = (postGap * (i + 1)) + (postWidth * i);

          this.ctx.beginPath();
          this.ctx.rect(postLeft, postBottom, postWidth, tokenHeight);
          this.ctx.fill();

          this.ctx.beginPath();
          this.ctx.lineWidth = 10;
          this.ctx.moveTo(postLeft + postWidth / 2, tokenHeight);
          this.ctx.lineTo(postLeft + postWidth / 2, this.canvas.height);
          this.ctx.stroke();
      }

  }

}

const canvas = document.getElementById("canvas");
const hanoi = new Hanoi(canvas);
hanoi.drawBoard();
canvas.addEventListener('mousedown', function(e) {
  hanoi.onMouseDown(e)
});
//  if (r1.isClicked(e)){canvas.addEventListener('mousemove', function(e){r1.onMouseMove(e)} )}
//});
