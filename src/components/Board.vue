<template>
  <div>
    <button @click="updateBoard">Generate new board</button>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <table>
      <Row v-for="(row, index) in board" :key="index" :row="row" />
    </table>
  </div>
</template>

<script>
import Row from "./Row.vue";

const ROWS = 200;
const COLUMNS = 200;

export default {
  name: "Board",
  components: {
    Row
  },
  data() {
    return {
      board: this.generateBoard(),
      timeoutId: null
    };
  },
  methods: {
    updateBoard() {
      this.board = this.generateBoard();
    },
    start() {
      this.timeoutId = setTimeout(() => {
        const newBoard = this.generateBoard();

        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLUMNS; c++) {
            const neighbors = this.countLiveNeighbors(r, c);

            if (this.board[r][c] === 1) {
              newBoard[r][c] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
              newBoard[r][c] = neighbors === 3 ? 1 : 0;
            }
          }
        }
        this.board = newBoard;
        this.start();
      }, 200);
    },
    stop() {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    },
    generateBoard() {
      const board = [];
      for (let r = 0; r < ROWS; r++) {
        const row = [];
        for (let c = 0; c < COLUMNS; c++) {
          row.push(Math.random() < 0.9 ? 0 : 1);
        }
        board.push(row);
      }
      return board;
    },
    countLiveNeighbors(row, col) {
      let count = 0;

      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          if (!(r === 0 && c === 0)) {
            try {
              if (this.board[row + r][col + c] === 1) count++;
            } catch (e) {
              // ignore for now
            }
          }
        }
      }
      return count;
    }
  }
};
</script>

<style scoped>
div {
  width: 2000px;
}
</style>
