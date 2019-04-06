<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Game of Life</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-select
      v-model="selectedPattern"
      :items="patterns"
      class="pattern-selector"
    />
    <v-btn flat icon @click="clearBoard">
      <v-icon>clear</v-icon>
    </v-btn>
    <v-btn flat icon @click="setRandomBoard">
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
    ...mapState(["isPlaying"]),
    selectedPattern: {
      get() {
        return this.$store.state.pattern;
      },
      set(pattern) {
        this.setPattern({ pattern });
      }
    }
  },
  methods: {
    ...mapMutations(["clearBoard", "setRandomBoard", "setPattern"]),
    ...mapActions(["start", "stop"])
  }
};
</script>

<style>
.pattern-selector {
  flex: none;
}
</style>
