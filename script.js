const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createHeart();
}
window.addEventListener("resize", resize);

const stars = [];
const HEART_SCALE = 15;
const STAR_COUNT = 900;

// Heart equation
function heartPoint(t){
    return {
        x:16*Math.pow(Math.sin(t),3),
        y:13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)
    };
}

function createHeart(){

    stars.length = 0;

    for(let i=0;i<STAR_COUNT;i++){

        const t = Math.random()*Math.PI*2;
        const p = heartPoint(t);

        stars.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,

            tx:canvas.width/2 + p.x*HEART_SCALE,
            ty:canvas.height/2 - p.y*HEART_SCALE,

            vx:(Math.random()-0.5)*2,
            vy:(Math.random()-0.5)*2,

            size:Math.random()*2+1,
            alpha:Math.random()
        });
    }
}

resize();

function drawStar(x,y,r){

    ctx.beginPath();

    for(let i=0;i<5;i++){

        let angle=i*Math.PI*2/5-Math.PI/2;

        ctx.lineTo(
            x+Math.cos(angle)*r,
            y+Math.sin(angle)*r
        );

        angle+=Math.PI/5;

        ctx.lineTo(
            x+Math.cos(angle)*r*0.45,
            y+Math.sin(angle)*r*0.45
        );
    }

    ctx.closePath();
    ctx.fill();
}

function animate(){

    ctx.fillStyle="rgba(5,8,22,0.15)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(const s of stars){

        const dx=s.tx-s.x;
        const dy=s.ty-s.y;

        s.vx += dx*0.0008;
        s.vy += dy*0.0008;

        s.vx *= 0.96;
        s.vy *= 0.96;

        s.x += s.vx;
        s.y += s.vy;

        s.alpha += 0.03;
        const glow=0.6+0.4*Math.sin(Date.now()/250+s.x);

        ctx.fillStyle=`rgba(255,240,180,${glow})`;
        drawStar(s.x,s.y,s.size);
    }

    requestAnimationFrame(animate);
}

animate();
