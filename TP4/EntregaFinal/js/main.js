let gravity = new Vec2(0, 0.2),
    coyote = new Coyote(),
    cactus = new Cactus();

function update() {
    coyote.applyForce(gravity);
    coyote.edges();
    coyote.update();
    cactus.update();
    if (coyote.intersects(cactus)){
       alert("COLISIONAKSDJAOPSD");
    }
   
}

function draw() {
    switch (coyote.state) {
        case State.RUNNING:
            coyote.draw('coyote_run');
            break;

        case State.JUMPING:
            coyote.draw('coyote_jump');
            break;

        default:
            coyote.draw('coyote_run');
            break;
    }
    cactus.draw();
}

function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
}

document.addEventListener('keydown', event => {
    if ( ((event.keyCode === 38) || (event.keyCode === 32)) && (coyote.isGrounded)) { // 38: up arrow. 32: spacebar 
        coyote.isGrounded = false;
        coyote.applyForce(new Vec2(0, -8.5)); //jump force
        coyote.state = State.JUMPING;
    } else if (event.keyCode === 40) { // 40: down arrow
        coyote.applyForce(new Vec2(0, 16));
    }
});


requestAnimationFrame(mainLoop);