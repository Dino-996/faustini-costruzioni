<template>

  <v-app-bar color="yellow-darken-2" density="comfortable" elevation="0"
    :scroll-behavior="mobile ? 'inverted hide' : 'inverted hide'" scroll-threshold="630">

    <template v-slot:prepend>
      <v-img width="45" height="45" class="cursor-pointer"
        src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
        lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
        @click="scroll('top')" id="top" alt="logo faustini costruzioni srl"></v-img>
    </template>

    <template v-slot:append>
      <v-btn v-for="social in socials" :key="social.id" :icon="social.icon" variant="text"
        color="blue-darken-2" :href="social.link" target="_blank" class="mr-3"></v-btn>
      <v-btn prepend-icon="mdi-cellphone text-button" variant="outlined" color="blue-darken-2"
        href="tel:+393488107321">Telefono</v-btn>
    </template>

  </v-app-bar>

  <carousel-text />

  <text-card title="Faustini Costruzioni" subtitle="chi siamo" icon="mdi-account-hard-hat"
    text="Fondata nel 2008, questa impresa edile trae origine dalla fusione per incorporazione dell’impresa individuale di Rocco Macellaro, con sede in Corso Garibaldi 82, a Vietri di Potenza (PZ). L’azienda è impegnata nella realizzazione di opere edili e stradali, rivolgendosi sia al settore pubblico che a quello privato, con una particolare specializzazione nelle idrodemolizioni. Personale specializzato che opera in conformità alle normative in materia di sicurezza e salute sui luoghi di lavoro e nel rispetto dell'etica e dignità professionale. L’azienda dispone di attrezzature e macchine utili alla realizzazione dei lavori in modo efficiente e sicuro. Faustini Costruzioni Srl è regolarmente iscritta presso la Camera di Commercio, Industria, Artigianato e Agricoltura (CCIAA) di Potenza e detiene l’attestazione SOA per l’esecuzione di lavori pubblici, conformemente al Decreto del Presidente della Repubblica n. 207/2010, nelle categorie OG1, OG2 e OG3."
    bg-number="0" />

  <image-gallery />

  <text-card title="Tecnologie e Conservazione nell’Ingegneria Civile" subtitle="servizi" icon="mdi-ruler-square"
    text="L’idrodemolizione è una tecnica innovativa che utilizza l’acqua ad altissima pressione per rimuovere il calcestruzzo danneggiato, essenziale nel ripristino di infrastrutture come ponti e viadotti.
    Questo metodo si integra perfettamente con il restauro conservativo, il quale mira a preservare l’estetica degli edifici rinforzando elementi strutturali come fondamenta, travi e colonne.
    Parallelamente, i lavori stradali richiedono attenzione alla manutenzione di pile e viadotti, oltre alla gestione delle acque e all’installazione di condotti e tubazioni.
    La sinergia tra queste pratiche evidenzia un approccio olistico alla costruzione e al mantenimento dell’infrastruttura urbana, dove la tecnologia e il rispetto per il patrimonio storico si fondono per garantire sicurezza e bellezza nelle nostre città."
    bg-number="1" />

  <scroll-card />

  <form-contact />

  <v-footer color="yellow-darken-2" class="d-flex flex-column" id="contact">

    <v-row class="mt-3">

      <v-col>

        <v-card elevation="0" color="transparent">

          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>CONTATTI</h4>
          </v-card-subtitle>

          <div v-for="contact in contacts" :key="contact.id">

            <v-card-title class="text-blue-darken-2">
              {{ contact.title }}
              <v-divider :thickness="5" color="black" class="w-25"></v-divider>
            </v-card-title>

            <v-card-text class="d-flex justify-start align-start text-black">
              <v-icon :icon="contact.icon"></v-icon>
              <a class="ml-2" :href="contact.link" about="_blank" aria-label="Area dedicata ai contatti dell'impresa">{{
                contact.text }}</a>
            </v-card-text>

          </div>

        </v-card>

      </v-col>

      <v-col>
        <v-card elevation="0" color="transparent">

          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>NORME PRIVACY E COOKIE</h4>
          </v-card-subtitle>

          <div v-for="legal in legals" :key="legal.id">

            <v-card-title class="text-blue-darken-2">
              {{ legal.title }}
              <v-divider :thickness="5" color="black" class="w-25"></v-divider>
            </v-card-title>

            <v-card-text class="d-flex justify-start align-start text-black">
              <v-icon :icon="legal.icon"></v-icon>
              <a class="ml-2" :href="legal.link" target="_blank"
                aria-label="Area dedicata alla consultazione delle Policy">{{
                  legal.text }}</a>
            </v-card-text>
          </div>

        </v-card>
      </v-col>

      <v-col>
        <v-card elevation="0" color="transparent">

          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>SOCIAL NETWORK</h4>
          </v-card-subtitle>

          <div v-for="social in socials" :key="social.id">

            <v-card-title class="text-blue-darken-2">
              {{ social.title }}
              <v-divider :thickness="5" color="black" class="w-25"></v-divider>
            </v-card-title>

            <v-card-text class="d-flex justify-start align-start text-black">
              <v-icon :icon="social.icon"></v-icon>
              <a class="ml-2" :href="social.link" target="_blank"
                aria-label="Area dedicata alla consultazione dei Social Network">{{
                  social.title }}</a>
            </v-card-text>
          </div>

        </v-card>
      </v-col>

      <v-col>
        <v-card elevation="0" color="transparent">

          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>DOMANDE FREQUENTI</h4>
          </v-card-subtitle>

          <v-card-text v-for="faq in faqs" :key="faq.id">

            <v-expansion-panels>

              <v-expansion-panel elevation="0" bg-color="transparent">

                <v-expansion-panel-title class="align-center">
                  <v-icon class="mr-5">{{ faq.icon }}</v-icon>
                  <h4 class="text-blue-darken-2">{{ faq.request }}</h4>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  {{ faq.responde }}
                </v-expansion-panel-text>

              </v-expansion-panel>

            </v-expansion-panels>

            <v-divider :thickness="5" color="black" class="w-25"></v-divider>

          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

    <div>
      &copy; {{ new Date().getFullYear() }} • <strong>Faustini Costruzioni S.R.L</strong> • Corso Garibaldi, 82, 85058
      Vietri di Potenza PZ • P.IVA 01699410765 • URI PZ
      • REA 127800 • Designed by <v-icon>mdi-code-tags</v-icon> <a href="https://github.com/Dino-996"
        target="_blank">Dino-996</a>
    </div>

  </v-footer>

