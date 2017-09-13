class Totem{

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

    let y = this.y - this.imgFoundation.height - 2;
    for (let i = 0; i < this.pieces.length; i++) {
      y += this.pieces[i].getHeight();
      this.pieces[i].draw(ctx, this.x - 7, y);
    }
  }

  takePiece(){
    return this.pieces.pop();
  }

  addPiece(piece){
    return this.pieces.push(piece);
  }

  isEmpty(){
    return(this.pieces.length == 0);
  }

}
