class Projectile {
  constructor(x, y, direction, speed) {
    this.pos = createVector(x, y);
    this.speed = speed;
    this.direction = direction;
  }

  move() {
    this.pos.y += this.speed * this.direction;
  }

  show() {
    fill(255);
    stroke(255, 0, 0);
    strokeWeight(1);
    rect(this.pos.x, this.pos.y, 2, 10);
    noStroke();
  }

  hit(obj) {
    let d = dist(this.pos.x, this.pos.y, obj.x + obj.w / 2, obj.y + obj.h / 2);
    return d < obj.w / 2;
  }
}