var dog , sadDog , happyDog;
var foodObj;
var foodS, foodStock ;
var fedTime , lastFed , feed ,addFood ;
var backgroundImg;


function preload(){
	sadDog = loadImage("dog.png");
  happyDog = loadImage("happy dog.png");
  backgroundImg = loadImage("background.jpg");
  bedroomImg=loadImage("Bed Room.png");
  gardenImg=loadImage("Garden.png");
  washroomImg=loadImage("Wash Room.png");
  lazyImg=loadImage("Lazy.png");
  runImg=loadImage("running.png");

}

function setup() {
	 database = firebase.database();
   createCanvas(1000,400);

   foodObj = new Food();

   foodStock = database.ref('Food');
   foodStock.on("value" , readStock);

   dog = createSprite (800,200,150,150);
   dog.addAnimation(sadDog);
   dog.addAnimation(happyDog);
   dog.addAnimation(lazyImg);
   dog.addAnimation(runImg);
   dog.scale=0.15;

   feed=createButton("Feed the dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood=createButton("Add Food")
   addFood.position(800,95);
   addFood.mousePressed(addFoods);

}


function draw() {  
  background(backgroundImg);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data) {
  lastFed = data.val(); 

   })

  fill(255,255,254);
  textSize(15);
  
  if(lastFed >= 12 ){
    text(" Last Feed: " + lastFed %12 + "PM",350,30);
  }
 else if(lastFed == 0){
   text(" Last Feed : 12AM ",350 ,30 );
 }
 else{
   text(" Last Feed: " + lastFed + "AM", 350 , 30 );
 }


  drawSprites();
  //add styles here

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
   Food: foodObj.getFoodStock(),
   FeedTime : hour()

  })
}

function addFoods(){
   foodS++;
   database.ref('/').update({
    Food : foodS
  })
}









