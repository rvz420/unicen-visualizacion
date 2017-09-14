class Hanoi {

  constructor(canvas, images, difficulty) {
    this.canvas = canvas;
    this.images = images;
    this.ctx = canvas.getContext('2d');
    this.difficulty = difficulty;
    this.moves = 0;
    this.pieces = [
      new Piece(this.images.piece6, 6),
      new Piece(this.images.piece5, 5),
      new Piece(this.images.piece4, 4),
      new Piece(this.images.piece3, 3),
      new Piece(this.images.piece2, 2),
      new Piece(this.images.piece1, 1)
    ];
    this.totemLeft = new Totem(113 - this.images.totems_foundation.width / 2, canvas.height-this.images.totem_hard.height -  this.images.totems_foundation.height, this.images.totem_hard, this.images.totems_foundation);
    this.totemMid = new Totem(326 - this.images.totems_foundation.width / 2, canvas.height-this.images.totem_hard.height -  this.images.totems_foundation.height, this.images.totem_hard, this.images.totems_foundation);
    this.totemRight = new Totem(539 - this.images.totems_foundation.width / 2, canvas.height-this.images.totem_hard.height -  this.images.totems_foundation.height, this.images.totem_hard, this.images.totems_foundation);

    for (var i = this.difficulty; i < this.pieces.length; i++) {
      this.totemLeft.addPiece(this.pieces[i]);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    this.clear();
    this.totemLeft.draw(this.ctx);
    this.totemMid.draw(this.ctx);
    this.totemRight.draw(this.ctx);
  }

  getTotem(x, y) {
    if (this.totemLeft.isClicked(x, y)) {
      return this.totemLeft;
    } else if (this.totemMid.isClicked(x, y)) {
      return this.totemMid;
    } else if (this.totemRight.isClicked(x, y)) {
      return this.totemRight;
    }
  }

  setMoves(moves){
    this.moves = moves;
  }

  getNumMoves(){
    return this.moves;
  }

  win() {
    if (this.difficulty == this.pieces.length-this.totemRight.getNumPieces())
      return true;
    else
      return false;
  }
}
