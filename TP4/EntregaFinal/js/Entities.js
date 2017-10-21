function createCoyote(){
    const coyote = new Entity;
    coyote.pos.set(0,222);
    coyote.vel.set(0,0);
    coyote.acc.set(0,0);

    coyote.draw = function (anim) {
        let div = document.getElementById('player');
        div.className = anim;
        div.style.left = coyote.pos.x.toString() + 'px';
        div.style.top = coyote.pos.y.toString() + 'px';  
    }

    coyote.applyForce = function (force) {
        coyote.acc.add(force);
    }

    coyote.update = function() {
        coyote.vel.add(coyote.acc);
        coyote.pos.add(coyote.vel);
        coyote.acc.set(0,0);
    }

    coyote.edges = function() {
        if (coyote.pos.y >= 222) {
            coyote.vel.y *= 0;
            coyote.pos.y = 222;
        }
    }

    return coyote;
}