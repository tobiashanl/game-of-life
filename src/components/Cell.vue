<template>
  <td
    :class="{ live: content === 1 }"
    @click="updateBoard"
    @mouseover="setHoveredCell({ rowIndex, colIndex })"
  ></td>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Cell",
  props: {
    rowIndex: {
      type: Number,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    content: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      bla: 1
    };
  },
  methods: {
    ...mapMutations(["setHoveredCell"]),
    ...mapActions(["updateBoard"])
  }
};
</script>

<style scoped>
td {
  width: 15px;
  height: 15px;
}
.live {
  background-color: black;
}
</style>
