  var spriteObject =
{
sourceX: 0,
sourceY: 0,
x: 0,
y: 0,
sourceWidth: 50,
sourceHeight: 50,
width: 10,
height: 10,
};
    var spriteObjectsquare =
{
sourceX: 0,
sourceY: 0,
x: 130,
y: 130,
sourceWidth: 50,
sourceHeight: 50,
width: 10,
height: 10,
};
    var spriteObjectmain =
{
sourceX: 500,
sourceY: 0,
x: 60,
y: 200,
sourceWidth: 50,
sourceHeight: 50,
width: 7,
height: 7,
previouslocx: 60,
previouslocy: 210,
currentlocy: 200,
currentlocx: 60,
};
    var spriteObjectloc =
{
y: 0,
x: 0,
};


    var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");
var sprites = [];
var M = 41;
var N = 15;
var step = 0;
var border = [];
var wait = true;
var game = true;
var temp = (M-1)/2-1;
var arr = [];
for (var i = 0; i < M; i++){
    temp++;
    arr[i] = [];
    arr[j] = [];
    for (var j = 0; j < M; j++){
    arr[i][j] = Object.create(spriteObject);
    arr[i][j].x = i*arr[i][j].width;
    arr[i][j].y = j*arr[i][j].height;
    if ((j==M-1-temp || j==temp) || (j==temp-M+1 || j == (M-1)*2-temp)){
      arr[i][j].sourceX = 400;
      border[step] = Object.create(spriteObject);
          border[step].x = arr[i][j].x;
    border[step].y = arr[i][j].y;
  
 
          step++;
      
    }
      else
      arr[i][j].sourceX = 0;
    sprites.push(arr[i][j]);
    
    
    
}
}
var mas = [];

 
for (var i = 0; i < N; i++){
    mas[i] = [];
    mas[j] = [];
    for (var j = 0; j < N; j++){
    
    mas[i][j] = Object.create(spriteObjectsquare);
    mas[i][j].x += i*mas[i][j].width;
    mas[i][j].y += j*mas[i][j].height;
    if ((j==0 || j ==N-1)||(i == 0|| i ==N-1)){
    mas[i][j].sourceX = 400;
        
    border[step] = Object.create(spriteObject);
          border[step].x =mas[i][j].x ;
    border[step].y = mas[i][j].y;
    
     
     
          step++;
    }
      else
      mas[i][j].sourceX = 0;
    sprites.push(mas[i][j]);
    }
}

var arrloc = [];
for (var i = 0; i < 2000; i++){
 arrloc[i] = Object.create(spriteObjectloc);
 arrloc[i].x = 0;
 arrloc[i].y = 0;
}

var hero = Object.create(spriteObjectmain);
sprites.push(hero);


function check(){
if (game){
    for (var i = 0; i < step; i++){
        if (hero.x > border[i].x - 10 && hero.x < border[i].x + 10 && hero.y > border[i].y-10 && hero.y < border[i].y+10)
        game = false;
        }
    }
}


var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "red.png";


    function loadHandler(){
   if (wait){
    setTimeout(move, 0);
    wait = false;
   }
   render();

}
var dir = true;
var distance;
var ran1, ran2;
var change = 0;
   function move(){
distance = Math.abs(hero.previouslocx - hero.currentlocx) + Math.abs(hero.previouslocy - hero.currentlocy);

    if (game){
     ran1 = Math.floor((Math.random() * 21) - 10);
     ran2 = Math.floor((Math.random() * 21) - 10);
    
  
    if (dir)
   dontchangedir();
   else changedir();
    check();
   
   if (!game){
    change++;
    hero.y = hero.currentlocy;
     hero.x = hero.currentlocx;
     game = true;
     if (change>20){
      change = 0;
      if (dir)
      dir = false;
      else dir = true;
     }
   }
   else {
//    console.log((Math.abs(hero.previouslocx - hero.x) + Math.abs(hero.previouslocy - hero.y)), distance);
    savedir();
    }
    }
    wait = true;
   }
   
   
   function savedir(){
    if ((Math.abs(hero.previouslocx - hero.x) + Math.abs(hero.previouslocy - hero.y)) > distance){
    hero.previouslocx = hero.currentlocx;
    hero.previouslocy = hero.currentlocy;
    hero.currentlocx = hero.x;
    hero.currentlocy = hero.y;
    }
    else {
     hero.y = hero.currentlocy;
     hero.x = hero.currentlocx;
    }
    
    
    
   }
   
   function dontchangedir(){
     if ((hero.previouslocx - hero.currentlocx) < (hero.previouslocy - hero.currentlocy)){
     
     while (ran1 <= ran2){
      ran1 = Math.floor((Math.random() * 21) - 10);
     ran2 = Math.floor((Math.random() * 21) - 10);
    
     }
     hero.y-= ran1;
    hero.x-= ran2;
    }
    else
    
    {
     while (ran1 >= ran2){
      ran1 = Math.floor((Math.random() * 21) - 10);
     ran2 = Math.floor((Math.random() * 21) - 10);
    
     }
     hero.y-= ran1;
    hero.x-= ran2;
    }
    
   }
    
    function changedir(){
     
      if ((hero.previouslocx - hero.currentlocx) > (hero.previouslocy - hero.currentlocy)){
     
     while (ran1 <= ran2){
      ran1 = Math.floor((Math.random() * 21) - 10);
     ran2 = Math.floor((Math.random() * 21) - 10);
    
     }
     hero.y+= ran1;
    hero.x-= ran2;
    }
    else
    
    {
     while (ran1 > ran2){
      ran1 = Math.floor((Math.random() * 21) - 10);
     ran2 = Math.floor((Math.random() * 21) - 10);
    
     }
     hero.y-= ran1;
    hero.x+= ran2;
    }
     
     
    }
    
function render()
{
    requestAnimationFrame(loadHandler, canvas);
drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
if(sprites.length !== 0)
{
for(var i = 0; i < sprites.length; i++)
{
var sprite = sprites[i];
 drawingSurface.globalAlpha = 1;
drawingSurface.drawImage(image,
sprite.sourceX, sprite.sourceY,
sprite.sourceWidth, sprite.sourceHeight,
Math.floor(sprite.x), Math.floor(sprite.y),
sprite.width, sprite.height);
}
}
}