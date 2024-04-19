<template>
  <v-carousel height="650" @mouseover="cycle = false" @mouseout="cycle = true" :cycle="cycle" :show-arrows="false"
    delimiter-icon="mdi-square" hide-delimiter-background>
    <v-carousel-item v-for="slide in slides" :key="slide.id" :src="slide.src" :alt="slide.title" cover>
      <div class="d-flex flex-wrap fill-height fill-width justify-space-evenly align-center image-overlay">
        <v-card color="transparent" rounded="sm" max-width="600" elevation="0">
          <template v-slot:prepend>
            {{ slide.emoji }}
          </template>
          <v-card-title class="text-orange">
            <h2 class="text-wrap">{{ slide.title }}</h2>
            <v-divider :thickness="5" color="white" class="w-25"></v-divider>
          </v-card-title>
          <v-card-text class="text-white">
            {{ slide.text }}
          </v-card-text>
          <v-card-actions class="d-flex justify-end mr-3">
            <v-btn @click="scrollTo" variant="elevated" append-icon="mdi-arrow-down" rounded="sm">{{ slide.button }}</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-carousel-item>
  </v-carousel>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const cycle = ref(true);

function scrollTo() {
  window.scroll({ top: 10000, left: 0, behavior: 'smooth' });
}

const slides = reactive([
  { id: 0, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FcostruzioniGenerali.webp?alt=media&token=73fd9d18-5e91-4b24-a473-03711d49a5d2", emoji: "🏗", title: "Costruzioni Generali", text: "La nostra esperienza si estende alla cura di ogni tipo di edificio, pubblico o privato. Con un occhio attento all’innovazione, ci dedichiamo alla manutenzione, ristrutturazione e all’aggiornamento energetico e sismico, perché ogni costruzione possa essere un sicuro rifugio nel presente e un solido patrimonio per il domani.", button: "Contattaci" },
  { id: 1, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FlavoriStradali.webp?alt=media&token=ce87be66-0e3a-435b-9b05-f3f10265fa0c", emoji: "🔨", title: "Lavori Edili e Stradali", text: "Le arterie della nostra comunità, le strade, richiedono una manutenzione che va oltre il semplice intervento. Noi ci occupiamo della salute complessiva delle infrastrutture stradali, dalla manutenzione di pile e viadotti alla gestione delle acque, fino alla realizzazione di scavi e sistemi di canalizzazione, assicurando così fluidità e sicurezza al flusso vitale della circolazione quotidiana.", button: "Contattaci" },
  { id: 2, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe", emoji: "💦🚧", title: "Idrodemolizioni", text: "Immaginate una tecnologia all’avanguardia che, con la forza purificatrice dell’acqua, riesce a cancellare i segni del tempo dal calcestruzzo, restituendo vigore e stabilità alle infrastrutture che incorniciano la nostra vita quotidiana. Ponti, viadotti e gallerie rinascono sotto l’azione mirata e potente dell’idrodemolizione.", button: "Contattaci" },
  { id: 3, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Frestauro.webp?alt=media&token=989ba4d7-3016-440e-997e-a89aa98b5b67", emoji: "🛠️", title: "Restauro Conservativo", text: "Ogni edificio ha una storia da raccontare, e il nostro intervento conservativo ne è il narratore fedele. Con maestria e rispetto, lavoriamo per preservare l’essenza estetica degli edifici, rinforzando le loro ossature e garantendo che il passato possa dialogare con il futuro.", button: "Contattaci" },
  { id: 4, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496", emoji: "🚚", title: "Noleggio Ponteggi e Attrezzature", text: "Offriamo un servizio di noleggio professionale di ponteggi e attrezzature per lavori di costruzione, ristrutturazione e manutenzione. Con una vasta gamma di attrezzature di alta qualità e conformi alle normative di sicurezza, garantiamo soluzioni su misura per ogni tipo di esigenza, dalla piccola ristrutturazione domestica ai grandi cantieri edili.", button: "Contattaci" },
]);
</script>

<style scoped>
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}
</style>
