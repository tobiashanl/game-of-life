<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Game of Life</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn flat icon v-on="on"><v-icon>add_circle</v-icon></v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(label, id) in patterns"
          :key="id"
          @click="placePattern({ pattern: id })"
        >
          <v-list-tile-title>{{ label }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
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
import { PATTERNS } from "../store";

export default {
  name: "Toolbar",
  data() {
    return {
      patterns: PATTERNS
    };
  },
  computed: {
    ...mapState(["isPlaying"])
  },
  methods: {
    ...mapMutations(["generateNewRandomBoard", "placePattern"]),
    ...mapActions(["start", "stop"])
  }
};
</script>
