<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Game of Life</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat icon @click="generateNewRandomBoard">
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-btn v-if="!isPlaying" flat icon @click="start">
      <v-icon>play_arrow</v-icon>
    </v-btn>
    <v-btn v-else flat icon @click="stop">
      <v-icon>stop</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Toolbar",
  computed: {
    ...mapState(["isPlaying"])
  },
  methods: {
    ...mapMutations(["generateNewRandomBoard"]),
    ...mapActions(["start", "stop"])
  }
};
</script>
