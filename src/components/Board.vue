<template>
  <div>
    <button @click="updateBoard">Generate new board</button>
    <table>
      <row v-for="(row, index) in board" :key="index" :row="row"/>
    </table>
  </div>
</template>

<script>
import Row from "./Row.vue";

export default {
  name: "Board",
  components: {
    Row
  },
  data() {
    return {
      board: this.generateBoard(),
    };
  },
  methods: {
    updateBoard() {
      this.board = this.generateBoard();
    },
    generateBoard() {
      const board = [];
      for (let i = 0; i < 200; i++) {
        const row = [];
        for (let j = 0; j < 200; j++) {
          row.push(Math.random() < 0.95 ? 0 : 1);
        }
        board.push(row);
      }
      return board;
    }
  }
};
</script>

<style scoped>
div {
    width: 2000px;
}
</style>
