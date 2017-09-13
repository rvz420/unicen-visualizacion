class Hanoi {

  constructor(canvas, images) {
    this.canvas = canvas;
    this.images = images;
    this.ctx = canvas.getContext('2d');
    this.isDragging = false;
    this.dragPiece; //current draging piece
    this.pieces = [
      new Piece(100, 50, this.ctx, this.images.piece1),
      new Piece(120, 50, this.ctx, this.images.piece2),
      new Piece(140, 50, this.ctx, this.images.piece3),
      new Piece(160, 50, this.ctx, this.images.piece4)
    ];
    this.totems = [
      new Totem(113 - this.images.totems_foundation.width/2, this.images.totem_easy.height, this.ctx, this.images.totem_easy,this.images.totems_foundation),
      new Totem(326 - this.images.totems_foundation.width/2, this.images.totem_easy.height, this.ctx, this.images.totem_easy,this.images.totems_foundation),
      new Totem(539 - this.images.totems_foundation.width/2, this.images.totem_easy.height, this.ctx, this.images.totem_easy,this.images.totems_foundation),
    ]
    this.offSet = {};
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    this.clear();
    this.totems[0].draw();
    this.totems[1].draw();
    this.totems[2].draw();
    for (let i = 0; i < this.pieces.length; i++) {
      let piece = this.pieces[i];
      if (this.isDragging && piece === this.dragPiece) {
        this.ctx.shadowColor = "black";
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
        this.ctx.shadowBlur = 8;
      }
      piece.draw();
      this.ctx.shadowColor = null;
      this.ctx.shadowOffsetX = null;
      this.ctx.shadowOffsetY = null;
      this.ctx.shadowBlur = null;
    }
  }

  onMouseDown(e) {
    for (let i = 0; i < this.pieces.length; i++) {
      let piece = this.pieces[i];
      if (piece.isClicked(e)) {
        this.isDragging = true;
        this.dragPiece = piece;
        this.canvas.addEventListener("mousemove", this.onMouseMove);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
        this.offSet.x = e.layerX - piece.x;
        this.offSet.y = e.layerY - piece.y;
        this.draw();
      }
    }
  }

  onMouseMove(e) {
    this.dragPiece.x = e.layerX - this.offSet.x;
    this.dragPiece.y = e.layerY - this.offSet.y;
    this.draw();
  }

  onMouseUp(e) {
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    this.isDragging = false;
    for (let i = 0; i < this.pieces.length; i++) {
      let piece = this.pieces[i];
      // if (piece.intersects(totem)) {
      //
      // }
      this.draw();
    }
  }

  drawBoard() {

    this.ctx.fillStyle = '#614126';
    this.ctx.strokeStyle = '#614126';

    let postWidth = this.canvas.width / 3;
    let postGap = postWidth * .1;
    postWidth = postWidth - postGap * 1.5;

    let tokenHeight = this.canvas.height / 8;
    let postBottom = this.canvas.height - tokenHeight;

    for (let i = 0; i < 3; i++) {
      let postLeft = (postGap * (i + 1)) + (postWidth * i);

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