</template>


<script lang="ts" setup>
import TextCard from '../components/TextCard.vue';
import CarouselText from '../components/CarouselText.vue';
import ScrollCard from '../components/ScrollCard.vue';
import ImageGallery from '../components/ImageGallery.vue';
import FormContact from '../components/FormContact.vue';

import { useDisplay, useGoTo } from "vuetify";
import { ref, Ref, reactive, computed, onMounted } from "vue";

const { mobile } = useDisplay();
const goTo = useGoTo();

const isLoading: Ref<boolean> = ref(false);

onMounted(() => {
  setTimeout(() => isLoading.value = true, 3000);
});

const options = computed(() => ({
  duration: 8000,
  easing: 'easeInOutCubic',
  offset: 0,
}));

const scroll = (id: string) => {
  goTo('#' + id, options.value);
};

const socials = reactive([
  { id: 0, icon: "mdi-facebook text-blue-darken-2", title: "Facebook", link: "https://www.facebook.com/faustini.costruzioni.Srl.1/" },
  { id: 1, icon: "mdi-instagram text-blue-darken-2", title: "Instagram", link: "https://www.instagram.com/faustinicostruzioni/?igsh=MWI2ejNvN3ppOTA2dQ%3D%3D" },
  { id: 2, icon: "mdi-map text-blue-darken-2", title: "Google Maps", link: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x1339169b662e3187:0xdf1ebf67f980f6eb?source=g.page.m._" },
]);

const contacts = reactive([
  { id: 0, title: "Fisso", text: "0971 71 87 45", icon: "mdi-phone  text-blue-darken-2", link: "tel:+390971718745" },
  { id: 1, title: "Cellulare", text: "348 81 07 321", icon: "mdi-cellphone  text-blue-darken-2", link: "tel:+393488107321" },
  { id: 2, title: "Email", text: "faustini.costruzioni@gmail.com", icon: "mdi-email  text-blue-darken-2", link: "mailto:faustini.costruzioni@gmail.com" },
  { id: 3, title: "PEC", text: "faustini.costruzioni@pec.it", icon: "mdi-email-check  text-blue-darken-2", link: "mailto:faustini.costruzioni@pec.it" },
]);

const legals = reactive([
  { id: 0, title: "Privacy Policy", text: "Informativa privacy", link: "https://www.iubenda.com/privacy-policy/31752374", icon: "mdi-scale-balance  text-blue-darken-2" },
  { id: 1, title: "Cookie Policy", text: "Informativa cookie", link: "https://www.iubenda.com/privacy-policy/31752374/cookie-policy", icon: "mdi-cookie  text-blue-darken-2" },
]);

const faqs = reactive([
  { id: 0, request: "Dove offrite i vostri servizi?", responde: "Offriamo i nostri servizi in Basilicata e nelle regioni limitrofe.", icon: "mdi-numeric-1 text-blue-darken-2" },
  { id: 1, request: "Offrite preventivi gratuiti?", responde: "Certamente. Offriamo preventivi gratuiti per tutti i nostri servizi. Puoi contattarci attraverso il modulo di contatto sul nostro sito web, via email o telefonicamente per richiedere un preventivo personalizzato.", icon: "mdi-numeric-2 text-blue-darken-2" },
  { id: 2, request: "Siete un impresa qualificata?", responde: "Sì, siamo un'impresa qualificata con l'attestazione SOA in varie categorie, garantendo professionalità e competenza nei nostri servizi. ", icon: "mdi-numeric-3 text-blue-darken-2" },
  { id: 3, request: "In che modo la vostra tecnologia di idrodemolizione è superiore ai metodi tradizionali?", responde: "La nostra tecnologia di idrodemolizione ad alta pressione permette una rimozione precisa del calcestruzzo senza danneggiare la struttura d'acciaio sottostante, garantendo un intervento efficace e duraturo.", icon: "mdi-numeric-4 text-blue-darken-2" },
  { id: 4, request: "Quali garanzie offrite sui vostri lavori?", responde: "Offriamo garanzie sulla qualità e la durabilità dei nostri interventi. Inoltre, il nostro team di professionisti altamente qualificati assicura la massima precisione e attenzione ai dettagli in ogni lavoro.", icon: "mdi-numeric-5 text-blue-darken-2" },
]);
</script>
