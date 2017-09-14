class Totem {

  constructor(x, y, imgTotem, imgFoundation) {
    this.x = x;
    this.y = y;
    this.imgTotem = imgTotem;
    this.imgFoundation = imgFoundation;
    this.pieces = [];
  }

  draw(ctx) {
    ctx.drawImage(this.imgFoundation, this.x, this.y + this.imgTotem.height);
    ctx.drawImage(this.imgTotem, this.x + (this.imgTotem.width / 2) - 5, this.y);

    let y = this.y + this.imgTotem.height;
    for (let i = 0; i < this.pieces.length; i++) {
      y = y - this.pieces[i].getHeight();
      this.pieces[i].draw(ctx, this.x - 7, y);
    }
  }

  takePiece() {
    return this.pieces.pop();
  }

  addPiece(piece) {
    this.pieces.push(piece);
  }

  getNumPieces() {
    return this.pieces.length;
  }

  isClicked(x, y) {
    if (((x < this.x + this.imgFoundation.width) && (x > this.x)) && //dentro del ancho del rectangulo
      ((y < this.y + this.imgTotem.height) && (y > this.y))) { //dentro del largo del rectangulo
      return true;
    } else {
      return false;
    }
  }

  validPiece(piece) {
    if (this.pieces.length > 0) {
      if (this.pieces[this.pieces.length - 1].valor > piece.valor)
        return true;
      else
        return false;
    } else {
      return true;
    }
  }

  isEmpty() {
    return (this.pieces.length == 0);
  }

}
