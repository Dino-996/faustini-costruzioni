<template>
  <v-container fluid :class="cardClass">
    <v-card class="mt-3 mb-3" elevation="0" color="transparent" :prepend-icon="props.icon">

      <v-card-subtitle class="text-subtitle-1 text-white">
        <h4>{{ props.subtitle.toUpperCase() }}</h4>
      </v-card-subtitle>

      <v-card-title class="text-blue-darken-2">
        {{ props.title }}
        <v-divider :thickness="5" color="black" class="w-25"></v-divider>
      </v-card-title>

      <v-card-text class="text-black">
        {{ props.text }}
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  title: { type: String, required: false, default: "Title" },
  subtitle: { type: String, required: false, default: "Subtitle" },
  text: { type: String, required: false, default: "Fenwick Demolition and Dirt are specialists in the hire of plant and equipment services in Newcastle and the Hunter Valley. Our full range of mine site services covers complete mine closures from earthmoving and demolition, recycling and scrap recovery through to land remediation and land rehabilitation Australia wide. We have an extensive fleet of plant and equipment and highly trained and qualified staff to ensure that you have a successful project completion." },
  icon: { type: String, required: false, default: "mdi-home text-black" },
  bgNumber: { type: String, required: false, default: "0" }
});

const cardClass = ref({
  '0': 'custom-card-1',
  '1': 'custom-card-2',
  '2': 'custom-card-3'
}[props.bgNumber.toString()]);

</script>

<style scoped>
.custom-card-1 {
  background-image: url('src/assets/bg1.png');
  background-size: cover;
  background-position: center;
  background-color: #FBC02D;
}

.custom-card-2 {
  background-image: url('src/assets/bg2.jpg');
  background-size: cover;
  background-position: center;
  background-color: #FBC02D;
}

.custom-card-3 {
  background-image: url('src/assets/bg3.jpg');
  background-size: cover;
  background-position: center;
  background-color: #FBC02D;
}
</style>
