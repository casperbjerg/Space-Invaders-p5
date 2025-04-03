class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = game.laserCannon;
    this.w = 35;
    this.imgHeight = this.h = (this.img.height / this.img.width) * this.w;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.imgHeight);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += 5;
    }

    this.x = constrain(this.x, 0, width - this.w);
  }
}