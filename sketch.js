var knight , knightImg , flipKnightImg
var burglar , burglarImg , flipBurglarImg
var castle , castleImg , flipCastleImg
var bgImg

var FORM = 0
var PLAY = 1
var END = 2
var gameState = 0;

var score = 0



function preload(){
  bgImg = loadImage("images/bg.jpg");
knightImg = loadAnimation("images/knight1.png");
burglarImg = loadAnimation("images/burglarboi-removebg-preview.png");
castleImg = loadImage("images/castleboi-removebg-preview.png");
flipKnightImg = loadAnimation("images/knight2.png");
flipBurglarImg = loadAnimation("images/flippedBurglar.jpg");
flipCastleImg = loadImage("images/flippedCastle.jpg");


}

function setup(){
  var canvas=createCanvas(1500,800);
  
  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);



  knight = createSprite(700 , 700);
  knight.addAnimation("noflip" , knightImg);
  knight.addAnimation(  "flip" , flipKnightImg);
  knight.scale = 0.5
  
castle = createSprite(1290 , 400);
castle.addImage(castleImg);



castle.debug = true;

knight.debug = true

castle.setCollider("rectangle" , 0 , 0 , 50 , 800);
knight.setCollider("rectangle" , 0 , 0 , 100 , 100);


mob = new Group()

}
function draw()
{
  
  background(bgImg);

if(gameState === FORM){
  console.log(gameState);
  button1 = createButton('PLAY');
  button1.position( 100 , 200);
  if(button1.mousePressed()){
    
    gameState = PLAY;
    
  }

  knight.visible = false
  castle.visible = false
  
 
}




if(gameState === PLAY ){
knight.visible = true
castle.visible = true

  textSize(30)
  fill("black")
  stroke("black")
  text("Score:" + score , 750 , 70);

  if(keyDown("d")){

    knight.changeAnimation("flip" , flipKnightImg);
    knight.x = knight.x + 5
    
  }
  if(keyDown("a")){
    knight.x = knight.x - 5
    knight.changeAnimation("noflip" ,  knightImg);
  }
  if(keyDown("w")){
    knight.y = knight.y -5 
  }
  if(keyDown("s")){
    knight.y = knight.y +5
  }
  if(frameCount % 120 === 0){
    spawnBurglars();
  }
  
  if(score > 100){

    if(frameCount % 100 === 0){
    spawnBurglars();
    
    }
  if(keyDown("d")){

    knight.changeAnimation("flip" , flipKnightImg);
    knight.x = knight.x + score/100
    
  }
  if(keyDown("a")){
    knight.changeAnimation("noflip" ,  knightImg);
    knight.x = knight.x - score/100
   
  }
  if(keyDown("w")){
    knight.y = knight.y - score/100
  }
  if(keyDown("s")){
    knight.y = knight.y + score/100
  }

}

  for(var i = 0 ; i < mob.length ; i++){
    if(knight.isTouching(mob[i])){
      mob[i].destroy();
      score = score + 100
    }
    
}
if(mob.collide(castle)){
  burglar.setVelocity(0 , 0) 
  gameState = END
}
}

else if(gameState === END){
  textSize(35);
text("GAME OVER BRO!!" , 700 , 400);
knight.visible = false
mob.destroyEach();
castle.visible = false

}
 

 drawSprites();
}
 function spawnBurglars(){
  
    var spawn
    spawn = Math.round(random(0 , 700))
    burglar = createSprite(100 , spawn);
    burglar.addAnimation( "appearpls" , burglarImg);
    burglar.scale = 0.4
    burglar.velocityX = 5
    mob.add(burglar)
    burglar.debug = true;
    burglar.setCollider("rectangle" , 0 , 0 , 200, 200); 
}

function greet() {
  const name = input.value();
  greeting.html('hello ' + name + '!');
  input.value('');

 

  for (let i = 0; i < 200; i++) {
    push();
    fill(random(255), 255, 255);
    translate(random(width), random(height));
    rotate(random(2 * PI));
    text(name, 0, 0);
    pop();
  }
}

function hide(){
  input.hide()
  greeting.hide()
  button.hide();
  button1.hide();
}