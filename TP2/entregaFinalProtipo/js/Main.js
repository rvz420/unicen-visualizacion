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
  const hanoi = new Hanoi(canvas, images);
  hanoi.draw();
  canvas.addEventListener('mousedown', function(e) {
    hanoi.onMouseDown(e)
  });
}
