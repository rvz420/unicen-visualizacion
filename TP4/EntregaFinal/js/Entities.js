function createCoyote(){
    const coyote = new Entity;
    coyote.pos.set(0,222);
    coyote.vel.set(0,0);

    coyote.draw = function(anim) {
        let div = document.getElementById('player');
        div.className = anim;
        div.style.left = coyote.pos.x.toString() + 'px';
        div.style.top = coyote.pos.y.toString() + 'px';  
    }

    return coyote;
}