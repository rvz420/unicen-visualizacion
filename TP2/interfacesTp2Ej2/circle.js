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


var circulo = new Circle(300,300,40,"#9b59b6");



