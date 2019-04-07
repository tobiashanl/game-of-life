import {compose, update} from 'ramda';

const PATTERN_ERASE = 'erase';
export const PATTERN_SINGLE = 'single';
const PATTERN_BLOCK = 'block';
const PATTERN_BLINKER = 'blinker';
const PATTERN_BEACON = 'beacon';
export const PATTERNS = [
  { value: PATTERN_ERASE, text: 'Eraser' },
  { value: PATTERN_SINGLE, text: 'Single' },
  { value: PATTERN_BLOCK, text: 'Block' },
  { value: PATTERN_BLINKER, text: 'Blinker' },
  { value: PATTERN_BEACON, text: 'Beacon' }
];

export const boardMappers = {
  [PATTERN_ERASE]: hoveredCell => (row, rowIndex) => {
    if (hoveredCell.rowIndex !== rowIndex) return row;
    return update(hoveredCell.colIndex, 0, row);
  },
  [PATTERN_SINGLE]: hoveredCell => (row, rowIndex) => {
    if (hoveredCell.rowIndex !== rowIndex) return row;
    return update(hoveredCell.colIndex, 1, row);
  },
  [PATTERN_BLOCK]: hoveredCell => (row, rowIndex) => {
    if (
      hoveredCell.rowIndex === rowIndex ||
      hoveredCell.rowIndex + 1 === rowIndex
    )
      return compose(
        update(hoveredCell.colIndex, 1),
        update(hoveredCell.colIndex + 1, 1)
      )(row);
    return row;
  },
  [PATTERN_BLINKER]: hoveredCell => (row, rowIndex) => {
    if (hoveredCell.rowIndex !== rowIndex) return row;
    return compose(
      update(hoveredCell.colIndex, 1),
      update(hoveredCell.colIndex + 1, 1),
      update(hoveredCell.colIndex + 2, 1)
    )(row);
  },
  [PATTERN_BEACON]: hoveredCell => (row, rowIndex) => {
    if (
      hoveredCell.rowIndex === rowIndex ||
      hoveredCell.rowIndex + 1 === rowIndex
    )
      return compose(
        update(hoveredCell.colIndex, 1),
        update(hoveredCell.colIndex + 1, 1)
      )(row);
    if (
      hoveredCell.rowIndex + 2 === rowIndex ||
      hoveredCell.rowIndex + 3 === rowIndex
    )
      return compose(
        update(hoveredCell.colIndex + 2, 1),
        update(hoveredCell.colIndex + 3, 1)
      )(row);
    return row;
  }
};
