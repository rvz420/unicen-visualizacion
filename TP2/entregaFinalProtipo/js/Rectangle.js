class Rectangle {

  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "#bf0e0e";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  isClicked(e) {
    let mX = e.layerX; //mouseX
    let mY = e.layerY; //mouseY

    if (((mX < this.x + this.w) && (mX > this.x)) && //dentro del ancho del rectangulo
      ((mY < this.y + this.h) && (mY > this.y))) { //dentro del largo del rectangulo
      return true;
    }
  }

  intersects(other) {
    let left = this.x;
    let right = this.x + this.w;
    let top = this.y;
    let bottom = this.y + this.h;
    let oLeft = other.x;
    let oRight = other.x + other.w;
    let oTop = other.y;
    let oBottom = other.y + other.h;

    return !(left > oRight || right > oLeft || top > oBottom || bottom < oTop);
  }

}
