var basketball, basketball_image;
var basketballPos1, basketballPos1_image;
var basketballPos1_image2;
var ball_collider, score_collider;
var hoop, hoop_image, hoop_collider, hoop_swish;
var basket;
var bottomEdge;
var topEdge;
var blocker;
var rEdge, lEdge, tEdge, bEdge;
var score, score_adder, shoots;
var gameState, START, PLAY, END;
var playAgain, playAgainImg;
var shootButton, shootImage, blocker_2;
/*alert("The Game Is Simple.\nTry To Shoot The Ball Into The Basket.\nTo Shoot The Ball Press Shoot.\nYou Get 10 Shots.\nGood Luck!!!");*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function preload() {
  //loading basketball...
  basketball_image = loadImage("basketball.png");

  //loading initial shooting position
  basketballPos1_image = loadImage("basketball1.png");

  //loading later shooting position
  basketballPos1_image2 =
    loadImage("download.png");

  hoop_image = loadImage("bBallHoop.png");
  hoop_swish = loadImage("bBallHoop1.png");

  playAgainImg = loadImage("images.png");

  shootImage = loadImage("shoot-1.png");

}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //setting basketballPos images
  basketballPos1 = createSprite(350, 300, 20, 20);
  basketballPos1.x = window.innerWidth/2 + 590;
  basketballPos1.y = window.innerHeight/2 + 200;
  basketballPos1.addImage("pos_1", basketballPos1_image);
  basketballPos1.addImage("pos_2", basketballPos1_image2);


  //setting basketball
  basketball = createSprite(60, 190, 20, 20);
  basketball.addImage("ball", basketball_image);
  basketball.y = basketballPos1.y - 100;
  basketball.x = basketballPos1.x + 8;
  basketball.scale = 0.6;
  basketball.setCollider("rectangle", -18, 0, 30, 1);

  //setting collider
  ball_collider = createSprite(350, 205, 20, 1);
  ball_collider.y = basketball.y + 3;
  ball_collider.x = basketball.x - 5;
  ball_collider.visible = false;

  hoop = createSprite(60, 180, 20, 20);
  hoop.y = window.innerHeight/2 - 200;
  hoop.x = window.innerWidth/2 - 550;
  hoop.addImage("hoop", hoop_image);
  hoop.addImage("hoop_swish", hoop_swish);
  hoop.scale = 0.5;
  hoop.setCollider("rectangle", -117, -40, 20, 160);
  hoop.velocityY = -3.5;

  hoop_collider = createSprite(18, 159, 18, 14);
  hoop_collider.visible = false;

  basket = createSprite(50, 180, 34, 45);

  basket.visible = false;

  topEdge = createSprite(200, 0, 400, 1);
  topEdge.y = 0;
  bottomEdge = createSprite(200, 300, 400, 1);
  bottomEdge.x = window.innerWidth/2 - 500;
  bottomEdge.y = window.innerHeight/2 + 200;
  
  bottomEdge.visible = false;

  blocker = createSprite(73, 180, 1, 50);
  blocker.visible = false;
  blocker_2 = createSprite(28, 180, 1, 47);
  blocker_2.visible = false;


  rEdge = createSprite(400, 200, 1, 400);
  rEdge.visible = false;
  lEdge = createSprite(0, 200, 1, 400);
  lEdge.visible = false;
  tEdge = createSprite(200, 0, 400, 1);
  tEdge.visible = false;
  bEdge = createSprite(200, 400, 400, 1);
  bEdge.visible = false;

  score = 0;
  score_adder = createSprite(50, 180, 40, 1);
  score_adder.visible = false;
  score_collider = createSprite(45, 180, 23.5, 23.5);
  score_collider.visible = false;

  score_collider.setCollider("circle", 0, 0, 15);


  PLAY = 1;
  END = 2;
  gameState = PLAY;
  shoots = 10;
  playAgain = createSprite(200, 200, 20, 20);
  playAgain.scale = 0.5;
  playAgain.x = window.innerWidth/2;
  playAgain.y = window.innerHeight/2;
  playAgain.addImage("restart", playAgainImg);
  playAgain.visible = false;

  shootButton = createSprite(50, 350, 30, 30);
  shootButton.x = window.innerWidth/2 - 550;
  shootButton.y = window.innerHeight/2 + 280;
  shootButton.addImage("shoot", shootImage);
  shootButton.scale = 0.3;
  
  console.log(window.innerWidth,window.innerHeight);
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function draw() {
  background(200);

  if (gameState === PLAY) {
    //Activate Movement
    if (touches.length > 0 && basketball.collide(ball_collider) && gameState === PLAY) {
      basketballPos1.changeAnimation("pos_2", basketballPos1_image2);
      basketballPos1.scale = 1.15;
      basketball.velocityY = -15;
      basketball.velocityX = -13.5;
      touches = [];
    }


    createEdgeSprites();
    score_collider.bounceOff(hoop);
    score_collider.bounceOff(hoop_collider);
    score_collider.bounceOff(blocker);
    basketball.bounceOff(hoop);
    basketball.bounceOff(hoop_collider);
    basketball.bounceOff(blocker);
    hoop.bounceOff(topEdge);
    hoop.bounceOff(bottomEdge);
    basketball.bounceOff(blocker_2);
    score_collider.bounceOff(blocker_2);

    if (score_collider.bounceOff(hoop)) {
      basketball.bounceOff(hoop);
    }

    if (score_collider.bounceOff(hoop_collider)) {
      basketball.bounceOff(hoop_collider);
    }

    if (score_collider.bounceOff(blocker)) {
      basketball.bounceOff(blocker);
    }

    if (score_collider.isTouching(basket)) {
      hoop.changeAnimation("hoop_swish", hoop_swish);
    } else {
      hoop.changeAnimation("hoop", hoop_image);
      hoop.x = 60;
    }



    if (basketball.isTouching(score_adder)) {
      score++;
      hoop.changeAnimation("hoop_swish", hoop_swish);
    } else {
      hoop.changeAnimation("hoop", hoop_image);
    }

    if (basketball.x > window.innerWidth || basketball.x < -(window.innerWidth) || basketball.y > window.innerHeight || basketball.y < -(window.innerHeight)) {
      ballReset();
    }

  }

  // gameState play end

  if (gameState === PLAY && shoots <= 0) {
    gameState = END;
  }
  if (gameState === END) {
    hoop.velocityY = 0;
    fill(0);
    textSize(20);
    textFont("Chalkduster");
     text("Your Score Is " + score, window.innerWidth/2 - 85, window.innerHeight/2 - 75);
    text("Play Again", window.innerWidth/2 - 60, window.innerHeight/2 + 85);
    playAgain.visible = true;
  }
  if (gameState === END && touches.length > 0) {
    gameReset();
    touches = [];
  }
  //gravity
  basketball.velocityY += 0.31;
  basketball.collide(ball_collider);
  basket.y = hoop.y;
  hoop_collider.y = hoop.y - 21;
  blocker.y = hoop.y - 5;
  score_adder.y = hoop.y;
  score_collider.y = basketball.y - 16;
  score_collider.x = basketball.x - 11;
  blocker_2.y = hoop.y;
  blocker_2.x = hoop.x - 32;
  ball_collider.x = basketballPos1.x + 5;
  ball_collider.y = basketballPos1.y - 87.5;

  drawSprites();
  
  

  fill(0);
  textSize(12.5)
  textFont("Chalkduster");
  text("Baskets: " + score, window.innerWidth/2 + 450, window.innerHeight/2 - 290);
  text("Shoots Remaining: " + shoots, window.innerWidth/2 + 450, window.innerHeight/2 - 270);
}
//function draw end

function ballReset() {
  basketball.x = basketballPos1.x + 5;
  basketball.y = basketballPos1.y - 100;
  basketball.setVelocity(0, 0);
  hoop.changeAnimation("hoop", hoop_image);
  basketballPos1.changeAnimation("pos_1", basketballPos1_image);
  basketballPos1.scale = 1;
  shoots--;
}

function gameReset() {
  hoop.y = window.innerHeight - 200;
  hoop.velocityY = -3.5;
  playAgain.visible = false;
  shoots = 10;
  score = 0;
  gameState = PLAY;
}