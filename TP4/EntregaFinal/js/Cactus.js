class Cactus extends Entity{
    constructor() {
        super();
        this.pos.set(700,250);
        this.vel.set(0,0);
        this.acc.set(0,0);
        this.div = document.getElementById('obstacles');
        this.left = this.pos.x;
        this.right = this.pos.x + this.div.offsetWidth;
        this.top = this.pos.y;
        this.bottom = this.pos.y + this.div.offsetHeight;
    }

    draw () {
        this.div.style.left = this.pos.x.toString() + 'px';
        this.div.style.top = this.pos.y.toString() + 'px';  
    }

    update () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(-0.1, 0);
        this.left = this.pos.x;
        this.right = this.pos.x + this.div.offsetWidth;
        this.top = this.pos.y;
        this.bottom = this.pos.y + this.div.offsetHeight;
    }
}