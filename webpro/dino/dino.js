const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let score; //현재 점수
let scoreText; //현재 점수 텍스트
let highscore; //최고 점수
let highscoreText; //최고 점수 텍스트
let dino; //공룡
let gravity; // 중력값
let obstacles = []; //장애물
let gameSpeed; // 게임 속도
let keys = {}; // 키 값

//이벤트 리스너 추가
document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});


class Text{
  constructor(t, x, y, a, c, s){
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }

  Draw(){
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif";
    ctx.textAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }

}

class Obstacle{
  constructor(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dx = -gameSpeed;
    this.isBird = false;
  }

  Update(){
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }

  Draw(){
    var img = new Image()
    if(this.isBird == true){
      img.src = 'bird.png'
      ctx.drawImage(img,this.x, this.y, this.w, this.h);
    }
    else{
      img.src = 'catus.png'
      ctx.drawImage(img,this.x, this.y, this.w, this.h)
    }
  }
}

class Dino {
    constructor (x, y, w, h, c) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.c = c;
  
      this.dy = 0; //점프를 위한 
      this.jumpForce = 15; //
      this.originalHeight = h; //숙이기 전 높이
      this.grounded = false; //땅에 있는지 판단
      this.jumpTimer =0 ; // 점프 시간 체크를 위한 타이머 추가
    }

    Draw(){
        var img = new Image()
        if((keys['ShiftLeft'] || keys['KeyS']) && this.grounded){
          img.src = 'dino_down.png'
          ctx.drawImage(img,this.x, this.y, this.w, this.h)
        }
        else{
          img.src = 'dino_up.png'
        ctx.drawImage(img,this.x, this.y, this.w, this.h);
    }
  }

    Jump () { //점프함수 추가
        if (this.grounded && this.jumpTimer == 0) {  //땅에 있는지 && 타이머 =0 
          this.jumpTimer = 1;
          this.dy = -this.jumpForce; 
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
          this.jumpTimer++;
          this.dy = -this.jumpForce - (this.jumpTimer / 50); //갈수록 빠르게 떨어지는 것 구현
        }
    }

    Animate () {
        // 키 입력 
        if (keys['Space'] || keys['KeyW']) { // 스페이스바 or 키보드 W 입력시
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }
    
        if ((keys['ShiftLeft'] || keys['KeyS']) && this.grounded) {  // 왼쉬프트 or 키보드 S 입력시
            this.y += this.h/2 
            this.h = this.originalHeight / 2; //h를 절반으로 줄여서 숙인 것과 같은 효과
        } else {
            this.h = this.originalHeight;
        }
    
        this.y += this.dy; //위치 변경

        //중력적용
        if (this.y + this.h < canvas.height) { //공중에 떠 있을 때
          this.dy += gravity; // 중력만큼 dy++
          this.grounded = false; 
        } else {
          this.dy = 0; 
          this.grounded = true;
          this.y = canvas.height - this.h; //바닥에 딱 붙어 있게 해줌
        }

        //this.y += this.dy; <-삭제 (뒤에 쓰면 중력 적용할 때 문제가 생김)

        this.Draw();
      }
  }

  function init() {
    obstacles = [];
    score = 0;
    spawnTimer = initialSpawnTimer;
    gameSpeed = 3;

    window.localStorage.setItem('highscore', highscore);
  }

function SpawnObstacle(){
  let size = RandomIntRange(20, 70);
  let type = RandomIntRange(0, 1);
  let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#2484E4')

  if(type == 1){
    obstacle.y -= dino.originalHeight - 10;
    obstacle.isBird = true;
  }
  obstacles.push(obstacle);
}

function RandomIntRange (min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function Start () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    ctx.font = "20px sans-serif";
  
    gameSpeed = 3;
    gravity = 1;
  
    score = 0;
    highscore = 0;
    
  if(localStorage.getItem('highscore')){
    highscore = localStorage.getItem('highscore');
  }

    dino = new Dino(25,canvas.height-150,50,50,"pink");
    //dino.Draw();// <- 업데이트 함수에서 그리기 위해서 삭제
    scoreText = new Text("Score: " + score, 25, 25, "left", "212121", "20")

    highscoreText = new Text("Highscore: " + highscore, canvas.width - 25, 25, "right", "#212121", "20");

    requestAnimationFrame(Update); // 추가
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update () {
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.Animate(); //공룡한테 애니메이션 주는 함수 <-여기서 그려줄거임

    spawnTimer--;
    if(spawnTimer <= 0){
      SpawnObstacle();
      console.log(obstacles);
      spawnTimer = initialSpawnTimer - gameSpeed * 8;

      if(spawnTimer < 60){
        spawnTimer = 60;
      }
    }

    for(let i = 0; i<obstacles.length; i++){
      let o = obstacles[i];

      if(o.x + o.w < 0){
        obstacles.splice(i, 1);
      }
      if(
        dino.x < o.x + o.w &&
        dino.x + dino.w > o.x &&
        dino.y < o.y + o.h &&
        dino.y + dino.h > o.y
      ){
        init();
      }
      o.Update();
    }
    score++;
    scoreText.t = "Score: " + score;
    scoreText.Draw();

    if(score > highscore){
      highscore = score;
      highscoreText.t = "Highscore: " + highscore;
    }

    highscoreText.Draw();

    gameSpeed += 0.003;
}  
Start();
