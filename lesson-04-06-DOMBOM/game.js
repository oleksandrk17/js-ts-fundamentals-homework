const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 11;
const CELL_SIZE = 40;
const POINTS_PER_SHIP = 100;
const ALIEN_ROWS = 3;
const aliens = [];
const BASE_INTERVAL = 1000;

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
  if (event.key === 'ArrowRight' && playerColumn < (FIELD_WIDTH - 1)) {
    playerColumn += 1;
    updatePlayerPosition();
  }
});

function updatePlayerPosition() {
  playerShip.style.left = `${playerColumn * CELL_SIZE}px`;
}

function createAlien (column, row) {
    const alienShip = document.createElement('div');
    alienShip.classList.add('ship');
    alienShip.style.width = `${CELL_SIZE}px`;
    alienShip.style.height = `${CELL_SIZE}px`;
    alienShip.style.top = `${row * CELL_SIZE}px`;
    alienShip.style.left = `${column * CELL_SIZE}px`;
    alienShip.style.backgroundColor = 'green';
    alienShip.style.border = '1px solid white';
    field.append(alienShip);
    return alienShip;
}

for (let column = 0; column < FIELD_WIDTH; column++) {
    for (let row = 0; row < ALIEN_ROWS; row++) {
        aliens.push(createAlien(column, row));
    }
}


let gameTimer;

function moveAliensDown() {
    for(const enemy of aliens) {
        enemy.style.top = `${parseInt(enemy.style.top) + CELL_SIZE}px`;
        if (parseInt(enemy.style.top) >= parseInt(playerShip.style.top) - CELL_SIZE) { 
            clearInterval(gameTimer);
        }
    }
}

// startBtn.addEventListener('click', gameTimer);

const startBtn = document.querySelector("#start-btn");
const speedSelect = document.querySelector("#speed-select");
startBtn.addEventListener('click', () => {
    const speed = Number(speedSelect.value);
    gameTimer = setInterval(moveAliensDown, BASE_INTERVAL / speed);
});



