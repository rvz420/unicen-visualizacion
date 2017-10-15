window.onload = function() {
  let sources = {
    piece1: "images/piece1.svg",
    piece2: "images/piece2.svg",
    piece3: "images/piece3.svg",
    piece4: "images/piece4.svg",
    piece5: "images/piece5.svg",
    piece6: "images/piece6.svg",
    totems_foundation: "images/totems_foundation.svg",
    totem_easy: "images/totem_easy_nf.svg",
    totem_hard: "images/totem_hard_nf.svg",
    background: "images/background.jpg"
  };
  loadImages(sources, initGame); // calls initGame after all images have finished loading
};

loadImages = function(sources, callback) {
  let images = {};
  let loadedImages = 0;
  let numImages = 0;
  for (let src in sources) {
    numImages++;
  }
  for (let src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

initGame = function(images) {
  const canvas = document.getElementById("canvas");

  let  btnEasy = document.getElementById('btnEasy');
  btnEasy.addEventListener('click', function(){
    jugar(new Hanoi(canvas, images, 2));
    document.getElementById("txtUwin").innerHTML = "";
  });

  let  btnMid = document.getElementById('btnMid');
  btnMid.addEventListener('click', function(){
    jugar(new Hanoi(canvas, images, 1));
    document.getElementById("txtUwin").innerHTML = "";
  });

  let  btnHard = document.getElementById('btnHard');
  btnHard.addEventListener('click', function(){
    jugar(new Hanoi(canvas, images, 0));
    document.getElementById("txtUwin").innerHTML = "";
  });

  jugar = function(hanoi){
    let ctx = canvas.getContext("2d");
    let dragPiece;
    let fromTotem;
    let toTotem;

    hanoi.draw();

    canvas.onmousedown = function(e) {
      fromTotem = hanoi.getTotem(e.layerX, e.layerY);
      if ((fromTotem != null) && (fromTotem.getNumPieces())) {
        dragPiece = fromTotem.takePiece();
      } else {
        fromTotem = null;
      }
    }

    canvas.onmousemove = function(e) {
      if ((dragPiece != null) && (fromTotem != null)) {
        hanoi.draw(ctx);
        dragPiece.draw(ctx, e.layerX, e.layerY);
      }
    }

    canvas.onmouseup = function(e) {
      toTotem = hanoi.getTotem(e.layerX, e.layerY);
      if (toTotem != null && fromTotem != null) {
        if (toTotem.validPiece(dragPiece)) {
          toTotem.addPiece(dragPiece);
          if (fromTotem != toTotem) {
            hanoi.setMoves(hanoi.getNumMoves() + 1);
          }
          if (hanoi.win()) {
            document.getElementById("txtUwin").innerHTML = "Ganaste! haz hecho "+ hanoi.getNumMoves() +" movimientos" ;
          }
        } else {
          fromTotem.addPiece(dragPiece);
        }
      } else {
        fromTotem.addPiece(dragPiece);
      }
      toTotem = null;
      fromTotem = null;
      dragPiece = null;
      hanoi.draw(ctx);
    }


  }


}
