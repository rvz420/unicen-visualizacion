class Coyote {

    constructor(){
        this.coyote = new Entity();
        this.coyote.pos.set(0,222);
        this.coyote.vel.set(0,0);
        this.coyote.acc.set(0,0);
        this.isGrounded = true;
        this.state = States.RUNNING;
    }

    draw (anim) {
        let div = document.getElementById('player');
        div.className = anim;
        div.style.left = this.coyote.pos.x.toString() + 'px';
        div.style.top = this.coyote.pos.y.toString() + 'px';  
    }

    update () {
        this.coyote.vel.add(this.coyote.acc);
        this.coyote.pos.add(this.coyote.vel);
        this.coyote.acc.set(0,0);
        if (this.coyote.pos.y >= 222) {
            this.isGrounded = true;
            coyote.state = States.RUNNING;
        }
    }

    applyForce (force) {
        this.coyote.acc.add(force);
    }

    intersects(other) {
        let div = document.getElementById("player");
        let left = this.coyote.pos.x;
        let right = this.coyote.pos.x + div.offsetWidth;
        let top = this.coyote.pos.y;
        let bottom = this.coyote.pos.y + div.offsetHeight;
        let oLeft = other.left;
        let oRight = other.right;
        let oTop = other.top;
        let oBottom = other.bottom;
        return !(left > oRight || right < oLeft || top > oBottom || bottom < oTop);
    }

    edges () {
        if (this.coyote.pos.y >= 222) {
            this.coyote.vel.y *= 0;
            this.coyote.pos.y = 222;
        }
    }
}