const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 11;
const CELL_SIZE = 40;
const POINTS_PER_SHIP = 100;
const ALIEN_ROWS = 3;
const aliens = [];
const BASE_INTERVAL = 1000;
const SPEED_UP_SCORE = 10000;
const BEAM_WIDTH = 4;

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

function showBeam(topY) {
  const beam = document.createElement("div");
  beam.classList.add("ship");
  beam.style.width = `${BEAM_WIDTH}px`;
  beam.style.backgroundColor = "yellow";
  beam.style.left = `${playerColumn * CELL_SIZE + (CELL_SIZE - BEAM_WIDTH) / 2}px`;
  beam.style.top = `${topY}px`;
  beam.style.height = `${parseInt(playerShip.style.top) - topY}px`;
  field.append(beam);
  return beam;
}

function fire() {
    if (!isGameRunning) {
  return;
}
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

  let beamTop = 0;
  if (target !== null) {
    beamTop = parseInt(target.style.top);
  }

  const beam = showBeam(beamTop);
  setTimeout(() => {
    beam.remove();
  }, 150);

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
      clearInterval(gameTimer);
      isGameRunning = false;
      setTimeout(() => {
        alert("YOU WON! Congratulations!");
      }, 100);
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
  alienShip.style.boxSizing = "border-box";
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

function resetGame() {
  for (const alien of aliens) {
    alien.remove();
  }
  aliens.length = 0;
  score = 0;
  scoreDisplay.textContent = score;
  playerColumn = 3;
  updatePlayerPosition();
  createAlienGrid();
}

let gameTimer;
let isGameRunning = false;

function moveAliensDown() {
  for (const enemy of aliens) {
    enemy.style.top = `${parseInt(enemy.style.top) + CELL_SIZE}px`;
  }

  for (const enemy of aliens) {
    if (
      parseInt(enemy.style.top) >=
      parseInt(playerShip.style.top) - CELL_SIZE
    ) {
      clearInterval(gameTimer);
      isGameRunning = false;
      setTimeout(() => {
        alert("YOU LOSE! HA-HA-HA!");
      }, 100);
      return;
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
    resetGame();
    const speed = Number(speedSelect.value);
    if (Number.isNaN(speed) || speed <= 0) {
      throw new Error("Invalid speed");
    }
    currentSpeed = speed;
    speedDisplay.textContent = speed;
    isGameRunning = true;
    clearInterval(gameTimer);
    gameTimer = setInterval(moveAliensDown, BASE_INTERVAL / speed);
    startBtn.blur();
  } catch (error) {
    console.log(error.message);
  }
});
