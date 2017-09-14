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

  isClicked(e) {
    let mX = e.layerX; //mouseX
    let mY = e.layerY; //mouseY
    let w = this.img.weight;
    let h = this.img.height;
    if (((mX < this.x + w) && (mX > this.x)) && //dentro del ancho del rectangulo
      ((mY < this.y + h) && (mY > this.y))) { //dentro del largo del rectangulo
      return true;
    }
  }

}
