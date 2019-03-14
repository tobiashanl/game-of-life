<template>
  <v-app>
    <Toolbar />
    <v-content class="content">
      <Board />
    </v-content>
  </v-app>
</template>

<script>
import Board from "./components/Board.vue";
import Toolbar from "./Toolbar";

export default {
  name: "App",
  components: {
    Toolbar,
    Board
  }
};
</script>

<style>
.content {
  overflow-y: scroll;
}
</style>
