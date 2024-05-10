<template>
  <v-skeleton-loader rounded="sm" :loading="loading" type="card, list-item-two-line, button" color="transparent">
    <v-carousel height="830" @mouseover="cycle = false" @mouseout="cycle = true" :cycle="cycle" :show-arrows="false"
      delimiter-icon="mdi-circle" interval="5000" hide-delimiter-background>
      <v-carousel-item v-for="slide in slides" :key="slide.id" :src="slide.src" :alt="slide.title" color="black" cover>
        <div class="d-flex flex-wrap fill-height fill-width justify-center align-center image-overlay">
          <v-card color="transparent" rounded="sm" max-width="600" elevation="0">
            <template v-slot:prepend>
              <v-img width="auto" max-width="150"
                src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
                lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
                class="mt-5" alt="logo faustini costruzioni srl"></v-img>
            </template>
            <v-card-title class="text-h4 text-orange">
              <span class="text-wrap">Faustini Costruzioni</span>
              <v-divider :thickness="5" color="white" class="w-25"></v-divider>
            </v-card-title>
            <v-card-text class="font-weight-bold text-body-1 text-white">
              Qualità e avanguardia, i pilastri su cui costruiamo il tuo futuro.
            </v-card-text>
            <v-card-actions class="d-flex justify-end mr-3">
              <v-btn @click="scroll('services')" variant="elevated" append-icon="mdi-chevron-down">Preventivo
                gratuito</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-skeleton-loader>
</template>

<script lang="ts" setup>
import { reactive, computed, Ref, ref, onMounted } from 'vue';
import { useGoTo } from 'vuetify';

const cycle: Ref<boolean> = ref(true);
const goTo = useGoTo();
const loading: Ref<boolean> = ref(true);

const options = computed(() => ({
  duration: 8000,
  easing: 'easeInOutCubic',
  offset: 0,
}));

const scroll = (id: string): void => {
  goTo('#' + id, options.value);
};

const slides = reactive([
  { id: 0, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FcostruzioniGenerali.webp?alt=media&token=73fd9d18-5e91-4b24-a473-03711d49a5d2" },
  { id: 1, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FlavoriStradali.webp?alt=media&token=ce87be66-0e3a-435b-9b05-f3f10265fa0c" },
  { id: 2, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe" },
  { id: 3, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Frestauro.webp?alt=media&token=989ba4d7-3016-440e-997e-a89aa98b5b67" },
  { id: 4, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fponteggio.webp?alt=media&token=0b422240-f08e-432b-8ebc-af40e2ff7582" },
]);

onMounted(() => {
  setTimeout(() => loading.value = false, 3000);
});
</script>
