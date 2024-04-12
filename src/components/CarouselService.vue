<template>
  <v-carousel height="650" cycle :show-arrows="false" hide-delimiters>
    <v-carousel-item v-for="slide in slides" :key="slide.id" :src="slide.src" cover>
      <div class="d-flex flex-wrap fill-height fill-width justify-space-evenly align-center image-overlay">
        <v-card color="transparent" rounded="sm" max-width="600" elevation="0">
          <v-card-title class="text-orange">
            <h2>{{ slide.title }}</h2>
          </v-card-title>
          <v-card-text class="text-white">
            {{ slide.text }}
          </v-card-text>
        </v-card>
        <card-action :title="slide.emoji" :subtitle="slide.title" :text="slide.text" :button="slide.button"
          icon-button="mdi-arrow-right" :src="slide.src" />
      </div>
    </v-carousel-item>
  </v-carousel>

</template>

<script lang="ts" setup>
import CardAction from './CardAction.vue';
import { useDisplay } from 'vuetify';
import { reactive, onMounted } from 'vue';

const { mobile } = useDisplay();

const slides = reactive([
  { id: 0, src: "src/assets/1.jpg", emoji: "🏗", title: "Costruzioni Generali", text: "Realizziamo costruzioni solide e durevoli, garantendo la massima qualità in ogni dettaglio. Dalla progettazione alla realizzazione, ci prendiamo cura di ogni fase per costruire la casa dei tuoi sogni.", button: "Vai al servizio" },
  { id: 1, src: "src/assets/3.jpg", emoji: "🔨", title: "Lavori Edili e Stradali", text: "Offriamo una vasta gamma di servizi edili e stradali, dall'asfaltatura alla creazione di nuove infrastrutture. La nostra esperienza e professionalità assicurano lavori di alta qualità e sicurezza.", button: "Vai al servizio" },
  { id: 2, src: "src/assets/2.jpg", emoji: "💦", title: "Idrodemolizioni", text: "Utilizziamo tecnologie avanzate di idrodemolizione per rimuovere in modo preciso e sicuro calcestruzzo e materiali resistenti. Questo metodo eco-friendly garantisce risultati ottimali senza danneggiare le strutture circostanti.", button: "Vai al servizio" },
]);

onMounted(() => {
  console.log(mobile.value)
})
</script>

<style scoped>
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

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}
</style>
