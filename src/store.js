import Vue from "vue";
import Vuex from "vuex";
import { compose, nth, range, repeat, update } from "ramda";

Vue.use(Vuex);

const DEFAULT_TIMEOUT = 200;
const ROWS = 50;
const COLUMNS = 50;
const PATTERN_SINGLE = "single";
const PATTERN_BLOCK = "block";
export const PATTERNS = [
  { value: PATTERN_SINGLE, text: "Single" },
  { value: PATTERN_BLOCK, text: "Block" }
];

const getEmptyBoard = () => repeat(repeat(0, COLUMNS), ROWS);

const boardMappers = {
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
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    board: [],
    isPlaying: null,
    pattern: PATTERN_SINGLE,
    hoveredCell: {
      rowIndex: null,
      cellIndex: null
    }
  },
  getters: {
    getDisplayedBoard: state => {
      return state.isPlaying
        ? state.board
        : state.board.map(boardMappers[state.pattern](state.hoveredCell));
    },
    getLiveNeighborsForCell: state => (rowIndex, colIndex) => {
      const rowRange = range(rowIndex - 1, (rowIndex + 2) % ROWS);
      const colRange = range(colIndex - 1, (colIndex + 2) % COLUMNS);

      const count = rowRange.reduce(
        (acc, row) =>
          acc +
          colRange.reduce(
            (colAcc, col) => colAcc + nth(col, nth(row, state.board)),
            0
          ),
        0
      );
      return count - state.board[rowIndex][colIndex];
    }
  },
  mutations: {
    setBoard: (state, { board }) => {
      state.board = board;
    },
    setRandomBoard: state => {
      state.board = getEmptyBoard().map(row =>
        row.map(() => (Math.random() < 0.9 ? 0 : 1))
      );
    },
    clearBoard: state => {
      state.board = getEmptyBoard();
    },
    setIsPlaying: (state, { isPlaying }) => {
      state.isPlaying = isPlaying;
    },
    toggleCellState: (state, { rowIndex, colIndex }) => {
      if (state.isPlaying === null) {
        const oldValue = state.board[rowIndex][colIndex];
        Vue.set(state.board[rowIndex], colIndex, oldValue === 1 ? 0 : 1);
      }
    },
    setPattern: (state, { pattern }) => {
      state.pattern = pattern;
    },
    setHoveredCell: (state, { rowIndex, colIndex }) => {
      state.hoveredCell = { rowIndex, colIndex };
    }
  },
  actions: {
    calculateNextBoard: ({ state, getters, commit }) => {
      const board = getEmptyBoard().map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const neighbors = getters.getLiveNeighborsForCell(rowIndex, colIndex);

          if (state.board[rowIndex][colIndex] === 1) {
            return neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            return neighbors === 3 ? 1 : 0;
          }
        })
      );
      commit("setBoard", { board });
    },
    start: ({ commit, dispatch }) => {
      dispatch("calculateNextBoard");
      const timeoutId = setTimeout(() => {
        dispatch("calculateNextBoard");
        dispatch("start");
      }, DEFAULT_TIMEOUT);
      commit("setIsPlaying", { isPlaying: timeoutId });
    },
    stop: ({ state, commit }) => {
      clearTimeout(state.isPlaying);
      commit("setIsPlaying", { isPlaying: null });
    }
  }
});
