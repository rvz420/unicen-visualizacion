class Totem extends Rectangle {

  constructor(x, y, ctx, imgTotem, imgFoundation) {
    super(x, y, imgFoundation.width, imgTotem.height, ctx);
    this.x = x;
    this.y = y;
    this.imgTotem = imgTotem;
    this.imgFoundation = imgFoundation;
  }

  draw() {
    this.ctx.drawImage(this.imgTotem, this.x + (this.imgTotem.width/2) - 5, this.y);
    this.ctx.drawImage(this.imgFoundation, this.x, this.y + this.imgTotem.height);
  }

}
