const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = (canvas.height = 600);
const CANVAS_WIDTH = (canvas.width = 600);

const playerImage = new Image();
playerImage.src = "./image/shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrame = 5;
let playerState = "run";

const animationStates = [
  { name: "idle", frame: 7 },
  { name: "jump", frame: 7 },
  { name: "fall", frame: 7 },
  { name: "run", frame: 9 },
  { name: "dizzy", frame: 11 },
  { name: "sit", frame: 5 },
  { name: "roll", frame: 7 },
  { name: "bite", frame: 7 },
  { name: "ko", frame: 12 },
  { name: "getHit", frame: 4 },
];

document.getElementById("animations").addEventListener("change", (e) => {
  playerState = e.target.value;
});

const spriteAnimations = {};

animationStates.forEach((val, i) => {
  const frames = [];
  for (let j = 0; j < val.frame; j++) {
    frames.push({ x: spriteWidth * j, y: spriteHeight * i });
  }

  spriteAnimations[val.name] = { loc: frames };
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;

  let { x, y } = spriteAnimations[playerState].loc[position];

  ctx.drawImage(
    playerImage,
    x,
    y,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
