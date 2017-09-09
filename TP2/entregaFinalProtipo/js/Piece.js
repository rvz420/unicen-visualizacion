class Piece extends Rectangle {

  constructor(x, y, ctx, img) {
    super(x, y, img.width, img.height, ctx);
    this.img = img;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
  }

}
