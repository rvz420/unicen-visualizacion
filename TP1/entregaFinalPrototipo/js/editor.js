var ctx = document.getElementById("editorCanvas").getContext("2d");

var image1 = new Image();
image1.crossOrigin = '';
image1.src = "https://i.imgur.com/SIJSp7Ur.jpg";

image1.onload = function() {
  ctx.drawImage(this, 0, 0);

  imageData = ctx.getImageData(0, 0, this.width, this.height);

  //negativo, grayscale, binarizacion, brillo, saturacion, suavizado, deteccion de bordes, blur

  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.height; y++) {

      r = getRed(imageData, x, y);
      g = getGreen(imageData, x, y);
      b = getBlue(imageData, x, y);

      sepiaR = Math.floor(0.393 * r + 0.769 * g + 0.189 * b);
      sepiaG = Math.floor(0.349 * r + 0.686 * g + 0.168 * b);
      sepiaB = Math.floor(0.272 * r + 0.534 * g + 0.131 * b);

      gris = (r + g + b) / 3;
      //negativo 255 - (r,g,b)

      if (gris < 128) {
        setPixel(imageData, x, y, 0, 0, 0, 255);
      } else {
        setPixel(imageData, x, y, 255, 255, 255, 255);
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a) {
  index = (x + y * imageData.width) * 4;
  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}

function getRed(imageData, x, y) {
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 1];
}

function getBlue(imageData, x, y) {
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 2];
}
