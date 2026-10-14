const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 11;
const CELL_SIZE = 40;
const POINTS_PER_SHIP = 100;
const ALIEN_ROWS = 3;
const aliens = [];
const BASE_INTERVAL = 1000;
const SPEED_UP_SCORE = 300;

const field = document.querySelector("#field");

field.style.width = `${FIELD_WIDTH * CELL_SIZE}px`;
field.style.height = `${FIELD_HEIGHT * CELL_SIZE}px`;

const playerShip = document.createElement("div");
playerShip.classList.add("ship");

playerShip.style.width = `${CELL_SIZE}px`;
playerShip.style.height = `${CELL_SIZE}px`;

playerShip.style.backgroundColor = "purple";

field.appendChild(playerShip);

playerShip.style.top = `${(FIELD_HEIGHT - 1) * CELL_SIZE}px`;

let playerColumn = 3;
playerShip.style.left = `${playerColumn * CELL_SIZE}px`;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerColumn > 0) {
    playerColumn -= 1;
    updatePlayerPosition();
  }
  if (event.key === "ArrowRight" && playerColumn < FIELD_WIDTH - 1) {
    playerColumn += 1;
    updatePlayerPosition();
  }
  if (event.code === "Space") {
    fire();
  }
});

function updatePlayerPosition() {
  playerShip.style.left = `${playerColumn * CELL_SIZE}px`;
}

function fire() {
  let target = null;
  for (const alien of aliens) {
    if (parseInt(alien.style.left) / CELL_SIZE === playerColumn) {
      if (
        target === null ||
        parseInt(alien.style.top) > parseInt(target.style.top)
      ) {
        target = alien;
      }
    }
  }
  if (target !== null) {
    target.remove();
    aliens.splice(aliens.indexOf(target), 1);
    score += POINTS_PER_SHIP;
    scoreDisplay.textContent = score;
    if (score % SPEED_UP_SCORE === 0) {
        currentSpeed += 1;
        clearInterval(gameTimer);
        gameTimer = setInterval(moveAliensDown, BASE_INTERVAL / currentSpeed);
        speedDisplay.textContent = currentSpeed;
    }
    if (aliens.length === 0) {
        createAlienGrid();
    }
  }
}

function createAlien(column, row) {
  const alienShip = document.createElement("div");
  alienShip.classList.add("ship");
  alienShip.style.width = `${CELL_SIZE}px`;
  alienShip.style.height = `${CELL_SIZE}px`;
  alienShip.style.top = `${row * CELL_SIZE}px`;
  alienShip.style.left = `${column * CELL_SIZE}px`;
  alienShip.style.backgroundColor = "green";
  alienShip.style.border = "1px solid white";
  field.append(alienShip);
  return alienShip;
}

function createAlienGrid() {
  for (let column = 0; column < FIELD_WIDTH; column++) {
    for (let row = 0; row < ALIEN_ROWS; row++) {
      aliens.push(createAlien(column, row));
    }
  }
}
createAlienGrid();

let gameTimer;

function moveAliensDown() {
  for (const enemy of aliens) {
    enemy.style.top = `${parseInt(enemy.style.top) + CELL_SIZE}px`;
    if (
      parseInt(enemy.style.top) >=
      parseInt(playerShip.style.top) - CELL_SIZE
    ) {
      clearInterval(gameTimer);
    }
  }
}

const startBtn = document.querySelector("#start-btn");
const speedSelect = document.querySelector("#speed-select");
const speedDisplay = document.querySelector("#speed-display");
const scoreDisplay = document.querySelector("#score");
let score = 0;
let currentSpeed = 1;
startBtn.addEventListener("click", () => {
  try {
    const speed = Number(speedSelect.value);
    if (Number.isNaN(speed) || speed <= 0) {
      throw new Error("Invalid speed");
    }
    currentSpeed = speed;
    speedDisplay.textContent = speed;
    gameTimer = setInterval(moveAliensDown, BASE_INTERVAL / speed);
    startBtn.blur();
  } catch (error) {
    console.log(error.message);
  }
});
