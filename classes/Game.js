class Game {
  constructor() {
    this.player;
    this.enemies = [];
    this.playerProjectiles = [];
    this.enemyProjectiles = [];
    this.gameOver = false;
    this.gameWin = false;
    this.showIntro = true;
    this.score = 0;
    this.highScore = 0;

    this.enemyImg1, this.enemyImg2, this.laserCannon, this.siIcon, this.customFont, this.customFont2;
    this.shootSound, this.invaderKilledSound, this.playerDeathSound, this.invaderMoveSound, this.invaderMoveSound2, this.soundTrack;

    this.invaderMoveSoundFlag = true;

    this.enemyGroupX = 100;
    this.enemyGroupY = 40;
    this.enemyGroupDirection = 1;
    this.enemyGroupSpeed = 10;
    this.moveCounter = 0;
    this.moveInterval = 16;
    this.movedDown = false;

    this.bindMousePressed();
    this.bindKeyPressed();
  }

  setup() {
    this.intro();
    this.mousePressed();
    this.invaderMoveSound.setVolume(0.075);
    this.invaderMoveSound2.setVolume(0.075);
    this.shootSound.setVolume(0.1);
    this.invaderKilledSound.setVolume(0.1);
    this.playerDeathSound.setVolume(0.1);
  }

  resetGame() {
    this.player = new Player(width / 2 - 35 / 2, height * 0.90);
    console.log('Player x: ' + this.player.x + ' Player y: ' + this.player.y); // Debugging line
    this.enemies = [];
    this.initEnemies();
    this.playerProjectiles = [];
    this.enemyProjectiles = [];
    this.gameOver = false;
    this.gameWin = false;
    this.score = 0;
    this.moveInterval = 16;
  }

  intro() {
    textAlign(CENTER);
    fill(255);
    textSize(20);
    textFont(this.customFont2);

    let textX = width / 2;
    let textY = height / 2 + 125;
    let textW = textWidth("PLAY SPACE INVADERS");
    let textH = textAscent() + textDescent();
    let hitboxX1 = textX - textW / 2;
    let hitboxX2 = textX + textW / 2;
    let hitboxY1 = textY - textH;
    let hitboxY2 = textY + textH / 2;
  
    if (mouseX > hitboxX1 - 5 && mouseX < hitboxX2 && mouseY > hitboxY1 - 2 && mouseY < hitboxY2 - 5) {
      fill(0, 255, 0);
    } else {
      fill(255);
    }

    text("PLAY SPACE INVADERS", width / 2, height / 2 + 125);
    
    let iconSize = 50;
    let spacing = 50;
    let totalWidth = iconSize + textWidth("= 20 POINTS") - 30;
    let startX = width / 2 - totalWidth / 2;
    let startY = height / 2 - 35;

    fill(255);
    textSize(15);
    textAlign(LEFT);
    image(this.enemyImg1, startX, startY, iconSize, iconSize);
    text("= 20 POINTS", startX + iconSize + 15, startY + iconSize / 2 + 5);

    image(this.enemyImg2, startX, startY + spacing, iconSize, iconSize);
    text("= 30 POINTS", startX + iconSize + 15, startY + spacing + iconSize / 2 + 5);
  
    let siIconWidth = 200;
    let siIconHeight = (this.siIcon.height / this.siIcon.width) * siIconWidth; //?
    image(this.siIcon, width / 2 - (siIconWidth + 80) / 2, 25, siIconWidth + 80, siIconHeight);
  }

  gameOverScreen() {
    this.gameOver = true;
    textAlign(CENTER);

    textSize(15);
    fill(255);
    text("HIGH SCORE ", width / 2 - textWidth(this.highScore) / 2, height / 2 - 15);

    fill(0, 255, 0);
    text(this.highScore, width / 2 + textWidth("HIGH SCORE ") / 2, height / 2 - 15);
    fill(255);
    textSize(30);
    textFont(this.customFont2);
    text("GAME OVER", width / 2, height / 2 + 50);
    textSize(10);

    let textX = width / 2;
    let textY = height / 2 + 100;
    let textW = textWidth("PLAY AGAIN?");
    let textH = textAscent() + textDescent();
    let hitboxX1 = textX - textW / 2;
    let hitboxX2 = textX + textW / 2; 
    let hitboxY1 = textY - textH; 
    let hitboxY2 = textY + textH / 2; 
  
    if (mouseX > hitboxX1 - 5 && mouseX < hitboxX2 && mouseY > hitboxY1 - 2 && mouseY < hitboxY2 - 5) {
      fill(0, 255, 0); // Change color to red when hovering
    } else {
      fill(255); // Default color
    }

    text("PLAY AGAIN?", width / 2, height / 2 + 100);

    let siIconWidth = 200;
    let siIconHeight = (this.siIcon.height / this.siIcon.width) * siIconWidth;
    image(this.siIcon, width / 2 - (siIconWidth + 80) / 2, 25, siIconWidth + 80, siIconHeight);
  }

  gameWinScreen() {
    this.gameWin = true;
    textAlign(CENTER);

    textSize(15);
    fill(255);
    text("HIGH SCORE ", width / 2 - textWidth(this.highScore) / 2, height / 2 - 15);

    fill(0, 255, 0);
    text(this.highScore, width / 2 + textWidth("HIGH SCORE ") / 2, height / 2 - 15);
    fill(255);
    textSize(30);
    textFont(this.customFont2);
    text("YOU BEAT THE GAME!", width / 2, height / 2 + 50);
    textSize(10);

    let textX = width / 2;
    let textY = height / 2 + 100;
    let textW = textWidth("PLAY AGAIN?");
    let textH = textAscent() + textDescent();
    let hitboxX1 = textX - textW / 2;
    let hitboxX2 = textX + textW / 2; 
    let hitboxY1 = textY - textH; 
    let hitboxY2 = textY + textH / 2; 
  
    if (mouseX > hitboxX1 - 1 && mouseX < hitboxX2 && mouseY > hitboxY1 - 2 && mouseY < hitboxY2 - 5) {
      fill(0, 255, 0); // Change color to red when hovering
    } else {
      fill(255); // Default color
    }

    text("PLAY AGAIN?", width / 2, height / 2 + 100);

    let siIconWidth = 200;
    let siIconHeight = (this.siIcon.height / this.siIcon.width) * siIconWidth;
    image(this.siIcon, width / 2 - (siIconWidth + 80) / 2, 25, siIconWidth + 80, siIconHeight);

  }

  initEnemies() {
    this.enemyGroupX = 100;
    this.enemyGroupY = 40;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        this.enemies.push(new Enemy(j * 35, i * 25, i < 2 ? 2 : 1));
      }
    }
  }

  moveEnemies() {
    this.moveCounter++;

    for (let enemy of this.enemies) {
      enemy.move(this.enemyGroupX, this.enemyGroupY);
    }

    if (this.moveCounter >= this.moveInterval) {
      this.moveCounter = 0;

      const numEnemiesInRow = 10;
      const enemyWidth = 30;
      const spacing = 5;
      const totalWidth = numEnemiesInRow * enemyWidth + numEnemiesInRow * spacing;

      if (this.enemyGroupX > width - totalWidth - enemyWidth / 4 || this.enemyGroupX < 20) {
        if(!this.movedDown) {
          this.enemyGroupY += 25;
          this.movedDown = true;
          this.moveInterval -= 1.5;
        } else {
          this.enemyGroupDirection *= -1;
          this.enemyGroupX += this.enemyGroupSpeed * this.enemyGroupDirection;
        }
      } else {
        this.enemyGroupX += this.enemyGroupSpeed * this.enemyGroupDirection;
        this.movedDown = false;
      }

      if (this.invaderMoveSoundFlag) {
        this.invaderMoveSound.play();
      } else {
        this.invaderMoveSound2.play();
      }
      
      this.invaderMoveSoundFlag = !this.invaderMoveSoundFlag;
    }
  }

  draw() {
    background(0);
    if (this.showIntro) {
      this.intro();
    } else if (this.gameOver) {
      this.gameOverScreen();
    } else if (this.gameWin) {
      this.gameWinScreen();
    } else {
      this.player.show();
      this.player.move();
      
      this.moveEnemies();

      fill(0, 255, 0);
      rect(2, height - 5, width - 5, 3)

      textAlign(LEFT);
      textSize(15);
      textFont(this.customFont2);
      fill(255);
      text("SCORE ", 10, 20);

      fill(0, 255, 0);
      text(this.score, 20 + textWidth("SCORE "), 20);

      for (let enemy of this.enemies) {
        enemy.show();
        enemy.update();
      }

      for (let i = 0; i < this.playerProjectiles.length; i++) {
        this.playerProjectiles[i].show();
        this.playerProjectiles[i].move();

        for (let j = 0; j < this.enemies.length; j++) {
          if (this.playerProjectiles[i].hit(this.enemies[j])) {

            this.invaderKilledSound.play();

            this.score += this.enemies[j].points;
            this.playerProjectiles.splice(i, 1);
            this.enemies.splice(j, 1);
            break;
          } else if (this.playerProjectiles[i].pos.y < 0) {
            this.playerProjectiles.splice(i, 1);
            break;
          }
        }
      }

      for (let i = 0; i < this.enemyProjectiles.length; i++) {
        this.enemyProjectiles[i].show();
        this.enemyProjectiles[i].move();

        if (this.enemyProjectiles[i].hit(this.player)) {
          console.log('Player hit detected!'); // Debugging line
          this.gameOver = true;
          this.playerDeathSound.play();
          if (this.score > this.highScore) {
            this.highScore = this.score;
          }
        } else if (this.enemyProjectiles[i].pos.y > height) {
          this.enemyProjectiles.splice(i, 1);
          console.log('enemyProjectile Spliced'); // Debugging line
        }
      }

      if (this.enemies.length === 0) {
        this.gameWin = true;
        if (this.score > this.highScore) {
          this.highScore = this.score;
        }
      }
    }
    // image(this.musicToggle, width - 40, 5, 30, 30);
  }

  mousePressed() {
    if (this.showIntro) {
      let textX = width / 2;
      let textY = height / 2 + 125;
      textSize(20);
      textFont(this.customFont2);
      let textW = textWidth("PLAY SPACE INVADERS");
      let textH = textAscent() + textDescent();
  
      let hitboxX1 = textX - textW / 2;
      let hitboxX2 = textX + textW / 2; 
      let hitboxY1 = textY - textH; 
      let hitboxY2 = textY + textH / 2; 
      if (mouseX > hitboxX1 - 5 && mouseX < hitboxX2 && mouseY > hitboxY1 - 2 && mouseY < hitboxY2 - 5) {
        console.log("Game started");
        this.showIntro = false;
        this.resetGame();
      }

    } else if (this.gameOver || this.gameWin) {
      let textX = width / 2;
      let textY = height / 2 + 100;
      textSize(10);
      textFont(this.customFont2);
      let textW = textWidth("PLAY AGAIN?");
      let textH = textAscent() + textDescent();
  
      let hitboxX1 = textX - textW / 2;
      let hitboxX2 = textX + textW / 2; 
      let hitboxY1 = textY - textH; 
      let hitboxY2 = textY + textH / 2; 
      if (mouseX > hitboxX1 - 5 && mouseX < hitboxX2 && mouseY > hitboxY1 - 2 && mouseY < hitboxY2 - 5) {
        console.log("Game started");
        this.gameOver = false;
        this.resetGame();
      }
    }

    // if (mouseX > width - 50 && mouseX < width - 10 && mouseY > 10 && mouseY < 50) {
    //   if (this.soundTrack.isPlaying()) {
    //     this.soundTrack.pause();
    //     musicToggle = this.musicOff;
    //   } else {
    //     this.soundTrack.loop();
    //     musicToggle = this.musicOn;
    //   }
    // }

  }

  keyPressed() {
    if (key === " " && this.playerProjectiles.length < 1) {
      this.playerProjectiles.push(new Projectile(this.player.x + this.player.w / 2, this.player.y, -1, 15));
      this.shootSound.setVolume(0.05);
      this.shootSound.play();
    }
  }

  bindMousePressed() {
    window.mousePressed = this.mousePressed.bind(this);
  }

  bindKeyPressed() {
    window.keyPressed = this.keyPressed.bind(this);
  }
}