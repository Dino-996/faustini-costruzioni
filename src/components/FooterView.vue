<template>

  <v-footer color="yellow-darken-2" class="d-flex flex-column">

    <div class="mb-3">
      <v-btn v-for="social in socials" :key="social.id" :icon="social.icon" variant="text" rounded="sm"
        :href="social.link" target="_blank"></v-btn>
    </div>

    <v-row>

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
              <a class="ml-2" href="#" about="_blank" aria-label="Area dedicata alla consultazione delle Policy">{{ legal.text }}</a>
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
      &copy; {{ new Date().getFullYear() }} • <strong>Faustini Costruzioni S.r.l</strong> • P.IVA 01699410765 • URI PZ
      • REA 127800
    </div>

  </v-footer>

</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const socials = reactive([
  { id: 0, icon: "mdi-facebook", link: "https://www.facebook.com/faustini.costruzioni.Srl.1/" },
  { id: 1, icon: "mdi-instagram", link: "https://www.instagram.com/faustinicostruzioni/?igsh=MWI2ejNvN3ppOTA2dQ%3D%3D" },
  { id: 2, icon: "mdi-map", link: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x1339169b662e3187:0xdf1ebf67f980f6eb?source=g.page.m._" },
]);

const contacts = reactive([
  { id: 0, title: "Fisso", text: "0971 71 87 45", icon: "mdi-phone text-subtitle-1 text-blue-darken-2", link: "tel:+390971718745" },
  { id: 1, title: "Cellulare", text: "348 81 07 321", icon: "mdi-cellphone text-subtitle-1 text-blue-darken-2", link: "tel:+393488107321" },
  { id: 2, title: "Email", text: "faustini.costruzioni@gmail.com", icon: "mdi-email text-subtitle-1 text-blue-darken-2", link: "mailto:faustini.costruzioni@gmail.com" },
  { id: 3, title: "PEC", text: "faustini.costruzioni@pec.it", icon: "mdi-email-check text-subtitle-1 text-blue-darken-2", link: "mailto:faustini.costruzioni@pec.it" },
]);

const legals = reactive([
  { id: 0, title: "Privacy Policy", text: "Informativa privacy", icon: "mdi-scale-balance text-subtitle-1 text-blue-darken-2" },
  { id: 1, title: "Cookie Policy", text: "Informativa cookie", icon: "mdi-cookie text-subtitle-1 text-blue-darken-2" },
]);

const faqs = reactive([
  { id: 0, request: "Dove offrite i vostri servizi?", responde: "In Basilicata e regioni limitrofe", icon: "mdi-numeric-1 text-blue-darken-2" },
  { id: 1, request: "Offrite preventivi gratuiti?", responde: "Certamente", icon: "mdi-numeric-2 text-blue-darken-2" },
  { id: 2, request: "Siete un impresa qualificata?", responde: "Si, abbiamo l'attestazione SOA in varie categorie", icon: "mdi-numeric-3 text-blue-darken-2" },
]);
</script>
