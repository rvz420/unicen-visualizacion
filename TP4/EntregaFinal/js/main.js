let lastFrameTimeMs = 0, // The last time the loop was run
    maxFPS = 60; // The maximum FPS we want to allow
    delta = 0,
    timestep = 1000 / 60,
    gravity = new Vec2(0, 0.2),
    coyote = new Coyote(),
    cactus = new Cactus();
    
    
function update(delta) {
    coyote.applyForce(gravity);
    coyote.edges();
    coyote.update(delta);
    if (cactus.pos.x < -200) {
        cactus.pos.x = 700;
    }
    if (cactus.vel.x < -20) {
        cactus.vel.x = -20;
    }
    cactus.update(delta);
    if (coyote.intersects(cactus)) {
        document.getElementById('perdiste').innerHTML = '<h1>PERDISTE BENJA :v</h1>';
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

function mainLoop(timestamp) {
    // Throttle the frame rate.    
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp; 
    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
    }
    draw();
    requestAnimationFrame(mainLoop);
}

document.addEventListener('keydown', event => {
    if (((event.keyCode === 38) || (event.keyCode === 32)) && (coyote.isGrounded)) { // 38: up arrow. 32: spacebar
        event.preventDefault(); 
        coyote.isGrounded = false;
        coyote.applyForce(new Vec2(0, -8.5)); //jump force
        coyote.state = State.JUMPING;
    } else if (event.keyCode === 40) { // 40: down arrow
        coyote.applyForce(new Vec2(0, 16));
    }
}, false);

requestAnimationFrame(mainLoop);