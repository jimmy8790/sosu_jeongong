var canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');


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



