let game;
let musicOnImage, musicOffImage;

function preload() {
  game = new Game();
  game.laserCannon = loadImage("/images/laser_cannon.webp");
  game.enemyImg1 = loadImage("/images/enemy1.png");
  game.enemyImg2 = loadImage("/images/enemy2.png");
  game.siIcon = loadImage("/images/si-icon.png");
  game.customFont = loadFont("/space-invaders-full-version.ttf");
  game.customFont2 = loadFont("/PressStart2P.ttf");

  musicOnImage = loadImage("/images/musicOn.png");
  musicOffImage = loadImage("/images/musicOff.png");
  
  game.shootSound = loadSound("/sounds/shoot.wav");
  game.invaderKilledSound = loadSound("/sounds/invaderkilled.wav");
  game.playerDeathSound = loadSound("/sounds/explosion.wav");
  game.invaderMoveSound = loadSound("/sounds/fastinvader1.wav");
  game.invaderMoveSound2 = loadSound("/sounds/fastinvader2.wav");
  game.soundTrack = loadSound("/sounds/spaceinvaders1.mpeg");
}

function setup() {
  createCanvas(550, 350);
  frameRate(24);
  game.setup();
} 

function draw() {
  game.draw();
}
