//IMAGEN POR DEFECTO
var image1 = new Image();
image1.crossOrigin = '';
image1.src = "https://i.imgur.com/SIJSp7Ur.jpg";


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

        gris = (r+g+b)/3;
        
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
        
        setPixel(imageData, x, y, 255-r, 255-g, 255-b, 255);
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

  var binarizacion = function(){
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

  var blur = function(){
    convolver( [[ 1,  2,  1],[ 2,  4,  2],[ 1,  2,  1]]); 
  }

  var bordes = function(){
    convolver([[ 1,  1,  1],[ 1, -7,  1],[ 1,  1,  1]])
  }

  var brillo = function(){
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
    console.log(r,g,b,rBrillo,gBrillo,bBrillo);
    ctx.putImageData(imageData, 0, 0);

  }

  var restore = function(){
    ctx.putImageData(backIdata,0,0);
  }

  var convolver = function(matrix, offset){
    var m = [].concat(matrix[0], matrix[1], matrix[2]); // flatten
    var divisor = m.reduce(function(a, b) {return a + b;}) || 1; // sum
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
        oldpx[i - w * 4]     || oldpx[i],
        oldpx[i - w * 4 + 4] || oldpx[i],
        oldpx[i - 4]         || oldpx[i],
        oldpx[i],
        oldpx[i + 4]         || oldpx[i],
        oldpx[i + w * 4 - 4] || oldpx[i],
        oldpx[i + w * 4]     || oldpx[i],
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

  var brilloSlid = document.getElementById('brilloSlider');
  brilloSlid.addEventListener("change", brillo);

}


//Metodos auxiliares

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

function truncar(valor){
  if (valor < 0 ){
    valor = 0;
  }else if (valor > 255){
    valor = 255;
  }
  return valor;
}

