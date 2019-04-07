import {propOr} from 'ramda';

const PATTERN_ERASE = 'erase';
export const PATTERN_SINGLE = 'single';
const PATTERN_BLOCK = 'block';
const PATTERN_BLINKER = 'blinker';
const PATTERN_BEACON = 'beacon';
const PATTERN_GLIDER = 'glider';
export const PATTERNS = [
  { value: PATTERN_ERASE, text: 'Eraser' },
  { value: PATTERN_SINGLE, text: 'Single' },
  { value: PATTERN_BLOCK, text: 'Block' },
  { value: PATTERN_BLINKER, text: 'Blinker' },
  { value: PATTERN_BEACON, text: 'Beacon' },
  { value: PATTERN_GLIDER, text: 'Glider' }
];

const PATTERN_DEFINITIONS = {
  [PATTERN_ERASE]: [[0]],
  [PATTERN_SINGLE]: [[1]],
  [PATTERN_BLOCK]: [[1, 1], [1, 1]],
  [PATTERN_BLINKER]: [[1, 1, 1]],
  [PATTERN_BEACON]: [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 0, 1, 1]],
  [PATTERN_GLIDER]: [[0, 1, 0], [0, 0, 1], [1, 1, 1]]
};

const updateRow = (mask, baseColIndex, row) =>
  mask
    ? row.map((cell, colIndex) => propOr(cell, colIndex - baseColIndex, mask))
    : row;

export const getBoardMapper = (pattern, hoveredCell) => (row, rowIndex) =>
  updateRow(
    PATTERN_DEFINITIONS[pattern][rowIndex - hoveredCell.rowIndex],
    hoveredCell.colIndex,
    row
  );
