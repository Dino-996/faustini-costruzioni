<template>
  <v-skeleton-loader rounded="sm" :loading="loading" type="list-item-two-line" color="transparent">

    <v-alert v-if="mobile && value != 500" :closable="true" rounded="sm" variant="tonal">

      <v-alert-title>
        <v-progress-circular :rotate="360" :size="50" :width="2" class="mr-3 text-subtitle-1" color="info"
          :model-value="value / 5">
          {{ value / 1000 }}
        </v-progress-circular>
        <span class="text-info text-subtitle-1">Scorri il dito sulle immagini per visualizzare tutti i servizi</span>
      </v-alert-title>
    </v-alert>

  </v-skeleton-loader>

  <v-window :show-arrows="!mobile">

    <template v-slot:prev="{ props }">
      <v-btn icon="mdi-chevron-left" color="blue-darken-2" rounded="sm" @click="props.onClick"></v-btn>
    </template>

    <template v-slot:next="{ props }">
      <v-btn icon="mdi-chevron-right" color="blue-darken-2" rounded="sm" @click="props.onClick"></v-btn>
    </template>

    <v-window-item v-for="card in cards" :key="card.id">

      <v-skeleton-loader rounded="sm" :loading="loading" type="card, list-item-two-line, button" color="transparent">
        <v-card color="yellow-darken-2" rounded="sm" class="mx-auto" width="100%">

          <v-img height="350px" :src="card.src" :lazy-src="card.src" cover></v-img>

          <v-card-title class="font-weight-bold text-orange-darken-2">
            {{ card.title }}
          </v-card-title>

          <v-card-subtitle class="text-wrap">
            {{ card.subtitle }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn @click="scroll('contact')" append-icon="mdi-arrow-down" variant="elevated" rounded="sm"
              color="blue-darken-2" text="Contatti">
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn rounded="sm" color="blue-darken-2" :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">

              <v-divider></v-divider>

              <v-card-text>
                {{ card.text }}
              </v-card-text>

            </div>
          </v-expand-transition>
        </v-card>
      </v-skeleton-loader>

    </v-window-item>

  </v-window>


</template>

<script lang="ts" setup>

import { useDisplay, useGoTo } from 'vuetify';
import { reactive, Ref, ref, onMounted, onBeforeMount, computed } from 'vue';

const { mobile } = useDisplay();
const goTo = useGoTo();
const value: Ref<number> = ref(0);
let interval: any = -1;

const options = computed(() => ({
  duration: 8000,
  easing: 'easeInOutCubic',
  offset: 0,
}));

const scroll = (id: string): void => {
  goTo('#' + id, options.value);
};

const show: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(true);
const cards = reactive([
  { id: 0, title: "Costruzioni Generali", subtitle: "Specializzati nella cura di edifici pubblici e privati, offriamo manutenzione, ristrutturazione e miglioramenti energetici e sismici per costruzioni sicure e durature", text: "La nostra esperienza si estende alla cura di ogni tipo di edificio, pubblico o privato. Con un occhio attento all’innovazione, ci dedichiamo alla manutenzione, ristrutturazione e all’aggiornamento energetico e sismico, perché ogni costruzione possa essere un sicuro rifugio nel presente e un solido patrimonio per il domani.", src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FcostruzioniGenerali.webp?alt=media&token=73fd9d18-5e91-4b24-a473-03711d49a5d2" },
  { id: 1, title: "Lavori Edili e Stradali", subtitle: "Curiamo la salute delle strade, gestendo la manutenzione di viadotti, acque e sistemi di canalizzazione per garantire una circolazione fluida e sicura della comunità", text: "Le arterie della nostra comunità, le strade, richiedono una manutenzione che va oltre il semplice intervento. Noi ci occupiamo della salute complessiva delle infrastrutture stradali, dalla manutenzione di pile e viadotti alla gestione delle acque, fino alla realizzazione di scavi e sistemi di canalizzazione, assicurando così fluidità e sicurezza al flusso vitale della circolazione quotidiana.", src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FlavoriStradali.webp?alt=media&token=ce87be66-0e3a-435b-9b05-f3f10265fa0c" },
  { id: 2, title: "Idrodemolizioni", subtitle: "Utilizziamo l'idrodemolizione per ripristinare ponti, viadotti e gallerie, eliminando i segni del tempo e rinnovando la stabilità delle infrastrutture essenziali", text: "Immaginate una tecnologia all’avanguardia che, con la forza purificatrice dell’acqua, riesce a cancellare i segni del tempo dal calcestruzzo, restituendo vigore e stabilità alle infrastrutture che incorniciano la nostra vita quotidiana. Ponti, viadotti e gallerie rinascono sotto l’azione mirata e potente dell’idrodemolizione.", src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe" },
  { id: 3, title: "Restauro Conservativo", subtitle: "Preserviamo la storia degli edifici attraverso interventi conservativi che rinforzano le ossature, mantenendo l'estetica originale e permettendo al passato di dialogare con il futuro", text: "Ogni edificio ha una storia da raccontare, e il nostro intervento conservativo ne è il narratore fedele. Con maestria e rispetto, lavoriamo per preservare l’essenza estetica degli edifici, rinforzando le loro ossature e garantendo che il passato possa dialogare con il futuro.", src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Frestauro.webp?alt=media&token=989ba4d7-3016-440e-997e-a89aa98b5b67" },
  { id: 4, title: "Noleggio Ponteggi e Attrezzature", subtitle: "Offriamo il noleggio di ponteggi e attrezzature", text: "Offriamo un servizio di noleggio professionale di ponteggi e attrezzature per lavori di costruzione, ristrutturazione e manutenzione. Con una vasta gamma di attrezzature di alta qualità e conformi alle normative di sicurezza, garantiamo soluzioni su misura per ogni tipo di esigenza, dalla piccola ristrutturazione domestica ai grandi cantieri edili.", src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fponteggio.webp?alt=media&token=0b422240-f08e-432b-8ebc-af40e2ff7582" },
]);

onMounted(() => {
  // Skeleton loader
  setTimeout(() => loading.value = false, 3000);
  // Timeout closed banner
  interval = setInterval(() => {
    if (value.value !== 500) {
      value.value += 10
    }
    return value.value;
  }, 1000);
});

onBeforeMount(() => {
  clearInterval(interval);
});

</script>
