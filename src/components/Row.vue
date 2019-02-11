<template>
  <tr>
    <td
      v-for="(col, index) in row"
      :key="index"
      :class="{ live: col === 1 }"
    ></td>
  </tr>
</template>

<script>
export default {
  name: "Row",
  props: ["row"]
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
