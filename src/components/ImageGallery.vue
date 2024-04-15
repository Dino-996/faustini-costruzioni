<template>
  <v-parallax src="/src/assets/bg4.jpg">

    <v-container>
      <div class="mt-5 justify-center align-center">
        <h2 class="text-orange">Progetti</h2>
        <v-divider :thickness="5" color="black" class="w-25"></v-divider>
      </div>
      <v-container fluid class="d-flex flex-wrap align-center justify-center">
        <div class="d-flex flex-wrap align-center justify-space-evenly">

          <v-card elevation="5" rounded="sm" color="transparent" class="ml-5 mt-2" v-for="image in images"
            :key="image.id">
            <v-img :src="image.fileimage" :lazy-src="image.fileimage" height="300" width="300"
              class="text-end align-end cursor-pointer" @click="selectImage(image)" @mouseover="isSelected(image)"
              @mouseout="imageSelected = !imageSelected" cover>
              <span v-if="imageSelected && isSelectedImage.id == image.id" style="pointer-events: none;">
                <v-btn append-icon="mdi-cursor-default-click">Scopri di pi&ugrave;</v-btn>
              </span>
            </v-img>
          </v-card>

          <v-overlay v-model="overlay" scroll-strategy="reposition" class="align-center justify-center">
            <v-card rounded="sm" color="yellow-darken-2" elevation="5" height="auto" width="380px">
              <template v-slot:append>
                <v-btn color="blue-darken-2" icon="mdi-close" variant="text" rounded="xl"
                  @click.once="overlay = !overlay" />
              </template>

              <!--<v-img rounded="sm" :src="selectedImage.fileimage" width="auto"></v-img>-->

              <v-carousel show-arrows="hover" hide-delimiters>
                <v-carousel-item v-for="(image, id) in selectedImage.subfileimage" :key="id" :src="image"
                  cover></v-carousel-item>
              </v-carousel>


              <template v-slot:prepend>
                <v-card-title class="text-orange">
                  {{ selectedImage.title }}
                </v-card-title>
              </template>
              <v-card-subtitle class="mt-2">
                {{ selectedImage.subtitle }}
              </v-card-subtitle>
              <v-card-text>
                {{ selectedImage.text }}
              </v-card-text>
            </v-card>
          </v-overlay>
        </div>
      </v-container>
    </v-container>

  </v-parallax>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const overlay = ref(false);
const selectedImage = ref(null);
const isSelectedImage = ref(null);
const imageSelected = ref(false);

const isSelected = (image: null) => {
  isSelectedImage.value = image;
  imageSelected.value = true;
}

const selectImage = (image: null) => {
  selectedImage.value = image;
  overlay.value = true;
};

const images = reactive([
  { id: 1, fileimage: '/src/assets/work2.webp', subfileimage: ['/src/assets/work2.webp', '/src/assets/work3.webp'], title: "Area Rupe", subtitle: "Vietri di Potenza (PZ)", text: "L'area Rupe nel centro storico di Vietri di Potenza rappresenta un importante patrimonio culturale e storico della città. L'intervento di riqualificazione ha l'obiettivo di valorizzare e riqualificare questa zona, conservando e valorizzando le sue caratteristiche architettoniche e storiche, nonché migliorando la qualità urbana e il benessere dei cittadini." },
  { id: 2, fileimage: '/src/assets/work1.webp', subfileimage: ['/src/assets/work1.webp', '/src/assets/work4.webp', '/src/assets/work5.webp'], title: "Teatro Cecilia", subtitle: "Tito (PZ)", text: "Il Teatro Cecilia di Tito è un edificio storico situato in provincia di Potenza. Considerato il suo valore culturale e storico, l'obiettivo dell'intervento di efficientamento energetico è stato quello di migliorare la performance energetica dell'edificio riducendo consumi e emissioni, senza compromettere l'integrità architettonica e storica dell'immobile." },
  { id: 3, fileimage: '/src/assets/work6.webp', subfileimage: ['/src/assets/work6.webp'], title: "Title6", subtitle: "", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 4, fileimage: '/src/assets/work7.webp', subfileimage: ['/src/assets/work7.webp', '/src/assets/work8.webp'], title: "Title7", subtitle: "", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 5, fileimage: '/src/assets/work9.webp', subfileimage: ['/src/assets/viadotto.mp4', '/src/assets/work9.webp'], title: "Viadotto autostradale", subtitle: "Raccordo autostradale Sicignano - Potenza", text: "Il ripristino con malta tixotropica delle pile di viadotti sul raccordo autostradale Sicignano - Potenza ha permesso di riparare e rinforzare le strutture danneggiate, garantendo la sicurezza e la durabilità delle pile nel tempo. Attraverso l'applicazione di soluzioni tecnologicamente avanzate e l'utilizzo di materiali di alta qualità, abbiamo contribuito a prolungare la vita utile dei viadotti, minimizzando i rischi di cedimenti strutturali e garantendo la continuità e l'efficienza del collegamento autostradale tra la Campania e la Basilicata." },
  { id: 6, fileimage: '/src/assets/work11.webp', subfileimage: ['/src/assets/work10.webp', '/src/assets/work11.webp'], title: "Ripristino facciate", subtitle: "Vietri di Potenza (PZ)", text: "Il ripristino facciate dell'edificio restituisce all'immobile un aspetto estetico rinnovato e valorizzato, migliorando la sua integrità architettonica e preservando il suo valore storico e patrimoniale. Grazie all'applicazione di soluzioni tecniche appropriate e all'utilizzo di materiali di alta qualità, l'edificio risplende in una nuova veste, riaffermando la sua presenza nel contesto urbano e contribuendo a valorizzare l'ambiente circostante." },
]);
</script>
