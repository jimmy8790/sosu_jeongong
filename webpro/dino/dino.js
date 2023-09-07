var canvas = document.getElementById('game');
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

let score;
let scoreText;
let highscore;
let dino;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};

document.addEventListener('keydown', function (evt){
    keys[evt.code] = true;
})
document.addEventListener('keyup', function (evt){
    keys[evt.code] = false;
})

class Obstacles{
    constructor(x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dx = -gameSpeed;
    }
}

class Dino {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Draw(){
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    Jump(){
        if(this.grounded && this.jumpTimer == 0){
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        }
        else if(this.jumpTimer > 0 && this.jumpTimer < 15){
           this.jumpTimer++
           this.dy = this.jumpForce - (this.jumpTimer / 50); 
        }
    }

    Animate(){
    if(keys['Space'] || keys['KeyW']){
        this.Jump();
    }
    else{
        this.jumpTimer = 0;
    }

    if(keys['ShiftLeft'] || keys['KeyS']){
        this.h = this.originalHeight / 2;
    }
    else{
        this.h = this.originalHeight;
    }

        this.y += this.dy;

        if(this.y + this.h < canvas.height){
            this.dy += gravity;
            this.grounded = false;
        }
        else{
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        

        this.Draw();
    }
}

function Start(){
    canvas.width = window.innerWidth;
    canvas.hight = window.innerHeight;

    ctx.font = "20px sans-serif"

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highscore = 0;

    dino = new Dino(25, canvas.height-150 ,50 ,50 ,"#ffccaa");
    requestAnimationFrame(Update);
}
function Update(){
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.Animate();
}
Start();