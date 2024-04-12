<template>
  <v-container fluid>
    <div class="d-flex align-center justify-center mb-5 text-subtitle-1 text-h4 text-grey-darken-1">
      Partner
    </div>
    <div class="d-flex flex-wrap align-center justify-space-evenly">
      <div @mouseout="grayscaleImage(1)">
        <v-img ref="img1" src="https://www.fenwickdemolitionanddirt.com.au/wp-content/uploads/elementor/thumbs/phlogo-osl5sbrdiq4r2trlwbfx6id3i1638ywf4etdah4jqa.png" width="120" height="60"></v-img>
      </div>
      <div @mouseout="grayscaleImage(2)">
        <v-img ref="img2" src="https://www.fenwickdemolitionanddirt.com.au/wp-content/uploads/elementor/thumbs/logo-osl5pcls3y0h3rmt45od0bj88c8h2lwxw6kjq4utp8.png" width="120" height="60"></v-img>
      </div>
      <div @mouseout="grayscaleImage(3)">
        <v-img ref="img3" src="https://www.fenwickdemolitionanddirt.com.au/wp-content/uploads/elementor/thumbs/Hazmat_CMYK-osl5r9804znkxkv0o0opkiijshtucxaeg7y8hey1ka.jpg" width="120" height="60"></v-img>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';

const img1: Ref<HTMLImageElement | null> = ref(null);
const img2: Ref<HTMLImageElement | null> = ref(null);
const img3: Ref<HTMLImageElement | null> = ref(null);

const grayscaleImage = (imgNum: number) => {
  const imgRef = getImgRef(imgNum);
  if (imgRef) {
    imgRef.style.filter = 'grayscale(100%)';
  }
};

const getImgRef = (imgNum: number): HTMLImageElement | null => {
  switch (imgNum) {
    case 1:
      return img1.value;
    case 2:
      return img2.value;
    case 3:
      return img3.value;
    default:
      return null;
  }
};
</script>

<style scoped>
</style>
