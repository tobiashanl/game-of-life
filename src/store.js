import Vue from 'vue';
import Vuex from 'vuex';
import { nth, range, repeat } from 'ramda';
import { boardMappers, PATTERN_SINGLE } from './utils/patterns';

Vue.use(Vuex);

const DEFAULT_TIMEOUT = 200;
const ROWS = 100;
const COLUMNS = 100;

const getEmptyBoard = () => repeat(repeat(0, COLUMNS), ROWS);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
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
      const rowRange = range(rowIndex - 1, rowIndex + 2).map(
        rowIndex => rowIndex % ROWS
      );
      const colRange = range(colIndex - 1, colIndex + 2).map(
        colIndex => colIndex % COLUMNS
      );

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
    setPattern: (state, { pattern }) => {
      state.pattern = pattern;
    },
    setHoveredCell: (state, { rowIndex, colIndex }) => {
      state.hoveredCell = { rowIndex, colIndex };
    }
  },
  actions: {
    updateBoard: ({ getters, commit }) => {
      commit('setBoard', { board: getters.getDisplayedBoard });
    },
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
      commit('setBoard', { board });
    },
    start: ({ commit, dispatch }) => {
      dispatch('calculateNextBoard');
      const timeoutId = setInterval(() => {
        dispatch('calculateNextBoard');
      }, DEFAULT_TIMEOUT);
      commit('setIsPlaying', { isPlaying: timeoutId });
    },
    stop: ({ state, commit }) => {
      clearInterval(state.isPlaying);
      commit('setIsPlaying', { isPlaying: null });
    }
  }
});
