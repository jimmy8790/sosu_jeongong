var canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

ctx.fillRect(0, 95, 100, 100);
ctx.clearRect(10, 105, 80, 80);

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(50,0);
ctx.lineTo(0,50);
ctx.fillStyle = "red";
ctx.fill();


ctx.beginPath();
ctx.moveTo(55, 55);
ctx.lineTo(5, 55)
ctx.lineTo(55, 5);
ctx.lineTo(55,55);
ctx.strokeStyle = "blue";
ctx.stroke();


ctx.fillStyle = "#ffccaa";
ctx.fillRect(80, 0, 80, 80);


ctx.globalAlpha = 0.2;

ctx.fillStyle = "#FD0";
ctx.fillRect(110, 95, 80, 80);

ctx.fillStyle = "#6c0";
ctx.fillRect(190, 95, 80, 80);

ctx.fillStyle = "#09F";
ctx.fillRect(110, 175, 80, 80);

ctx.fillStyle = "#F30";
ctx.fillRect(190, 175, 80, 80);

ctx.fillStyle = "#FFF";
ctx.fillRect(80, 0, 80, 80);

ctx.globalAlpha = 1;

ctx.fillStyle = "black";
ctx.font = '48px serif';
ctx.fillText('선린의 터를',  200, 50)

ctx.font = '48px serif';
var count=0
function run(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(count>622){
        return
    }
    count += 1
    ctx.fillText(count, 10 ,50);
    requestAnimationFrame(run);
}
requestAnimationFrame(run);



