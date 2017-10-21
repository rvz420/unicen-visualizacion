class Cactus {
    constructor() {
        this.cactus = new Entity();
        this.cactus.pos.set(700,250);
        this.cactus.vel.set(0,0);
        this.cactus.acc.set(0,0);
        this.div = document.getElementById('obstacles');
        this.left = this.cactus.pos.x;
        this.right = this.cactus.pos.x + this.div.offsetWidth;
        this.top = this.cactus.pos.y;
        this.bottom = this.cactus.pos.y + this.div.offsetHeight;
    }

    draw () {
        this.div.style.left = this.cactus.pos.x.toString() + 'px';
        this.div.style.top = this.cactus.pos.y.toString() + 'px';  
    }

    update () {
        this.cactus.vel.add(this.cactus.acc);
        this.cactus.pos.add(this.cactus.vel);
        this.cactus.acc.set(-0.1, 0);
        this.left = this.cactus.pos.x;
        this.right = this.cactus.pos.x + this.div.offsetWidth;
        this.top = this.cactus.pos.y;
        this.bottom = this.cactus.pos.y + this.div.offsetHeight;
    }
}