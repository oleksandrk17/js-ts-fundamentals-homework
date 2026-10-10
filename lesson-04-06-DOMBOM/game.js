const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 11;
const CELL_SIZE = 40;
const POINTS_PER_SHIP = 100;

const field = document.querySelector('#field');

field.style.width = `${FIELD_WIDTH * CELL_SIZE}px`;
field.style.height = `${FIELD_HEIGHT * CELL_SIZE}px`;

const playerShip = document.createElement('div');
playerShip.classList.add('ship');

playerShip.style.width = `${CELL_SIZE}px`;
playerShip.style.height = `${CELL_SIZE}px`;

playerShip.style.backgroundColor = 'purple';

field.appendChild(playerShip);

playerShip.style.top = `${(FIELD_HEIGHT -1) * CELL_SIZE}px`;

let playerColumn = 3;
playerShip.style.left = `${playerColumn * CELL_SIZE}px`;