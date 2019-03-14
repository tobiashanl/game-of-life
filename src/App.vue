<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Game of Life</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content class="content">
      <Board />
    </v-content>
  </v-app>
</template>

<script>
import Board from "./components/Board.vue";

export default {
  name: "App",
  components: {
    Board
  }
};
</script>

<style>
.content {
  overflow-y: scroll;
}
</style>
