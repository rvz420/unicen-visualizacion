let obstacle = document.getElementById('obstacles'),
    obstaclePos = 700,
    obstacleVelocity = 2,
    coyote = createCoyote();
    vel = new Vec2 (1,0);

function update() {
    obstaclePos -= obstacleVelocity;
    coyote.pos.add(vel);
}

function draw() {
    coyote.draw('coyote_run');
    obstacle.style.left = obstaclePos + 'px';
}

function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);