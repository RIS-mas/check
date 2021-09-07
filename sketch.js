var runner,coin;
var rock,rock2,froset;
var boy,bg;
//gamestates
var PLAY=1;
var END=0;
var gameState=1;
function preload(){
 runner = loadAnimation("runner.png","runner2.png","runner3.png");
 coin = loadImage("coin.png");
 rock = loadImage("rock.png")
 rock2 = loadImage("rock2.png")
 froset = loadImage("froset.jpg")
 endImg = loadAnimation("gameOver.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //background
    bg=createSprite(width/2,200);
    bg.addImage(froset)
    bg.velocityX=4
    //boy
    boy = createSprite(width-20,height/2,20,20);
    boy.addAnimation("SahilRunning",runner);
    boy.scale=0.08
    //group
    coinG=new Group();
    stoneG=new Group();
}

function draw() {
   if(gameState===PLAY){
   background(0);
   boy.x = World.mouseX;
   
   edges= createEdgeSprites();
   boy.collide(edges);

   //code to reset the background
   if(bg.x > 400 ){
    bg.x = width/2;
   }
   coinG();
   stoneG();
   if (coinG.isTouching(boy)){
       coinG.destroyEach();
       treasureCollection=treasureCollection+50;
   }
   if(keydown("space")&&boy.y>=150){
     boy.velocityY = -12;
 }
 boy.velocityY = boy.velocityY + 0.8
  }
  else{
    if(stonG.isTouching(boy)) {
      gameState=END;

       boy.chageAnimation("SahilRunning",endImg)
       boy.x=width/2;
        boy.y=height/2;
        boy.scale=1;

        coinG.destroyEach();
        stonG.destroyEach();

        coinG.setVelocityXEach(0);
        stoneG.setVelocityXEach(0);
    }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }
}


function coinG()  {
  if(World.frameCount % 200 == 0){
   var money = createSprite(Math.round(random(50, width-50),40, 10, 10));
  money .addImage(coin);
  money.scale=0.12;
  money.velocityX = 4;
  money.lifetime = 2,200
  coinG.add(money);
}
} 

function stoneG(){
    if(World.frameCount % 200 == 0){
        var stone = createSprite(600,165,10,40);
        stone.velocityX = (4) ;
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
      case 1: stone.addImage(rock);
              break;
      case 2: stone.addImage(rock2);
              break;
      default: break;
    }
    stone.scale=0.5
    stone.lifetime = 300

    stoneG.add(stone)

    }
  }