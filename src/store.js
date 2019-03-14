import Vue from "vue";
import Vuex from "vuex";
import { repeat } from "ramda";

Vue.use(Vuex);

const DEFAULT_TIMEOUT = 200;
const ROWS = 200;
const COLUMNS = 200;
const getEmptyBoard = () => repeat(repeat(0, COLUMNS), ROWS);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    board: [],
    timeoutId: null
  },
  getters: {
    getLiveNeighborsForCell: state => (row, col) => {
      let count = 0;

      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          if (!(r === 0 && c === 0)) {
            try {
              if (state.board[row + r][col + c] === 1) count++;
            } catch (e) {
              // ignore for now
            }
          }
        }
      }
      return count;
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
    setTimeoutId: (state, { timeoutId }) => {
      state.timeoutId = timeoutId;
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
      const timeoutId = setTimeout(() => {
        dispatch("calculateNextBoard");
        dispatch("start");
      }, DEFAULT_TIMEOUT);
      commit("setTimeoutId", { timeoutId });
    },
    stop: ({ state }) => {
      clearTimeout(state.timeoutId);
    }
  }
});
