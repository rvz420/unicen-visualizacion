function Circle(paramPosX, paramPosY, paramRadio, paramColor){
	this.canvas = document.getElementById("canvas");
	this.ctx = canvas.getContext("2d");
	this.posX = paramPosX;
	this.posY = paramPosY;
	this.radio = paramRadio;
	this.color = paramColor;
}



Circle.prototype.draw = function(){
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
	this.ctx.fill();
	this.ctx.closePath();
}

var drawRandom = function(cantidad){
	for (var i = 0; i < cantidad; i++) {
		var randomX = Math.floor((Math.random() * this.canvas.width) + 1);
		var randomY = Math.floor((Math.random() * this.canvas.height) + 1);	
		var cir = new Circle(randomX,randomY,40, getRandomColor());
		cir.draw();

	}
}


var getRandomColor = function () {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function dibujarOnclick(e){

	var posX = e.clientX;
	var posY = e.clientY;

	var circulo = new Circle(posX,posY,100,"#ffffff");

          var img = new Image();
          img.src = "/img.png";

          img.onload = function(){
            var image = ctx.drawImage(img,posX-100,posY-100);

            ctx.fillStyle = image;
            ctx.beginPath();
          //ctx.arc(circulo.posX,circulo.posY,circulo.radio,0,Math.PI * 2);
            ctx.fill();
            ctx.closePath();	
        }

}

var circulo = new Circle(300,300,40,"#9b59b6");

canvas = document.getElementById("canvas"); 

canvas.onclick = r1.dibujarOnclick();