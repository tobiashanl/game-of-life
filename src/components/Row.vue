<template>
  <tr>
    <td
      v-for="(col, index) in row"
      :key="index"
      :class="{ live: col === 1 }"
      @click="handleClick(index)"
    ></td>
  </tr>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Row",
  props: {
    row: {
      type: Array,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapMutations(["toggleCellState"]),
    handleClick(colIndex) {
      this.toggleCellState({ rowIndex: this.rowIndex, colIndex });
    }
  }
};
</script>

<style scoped>
td {
  width: 10px;
  height: 10px;
}
.live {
  background-color: black;
}
</style>
