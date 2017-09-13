class Piece {

  constructor(img, valor) {
    this.img = img;
    this.valor = valor;
  }

  getHeight(){
    return this.img.height;
  }

  draw(ctx, x, y) {
    ctx.drawImage(this.img, x, y);
  }

}
