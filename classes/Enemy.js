class Enemy {
  constructor(x, y, type) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.w = this.h = 30;
    this.type = type;
    this.direction = 1;

    if (this.type === 1) {
      this.img = game.enemyImg1;
      this.points = 20;
    } else if (this.type === 2) {
      this.img = game.enemyImg2;
      this.points = 30;
    }
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.w);
  }

  move(groupX, groupY) {
    this.x = this.initialX + groupX;
    this.y = this.initialY + groupY;
  }

  update() {
    if (random() < 0.0009) {
      game.enemyProjectiles.push(new Projectile(this.x + this.w / 2, this.y + this.w, 1, 5));
    }
  }
}