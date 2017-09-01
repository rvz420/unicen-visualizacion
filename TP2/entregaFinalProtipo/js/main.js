var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Rectangle{

	constructor(w, h, x, y, color, ctx){
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		this.color = color;
		this.ctx = ctx;
	}

	draw(){
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	isClicked(e){
		var mX = e.clientX; //mouseX
		var mY = e.clientY; //mouseY

		if( ((mX < this.x+this.w) && (mX > this.x)) && //dentro del ancho del rectangulo
		 	((mY < this.y+this.h) && (mY > this.y)) ){ //dentro del largo del rectangulo
			console.log("haha");
		}
	}
}

r1 = new Rectangle(100,100,50,50, "#CF4848",ctx);
r2 = new Rectangle(20,30,0,0, "#48CF64",ctx);
r3 = new Rectangle(20,30,0,0, "#4D0202",ctx);
r4 = new Rectangle(20,30,0,0, "#F0A9A9",ctx);

r1.draw();

canvas.addEventListener('click', function(e) {r1.isClicked(e)});