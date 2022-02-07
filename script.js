const canvas = document.querySelector('canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const context = canvas.getContext('2d');

var bsLevel = 0.75;

context.shadowBlur = 10;
context.shadowColor = "#00ffff";

const turdMask = new Image();
turdMask.src = './assets/turd-mask.png';

const particals = new Array(8).fill(0).map(()=>{
    return {
        x: Math.random()*canvas.width,
        y: canvas.height-(canvas.height*bsLevel),
        age: Math.random(),
    };
});

function drawWaves(time, value=bsLevel) {
    context.fillStyle = "#00ffffcc";
    context.strokeStyle = "#00ffff";
    context.lineWidth = 5;

    let h = canvas.height-(canvas.height*value);

    let peak = h-(Math.sin(time/10) * 8);

    context.beginPath();
    context.moveTo(0, h);
    context.quadraticCurveTo(canvas.width/2, peak, canvas.width, h);
    context.lineTo(canvas.width, canvas.height);
    context.lineTo(0, canvas.height);
    context.closePath();
    context.fill();
    context.stroke();
}

function drawParticals(time) {

    let h = canvas.height-(canvas.height*bsLevel);
    let peak = h-(Math.sin(time/10) * 8);

    for (let i in particals) {
        let p = particals[i];

        context.fillStyle = `rgba(255, 255, 255, ${p.age})`;

        context.beginPath();
        context.arc(p.x, p.y, 1, 0, Math.PI*2);
        context.fill();

        p.y -= 0.2;
        p.age -= 0.02;

        if (p.age < 0.1) {
            p.x = Math.random()*canvas.width;
            p.y = peak;
            p.age = Math.random();
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#000022';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let t = Date.now()/100;

    drawWaves(t);
    drawParticals(t);

    context.globalCompositeOperation = 'destination-in';
    context.drawImage(turdMask, 0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'source-over';
}

turdMask.onload = animate;