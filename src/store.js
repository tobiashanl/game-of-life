import Vue from "vue";
import Vuex from "vuex";
import {compose, nth, range, repeat, update} from "ramda";

Vue.use(Vuex);

const DEFAULT_TIMEOUT = 200;
const ROWS = 100;
const COLUMNS = 100;
export const PATTERNS = {
  single: "Single",
  block: "Block",
  beehive: "Beehive",
  blinker: "Blinker"
};
const getEmptyBoard = () => repeat(repeat(0, COLUMNS), ROWS);

const boardMappers = {
  single: hoveredCell => (row, rowIndex) => {
    if (hoveredCell.rowIndex !== rowIndex) return row;
    return update(hoveredCell.colIndex, 1, row);
  },
  block: hoveredCell => (row, rowIndex) => {
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
    pattern: "single",
    hoveredCell: {
      rowIndex: null,
      cellIndex: null
    }
  },
  getters: {
    getDisplayedBoard: state => {
      return state.board.map(boardMappers[state.pattern](state.hoveredCell));
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
    generateNewRandomBoard: state => {
      state.board = getEmptyBoard().map(row =>
        row.map(() => (Math.random() < 0.9 ? 0 : 1))
      );
    },
    updateBoard: (state, { board }) => {
      state.board = board;
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
    placePattern: (state, { pattern }) => {
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
      commit("updateBoard", { board });
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
