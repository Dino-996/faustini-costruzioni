<template>
  <v-parallax :src="current" height="700" class="background-gradienty">
    <div class="ml-5 mr-5 d-flex flex-row flex-wrap fill-height justify-space-evenly align-center">

      <div>
        <v-img width="auto" max-width="250" src="../assets/logo.png" alt="logo"></v-img>
      </div>

      <div>
        <v-card elevation="0" color="transparent">
          <v-card-title class="ml-10 mr-10">
            <h1 :class="{ 'smTitle': mobile, 'dkTitle': true }">Faustini Costruzioni</h1>
          </v-card-title>
          <v-card-text class="ml-10 mr-10">
            <p :class="{ 'smText': mobile, 'dkText': true }">
              Qualità e avanguardia, i pilastri su cui costruiamo il tuo futuro.
            </p>
          </v-card-text>
          <v-card-actions class="ml-10 mr-10">
            <v-btn :class="{ 'smButton': mobile, 'dkButton': true }" append-icon="mdi-arrow-right" variant="elevated">
              Preventivo gratuito
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

    </div>
  </v-parallax>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { reactive, ref, onMounted } from 'vue';

const { mobile } = useDisplay();

let image = 0;
const images = reactive([
  { id: 0, src: 'src/assets/1.jpg' },
  { id: 1, src: 'src/assets/2.jpg' },
  { id: 2, src: 'src/assets/3.jpg' }
]);
const current = ref(images[0].src);

const changeImage = () => {
  image = (image + 1) % images.length;
  current.value = images[image].src;
}

onMounted(() => {
  setInterval(changeImage, 5000);
});
</script>

<style scoped>
h1 {
  font-size: 30px;
}

p {
  font-size: 18px;
}

.dkTitle {
  font-size: 36px !important;
  color: #FF9800;
}

.smTitle {
  font-size: 24px !important;
  color: #FF9800;
}

.dkText {
  font-size: 18px !important;
  color: #FFFFFF;
}

.dsText {
  font-size: 12px !important;
  color: #FFFFFF;
}

.dkButton {
  font-size: 16px !important;
}

.dsButton {
  font-size: 12px !important;
}

.background-gradient {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}
</style>
