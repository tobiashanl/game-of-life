<template>
  <td
    :class="{ live: content === 1 }"
    @mouseover="!isPlaying && setHoveredCell({ rowIndex, colIndex })"
  ></td>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Cell',
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
  computed: {
    ...mapState(['isPlaying'])
  },
  methods: {
    ...mapMutations(['setHoveredCell'])
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
