const canvas=document.getElementById("id1");
const context=canvas.getContext("2d");

//create a user paddle
const user={
    x:0,
    y:canvas.height/2-100/2,
    width:10,
    height:100,
    color:"white",
    score:0
}
//create a com paddle
const com={
    x:canvas.width-10,
    y:canvas.height/2-100/2,
    width:10,
    height:100,
    color:"white",
    score:0
}

//create a ball
const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    r:10,
    speed:2,
    velocityX:2,
    velocityY:2,
    color:"white"
}
const net={
    x:canvas.width/2-1,
y:0,
width:2,
height:10,
color:"white"
}

function drawNet(){
    for(let i=0;i<=canvas.height;i=i+15){
        drawRect(net.x,net.y+i,net.width,net.height,net.color);
    }
}

//to create the canvas
function drawRect(x,y,w,h,color){
    context.fillStyle=color;
     context.fillRect(x,y,w,h);
}
drawRect(0,0,canvas.width,canvas.height,"black");

//to draw the ball
function drawCircle(x,y,r,color){
    context.fillStyle=color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}
drawCircle(100,100,50,"white");

//inserting scores on top

function drawText(text,x,y,color){
    context.fillStyle=color;
    context.font="45px fantasy";
    context.fillText(text,x,y);
}
drawText("something",300,200,"white")

function render(){
    drawRect(0,0,canvas.width,canvas.height,"black");
    drawNet();
    drawText(user.score,canvas.width/4,canvas.height/5,"white");
    drawText(com.score,3*canvas.width/4,canvas.height/5,"white");
     drawRect(user.x,user.y,user.width,user.height,user.color);
     drawRect(com.x,com.y,com.width,com.height,com.color);
     drawCircle(ball.x,ball.y,ball.r,ball.color);
}

canvas.addEventListener("mousemove",movePaddle);

function movePaddle(evt){   //to control the paddle with mouse
    let rect=canvas.getBoundingClientRect();  //to get top of canvas
    user.y=evt.clientY-rect.top-user.height/2;

}
function collision(b,p){
      b.top=b.y-b.r;
      b.bottom=b.y+b.r;
      b.left=b.x-b.r;
      b.right=b.x+b.r;
      p.top=p.y;
      p.bottom=p.y+p.height;
      p.left=p.x;
      p.right=p.x+p.width;

      return b.right>p.left && p.bottom>b.top && b.bottom>p.top && b.left<p.right;
}

function resetBall(){
    ball.x=canvas.width/2;
    ball.y=canvas.height/2;
    ball.velocityX=-ball.velocityX;
}
function update(){
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    let computerlevel=0.1;
    com.y+=(ball.y-(com.y+com.height/2))*computerlevel;
    if(ball.y-ball.r<0||ball.y+ball.r>canvas.height){  //top and bottom surface collison of ball with wall
        ball.velocityY=-ball.velocityY;
    }
    let player=(ball.x<canvas.width/2)?user:com;
    if(collision(ball,player)){   //collision of ball with player
let collidePoint=ball.y-(player.y+player.height/2);
collidePoint=collidePoint/(player.height/2);

let angleRad=Math.PI/4*collidePoint;
let direction=(ball.x<canvas.width/2)?1:-1;
ball.velocityX=direction*ball.speed*Math.cos(angleRad);
ball.velocityY=direction*ball.speed*Math.sin(angleRad);
//ball.speed+=0.1;
    }

    //update the score
    if(ball.x-ball.r<0){
        com.score++;
        resetBall();
    }
    else if(ball.x+ball.r>canvas.width){
        user.score++;
        resetBall();
    }
}
function game(){
    update();
    render();
}
const framespersecond=1000;
setInterval(game,1000/framespersecond);