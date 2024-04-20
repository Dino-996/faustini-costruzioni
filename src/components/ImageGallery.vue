<template>
  <v-parallax src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/background%2Fbg4.webp?alt=media&token=7a9b0b41-71ad-4193-9e20-c15bbd9c6f8d" lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/background%2Fbg4.webp?alt=media&token=7a9b0b41-71ad-4193-9e20-c15bbd9c6f8d" alt="ponteggio">

    <v-container>
      <div class="mt-5 justify-center align-center">
        <h2 class="text-orange">Progetti</h2>
        <v-divider :thickness="5" color="black" class="w-25"></v-divider>
      </div>
      <v-container fluid class="d-flex flex-wrap align-center justify-center">
        <div class="d-flex flex-wrap align-center justify-space-evenly">

          <v-card elevation="5" rounded="sm" color="transparent" class="ml-5 mt-2" v-for="image in images"
            :key="image.id">
            <v-img :src="image.fileimage" :lazy-src="image.fileimage" height="300" width="300" :alt="image.title"
              class="text-end align-end cursor-pointer" @click="selectImage(image)" @mouseover="isSelected(image)"
              @mouseout="imageSelected = !imageSelected" cover>
              <span v-if="imageSelected && isSelectedImage.id == image.id" style="pointer-events: none;">
                <v-btn append-icon="mdi-eye-outline">Scopri di pi&ugrave;</v-btn>
              </span>
            </v-img>
          </v-card>

          <v-overlay v-model="overlay" scroll-strategy="reposition" class="align-center justify-center">
            <v-card rounded="sm" color="yellow-darken-2" elevation="5" width="380" height="667" class="overflow-y-auto">

              <template v-slot:append>
                <v-btn color="blue-darken-2" icon="mdi-close" variant="text" rounded="sm"
                  @click.once="overlay = !overlay" />
              </template>

              <v-carousel :show-arrows="selectedImage.subfileimage.length > 1 ? 'hover' : false" hide-delimiters>
                <v-carousel-item v-for="(item, id) in selectedImage.subfileimage" :src="item" :key="id" cover>
                  <video v-if="item.endsWith('.mp4')" :src="item" autoplay muted loop></video>
                </v-carousel-item>
              </v-carousel>


              <template v-slot:prepend>
                <v-card-title class="text-blue-darken-2">
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
  { id: 0, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork2.webp?alt=media&token=1d1e429c-8cb0-468e-b86d-9876f7dc4931', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork2.webp?alt=media&token=1d1e429c-8cb0-468e-b86d-9876f7dc4931', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork3.webp?alt=media&token=cac204db-f424-46c8-9b94-ec888eb0bc74'], title: "Area Rupe", subtitle: "Vietri di Potenza (PZ)", text: "L'area Rupe nel centro storico di Vietri di Potenza rappresenta un importante patrimonio culturale e storico della città. L'intervento di riqualificazione ha l'obiettivo di valorizzare e riqualificare questa zona, conservando e valorizzando le sue caratteristiche architettoniche e storiche, nonché migliorando la qualità urbana e il benessere dei cittadini." },
  { id: 1, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork1.webp?alt=media&token=293e5dac-8bdb-4737-8519-ed6e12a8a8a9', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork1.webp?alt=media&token=293e5dac-8bdb-4737-8519-ed6e12a8a8a9', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork4.webp?alt=media&token=71e9cc4a-530c-4562-98cb-5e12759c6d62', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork5.webp?alt=media&token=16516fc9-df21-48fa-ac43-afd6d7af4e89'], title: "Teatro Cecilia", subtitle: "Tito (PZ)", text: "Il Teatro Cecilia di Tito è un edificio storico situato in provincia di Potenza. Considerato il suo valore culturale e storico, l'obiettivo dell'intervento di efficientamento energetico è stato quello di migliorare la performance energetica dell'edificio riducendo consumi e emissioni, senza compromettere l'integrità architettonica e storica dell'immobile." },
  { id: 2, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496'], title: "Risanamento locale", subtitle: "Viadotto S.Venere I e II R.A n.5 Sicignano-Potenza", text: "Abbiamo eseguito interventi di risanamento locale delle strutture del Viadotto S.Venere I e II R.A n.5 sulla tratta Sicignano-Potenza. Il nostro team di esperti ha effettuato un'analisi dettagliata delle condizioni strutturali del viadotto, identificando le aree critiche e i punti di degrado. Attraverso l'applicazione di tecniche e materiali avanzati, abbiamo proceduto con interventi mirati di ripristino e consolidamento delle strutture, garantendo la sicurezza, la durabilità e l'integrità del viadotto." },
  { id: 3, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork7.webp?alt=media&token=3ff0bdc1-8f3e-4514-8ca1-c7bf815a4a27', subfileimage: ['../assets/faustini.mp4', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork7.webp?alt=media&token=3ff0bdc1-8f3e-4514-8ca1-c7bf815a4a27', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork8.webp?alt=media&token=0954a9a4-7f20-4bda-8fb0-646523ffff77'], title: "Galleria San Nicola", subtitle: "SS 658 Potenza-Melfi", text: "Abbiamo realizzato interventi di manutenzione straordinaria per il rivestimento e il ripristino corticale della galleria San Nicola sulla SS 658 Potenza-Melfi. Il nostro team di professionisti ha lavorato con precisione e competenza, applicando materiali di alta qualità per risolvere problemi di usura, deterioramento e degrado delle superfici interne della galleria. La nostra esperienza e professionalità hanno permesso di completare i lavori nel rispetto dei tempi di realizzazione e delle normative vigenti, assicurando la conservazione e la manutenzione ottimale delle infrastrutture stradali." },
  { id: 4, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FviadottoSicignanoPotenza%2Fwork9.webp?alt=media&token=7a1c859c-f2cf-4b5c-a7b4-d4a8a0977ea2', subfileimage: ['../assets/viadotto.mp4', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FviadottoSicignanoPotenza%2Fwork9.webp?alt=media&token=7a1c859c-f2cf-4b5c-a7b4-d4a8a0977ea2'], title: "Viadotto autostradale", subtitle: "Raccordo autostradale Sicignano - Potenza", text: "Il ripristino con malta tixotropica delle pile di viadotti sul raccordo autostradale Sicignano - Potenza ha permesso di riparare e rinforzare le strutture danneggiate, garantendo la sicurezza e la durabilità delle pile nel tempo. Attraverso l'applicazione di soluzioni tecnologicamente avanzate e l'utilizzo di materiali di alta qualità, abbiamo contribuito a prolungare la vita utile dei viadotti, minimizzando i rischi di cedimenti strutturali e garantendo la continuità e l'efficienza del collegamento autostradale tra la Campania e la Basilicata." },
  { id: 5, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork11.webp?alt=media&token=a646fbd0-808d-4793-994f-25d6d7ab3071', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork10.webp?alt=media&token=3a79cd61-216f-4dc5-8ab2-23b635658046', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork11.webp?alt=media&token=a646fbd0-808d-4793-994f-25d6d7ab3071'], title: "Ripristino facciate", subtitle: "Vietri di Potenza (PZ)", text: "Il ripristino facciate dell'edificio restituisce all'immobile un aspetto estetico rinnovato e valorizzato, migliorando la sua integrità architettonica e preservando il suo valore storico e patrimoniale. Grazie all'applicazione di soluzioni tecniche appropriate e all'utilizzo di materiali di alta qualità, l'edificio risplende in una nuova veste, riaffermando la sua presenza nel contesto urbano e contribuendo a valorizzare l'ambiente circostante." },
  { id: 6, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork12.webp?alt=media&token=a96b3a53-00fb-4bc1-9989-d223081f036f', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork13.webp?alt=media&token=eb276be0-e149-447a-b376-3526a23eceeb','https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork12.webp?alt=media&token=a96b3a53-00fb-4bc1-9989-d223081f036f'], title: "Idrodemolizione", subtitle: "", text: "" },
]);
</script>

<style>
@media screen and (max-width: 376px) {
  .scrollable{
    height: 650px !important;
    overflow-y: auto !important;
  }
}
</style>
