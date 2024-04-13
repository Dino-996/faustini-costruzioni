<template>
  <v-card rounded="sm" class="ml-5 mr-5 mb-5" width="300" elevation="0" color="yellow-darken-2">
    <v-img max-height="250" max-width="450" :src="props.src" cover></v-img>

    <v-card-title class="text-orange">
      {{ props.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ props.subtitle }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn :append-icon="props.iconButton" variant="elevated">
        {{ props.button }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: { type: String, require: true, default: "title" },
  subtitle: { type: String, require: true, default: "subtitle" },
  text: { type: String, require: true, default: "text" },
  button: { type: String, require: true, default: "button" },
  iconButton: {type: String, require: true, default: "mdi-home"},
  src: { type: String, require: true, default: "src/assets/1.jpg" },
});
</script>
