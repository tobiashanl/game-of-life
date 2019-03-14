<template>
  <div class="board">
    <v-btn @click="generateNewRandomBoard">Generate new board</v-btn>
    <v-btn @click="start">Start</v-btn>
    <v-btn @click="stop">Stop</v-btn>
    <table>
      <Row v-for="(row, index) in board" :key="index" :row="row" />
    </table>
  </div>
</template>

<script>
import Row from "./Row.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Board",
  components: {
    Row
  },
  computed: {
    ...mapState(["board"])
  },
  mounted() {
    this.generateNewRandomBoard();
  },
  methods: {
    ...mapMutations(["generateNewRandomBoard", "updateBoard"]),
    ...mapActions(["calculateNextBoard", "start", "stop"])
  }
};
</script>

<style scoped>
.board {
  width: 2000px;
}
</style>
