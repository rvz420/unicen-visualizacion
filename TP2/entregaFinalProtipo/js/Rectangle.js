class Rectangle {

  constructor(w, h, x, y, color, ctx) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  isClicked(e) {
    var mX = e.clientX; //mouseX
    var mY = e.clientY; //mouseY

    if (((mX < this.x + this.w) && (mX > this.x)) && //dentro del ancho del rectangulo
      ((mY < this.y + this.h) && (mY > this.y))) { //dentro del largo del rectangulo
      return true;
    }
  }

}
