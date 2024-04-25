<template>
  <v-container fluid :class="cardClass">

    <v-skeleton-loader rounded="sm" :loading="loading" type="card, list-item-two-line, button" color="transparent">
    <v-card class="mt-3 mb-3" elevation="0" color="transparent" :prepend-icon="props.icon">

      <v-card-subtitle class="text-subtitle-1 text-white">
        <span class="font-weight-bold">{{ props.subtitle.toUpperCase() }}</span>
      </v-card-subtitle>

      <v-card-title class="text-blue-darken-2 text-wrap">
        {{ props.title }}
        <v-divider :thickness="5" color="black" class="w-25"></v-divider>
      </v-card-title>

      <v-card-text class="text-black w-75">
        {{ props.text }}
      </v-card-text>

    </v-card>
  </v-skeleton-loader>

  </v-container>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';

const loading = ref(true);

const props = defineProps({
  title: { type: String, required: false, default: "Title" },
  subtitle: { type: String, required: false, default: "Subtitle" },
  text: { type: String, required: false, default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odio nisi deserunt expedita eligendi dolorem aperiam, at quam debitis perspiciatis ad illo ducimus. Qui ipsam officiis at. Voluptas, consectetur facere." },
  icon: { type: String, required: false, default: "mdi-home text-black" },
  bgNumber: { type: String, required: false, default: "0" }
});

const cardClass = ref({
  '0': 'custom-card-1',
  '1': 'custom-card-2',
  '2': 'custom-card-3'
}[props.bgNumber.toString()]);

onMounted(()=>{
  setTimeout(()=>loading.value = false, 3000);
});

</script>
