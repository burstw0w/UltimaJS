const SWIDTH = window.innerWidth;
const SHEIGHT = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", SWIDTH);
canvas.setAttribute("height", SHEIGHT);
document.body.appendChild(canvas);

const context = canvas.getContext("2d");
const TICK = 30;
const CELL_SIZE = 64;
const PLAYER_SIZE = 10;

const COLORS = {
    rays: "#ffa600"
}

const map = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
];

const player = {
    x: CELL_SIZE * 1.5,
    y: CELL_SIZE * 1.5,
    angle: 0,
    speed: 0
}

function clearScreen(){
    context.fillStyle = "green";
    context.fillRect(0, 0, SWIDTH, SHEIGHT);
}

function movePlayer(){
    player.x += Math.cos(player.angle) * player.speed
    player.y += Math.sin(player.angle) * player.speed
}

function getRays(){
    return []
}
function renderScene(rays){}
function renderMinimap(posX = 0, posY= 0, scale, rays){
    const cellSize = scale * CELL_SIZE;
    map.forEach((row, y) =>{
        row.forEach((cell, x) =>{
            if(cell){
                context.fillStyle = "gray"
                context.fillRect(posX + x * cellSize, posY + y * cellSize, cellSize, cellSize);
            }
        });
    });

    context.strokeStyle = COLORS.rays;
    rays.forEach(ray => {
        context.beginPath()
        context.moveTo(player.x * scale + posX, player.y * scale + posY)
        context.lineTo(
            (player.x + Math.cos(ray.angle) * ray.distance) * scale,
            (player.y + Math.sin(ray.angle) * ray.distance) * scale
        )
        context.closePath()
        context.stroke()
    })

    context.fillStyle="blue"
    context.fillRect(
        posX + player.x * scale - PLAYER_SIZE/2,
        posY + player.y * scale - PLAYER_SIZE/2,
        PLAYER_SIZE,
        PLAYER_SIZE
    )

    const rayLength = PLAYER_SIZE * 2;
    context.strokeStyle = "blue"
    context.beginPath()
    context.moveTo(player.x * scale + posX, player.y * scale + posY)
    context.lineTo(
        (player.x + Math.cos(player.angle) * rayLength) * scale,
        (player.y + Math.sin(player.angle) * rayLength) * scale,
    )
    context.closePath()
    context.stroke()
}

function gameLoop(){
    clearScreen();
    movePlayer();
    const rays = getRays();
    renderScene(rays);
    renderMinimap(0,0, 0.75, rays);
}

setInterval(gameLoop, TICK)

function toRadians(deg){
    return (deg * Math.PI) / 180;
}

document.addEventListener("keydown", (e) =>{
    if(e.key == "ArrowUp"){
        player.speed = 2;
    }
    if(e.key == "ArrowDown"){
        player.speed = -2;
    }
    if(e.key == "ArrowLeft"){
        player.angle -= toRadians(5);
    }
    if(e.key == "ArrowRight"){
        player.angle += toRadians(5);
    }
})

document.addEventListener("keyup", (e) =>{
    if(e.key == 'ArrowUp' || e.key == "ArrowDown"){
        player.speed = 0;
    }
    if(e.key =='ArrowLeft' || e.key =='ArrowRight'){
        player.angle = player.angle;
    }
})