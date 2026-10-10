const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 11;
const CELL_SIZE = 40;
const POINTS_PER_SHIP = 100;

const field = document.querySelector('#field');

field.style.width = `${FIELD_WIDTH * CELL_SIZE}px`;
field.style.height = `${FIELD_HEIGHT * CELL_SIZE}px`;