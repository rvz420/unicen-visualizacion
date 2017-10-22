class Coyote extends Entity{

    constructor(){
        super();
        this.pos.set(0,222);
        this.vel.set(0,0);
        this.acc.set(0,0);
        this.width = 30;
        this.height = 80;
        this.isGrounded = true;
        this.state = State.RUNNING;
    }

    draw (anim) {
        let div = document.getElementById('player');
        div.className = anim;
        div.style.left = this.pos.x.toString() + 'px';
        div.style.top = this.pos.y.toString() + 'px';  
    }

    update () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0,0);
        if (this.pos.y >= 222) {
            this.isGrounded = true;
            coyote.state = State.RUNNING;
        }
    }

    applyForce (force) {
        this.acc.add(force);
    }

    intersects(other) {
        let div = document.getElementById("player");
        let left = this.pos.x;
        let right = this.width;
        let top = this.pos.y;
        let bottom = this.pos.y + this.height;
        let oLeft = other.left;
        let oRight = other.right;
        let oTop = other.top;
        let oBottom = other.bottom;
        return !(left > oRight || right < oLeft || top > oBottom || bottom < oTop);
    }

    edges () {
        if (this.pos.y >= 222) {
            this.vel.y *= 0;
            this. pos.y = 222;
        }
    }
}