<template>
  <table class="board" @click="updateBoard">
    <Row
      v-for="(row, index) in board"
      :key="index"
      :row="row"
      :row-index="index"
    />
  </table>
</template>

<script>
import Row from './Row.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Board',
  components: {
    Row
  },
  computed: {
    ...mapGetters({ board: 'getDisplayedBoard' })
  },
  mounted() {
    this.setRandomBoard();
  },
  methods: {
    ...mapMutations(['setRandomBoard']),
    ...mapActions(['calculateNextBoard', 'updateBoard'])
  }
};
</script>

<style scoped>
.board {
  width: 1500px;
}
</style>
