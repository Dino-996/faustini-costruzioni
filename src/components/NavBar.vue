<template>
  <v-app-bar color="yellow-darken-2" density="comfortable" elevation="0" :scroll-behavior="mobile ? 'inverted hide':'inverted hide'" scroll-threshold="630">

    <template v-slot:prepend>
      <v-img width="45" height="45" src="../assets/logo.png"></v-img>
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-facebook" color="blue-darken-2"></v-btn>
      <v-btn icon="mdi-map" color="orange" class="mr-3"></v-btn>
      <v-btn prepend-icon="mdi-cellphone text-button" variant="tonal" color="blue-darken-2">Telefono</v-btn>
    </template>
  </v-app-bar>

</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();
</script>
