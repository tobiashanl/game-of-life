<template>
  <tr>
    <Cell
      v-for="(cellContent, colIndex) in row"
      :key="colIndex"
      :row-index="rowIndex"
      :content="cellContent"
      :col-index="colIndex"
    />
  </tr>
</template>

<script>
import Cell from './Cell';

export default {
  name: 'Row',
  components: {
    Cell
  },
  props: {
    row: {
      type: Array,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  }
};
</script>
