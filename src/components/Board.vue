<template>
  <table class="board">
    <Row v-for="(row, index) in board" :key="index" :row="row" />
  </table>
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
    ...mapActions(["calculateNextBoard"])
  }
};
</script>

<style scoped>
.board {
  width: 2000px;
}
</style>
