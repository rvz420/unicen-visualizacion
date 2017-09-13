class Totem extends Rectangle {

  constructor(x, y, ctx, imgTotem, imgFoundation) {
    super(x, y, imgFoundation.width, img.height, ctx);
    this.imgTotem = imgTotem;
    this.imgFoundation = imgFoundation;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
  }

}
