//IMAGEN POR DEFECTO
var image1 = new Image();
image1.crossOrigin = '';
image1.src = "images/original.jpg";


image1.onload = function() {
  draw(this);
};

//CARGAR IMAGEN

$(function() {
  $('#file-input').change(function(e) {
    var file = e.target.files[0],
      imageType = /image.*/;

    if (!file.type.match(imageType))
      return;

    var reader = new FileReader();
    reader.onload = fileOnload;
    reader.readAsDataURL(file);

  });

  function fileOnload(e) {
    var img = new Image();
    img.src = e.target.result;

    img.onload = function() {
      draw(img);
    };
  }
});

//DIBUJAR IMAGEN EN CANVAS Y METODOS DE FILTRO

function draw(img) {
  var editorCanvas = document.getElementById('editorCanvas');
  var ctx = document.getElementById("editorCanvas").getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, editorCanvas.width, editorCanvas.height);
  //fitImageOn(editorCanvas, img, ctx);
  img.style.display = 'none';
  var imageData = ctx.getImageData(0, 0, editorCanvas.width, editorCanvas.height);
  var data = imageData.data;

  var backCanvas = document.getElementById('backCanvas');
  var ctxBack = document.getElementById('backCanvas').getContext("2d");
  ctxBack.putImageData(imageData, 0, 0);
  backIdata = ctxBack.getImageData(0, 0, backCanvas.width, backCanvas.height);
  backData = backIdata.data;

  //negativo, grayscale, binarizacion, brillo, saturacion, suavizado, deteccion de bordes, blur
  //Filtros

  var grayscale = function() {
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {

        r = getRed(backIdata, x, y);
        g = getGreen(backIdata, x, y);
        b = getBlue(backIdata, x, y);

        gris = (r + g + b) / 3;

        setPixel(imageData, x, y, gris, gris, gris, 255);
      };
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var invert = function() {
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {

        r = getRed(backIdata, x, y);
        g = getGreen(backIdata, x, y);
        b = getBlue(backIdata, x, y);

        setPixel(imageData, x, y, 255 - r, 255 - g, 255 - b, 255);
      };
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var sepia = function() {

    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {

        r = getRed(backIdata, x, y);
        g = getGreen(backIdata, x, y);
        b = getBlue(backIdata, x, y);

        sepiaR = Math.floor(0.393 * r + 0.769 * g + 0.189 * b);
        sepiaG = Math.floor(0.349 * r + 0.686 * g + 0.168 * b);
        sepiaB = Math.floor(0.272 * r + 0.534 * g + 0.131 * b);

        setPixel(imageData, x, y, sepiaR, sepiaG, sepiaB, 255);
      };
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var binarizacion = function() {
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {

        r = getRed(backIdata, x, y);
        g = getGreen(backIdata, x, y);
        b = getBlue(backIdata, x, y);

        gris = (r + g + b) / 3;

        if (gris < 128) {
          setPixel(imageData, x, y, 0, 0, 0, 255);
        } else {
          setPixel(imageData, x, y, 255, 255, 255, 255);
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var blur = function() {
    convolver([
      [1 / 36, 1 / 36, 1 / 36],
      [1 / 36, 1 / 36, 1 / 36],
      [1 / 36, 1 / 36, 1 / 36]
    ]);
  }

  var bordes = function() {
    convolver([
      [1, 1, 1],
      [1, -7, 1],
      [1, 1, 1]
    ])
  }

  var sharpen = function() {
    convolver([
      [0, -2, 0],
      [-2, 11, -2],
      [0, -2, 0]
    ])
  }

  var brillo = function() {
    valorBrillo = parseInt(document.getElementById('brilloSlider').value);
    console.log(valorBrillo);
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {

        r = getRed(backIdata, x, y);
        g = getGreen(backIdata, x, y);
        b = getBlue(backIdata, x, y);

        rBrillo = truncar(r + valorBrillo);
        gBrillo = truncar(g + valorBrillo);
        bBrillo = truncar(b + valorBrillo);


        setPixel(imageData, x, y, rBrillo, gBrillo, bBrillo, 255);
      };
    }
    console.log(r, g, b, rBrillo, gBrillo, bBrillo);
    ctx.putImageData(imageData, 0, 0);

  }

  var restore = function() {
    ctx.putImageData(backIdata, 0, 0);
  }

  var convolver = function(matrix, offset) {
    var m = [].concat(matrix[0], matrix[1], matrix[2]); // flatten
    var divisor = m.reduce(function(a, b) {
      return a + b;
    }) || 1; // sum
    var oldpx = backData;
    var newdata = ctxBack.createImageData(backIdata);
    var newpx = newdata.data;
    var len = newpx.length;
    var res = 0;
    var w = backIdata.width;
    for (var i = 0; i < len; i++) {
      if ((i + 1) % 4 === 0) {
        newpx[i] = oldpx[i];
        continue;
      }
      res = 0;
      var these = [
        oldpx[i - w * 4 - 4] || oldpx[i],
        oldpx[i - w * 4] || oldpx[i],
        oldpx[i - w * 4 + 4] || oldpx[i],
        oldpx[i - 4] || oldpx[i],
        oldpx[i],
        oldpx[i + 4] || oldpx[i],
        oldpx[i + w * 4 - 4] || oldpx[i],
        oldpx[i + w * 4] || oldpx[i],
        oldpx[i + w * 4 + 4] || oldpx[i]
      ];
      for (var j = 0; j < 9; j++) {
        res += these[j] * m[j];
      }
      res /= divisor;
      if (offset) {
        res += offset;
      }
      newpx[i] = res;
    }
    ctx.putImageData(newdata, 0, 0);
  }


  var saturar = function() {
    valorSat = parseInt(document.getElementById('saturacionSlider').value);
    for (var y = 0; y < imageData.height; y++) {
      for (var x = 0; x < imageData.width; x++) {
        var r = getRed(backIdata, x, y);
        var g = getGreen(backIdata, x, y);
        var b = getBlue(backIdata, x, y);
        var hsl = rgbToHsl(r, g, b);
        hsl[1] = valorSat;
        var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], 255);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var descargarImagen = function() {
    var dataURL = editorCanvas.toDataURL("image/png");
    var descargarBtn = document.getElementById("descargarBtn");
    descargarBtn.href = dataURL;
  }

  //Conexion botones
  var originalbtn = document.getElementById('originalBtn');
  originalbtn.addEventListener('click', restore);

  var grayscalebtn = document.getElementById('grayscaleBtn');
  grayscalebtn.addEventListener('click', grayscale);

  var invertbtn = document.getElementById('invertBtn');
  invertbtn.addEventListener('click', invert);

  var sepiabtn = document.getElementById('sepiaBtn');
  sepiabtn.addEventListener('click', sepia);

  var binarybtn = document.getElementById('binaryBtn');
  binarybtn.addEventListener('click', binarizacion);

  var blurbtn = document.getElementById('blurBtn');
  blurbtn.addEventListener('click', blur);

  var bordesbtn = document.getElementById('bordesBtn');
  bordesbtn.addEventListener('click', bordes);

  var sharpenbtn = document.getElementById('sharpenBtn');
  sharpenbtn.addEventListener('click', sharpen);

  var brilloSlid = document.getElementById('brilloSlider');
  brilloSlid.addEventListener("change", brillo);

  var saturarSlid = document.getElementById('saturacionSlider');
  saturarSlid.addEventListener("change", saturar);

  var descargarBtn = document.getElementById('descargarBtn');
  descargarBtn.addEventListener('click', descargarImagen);

}

//Metodos auxiliares

var fitImageOn = function(canvas, imageObj, ctx) {

  var imageAspectRatio = imageObj.width / imageObj.height;
  var canvasAspectRatio = canvas.width / canvas.height;
  var renderableHeight, renderableWidth, xStart, yStart;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (imageAspectRatio < canvasAspectRatio) {
    renderableHeight = canvas.height;
    renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
    xStart = (canvas.width - renderableWidth) / 2;
    yStart = 0;
  } else if (imageAspectRatio > canvasAspectRatio) {
    renderableWidth = canvas.width
    renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
    xStart = 0;
    yStart = (canvas.height - renderableHeight) / 2;
  } else {
    renderableHeight = canvas.height;
    renderableWidth = canvas.width;
    xStart = 0;
    yStart = 0;
  }
  ctx.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
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

function truncar(valor) {
  if (valor < 0) {
    valor = 0;
  } else if (valor > 255) {
    valor = 255;
  }
  return valor;
}
