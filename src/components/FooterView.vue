<template>
  <v-footer color="yellow-darken-2" class="d-flex flex-column">
    <div class="mb-3">
      <v-btn icon="mdi-facebook" variant="text" rounded="sm"></v-btn>
      <v-btn icon="mdi-instagram" variant="text" rounded="sm"></v-btn>
      <v-btn icon="mdi-linkedin" variant="text" rounded="sm"></v-btn>
      <v-btn icon="mdi-twitter" variant="text" rounded="sm"></v-btn>
      <v-btn icon="mdi-map" variant="text" rounded="sm"></v-btn>
    </div>
    <v-row>
      <v-col>
        <v-card elevation="0" color="transparent">
          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>CONTATTI</h4>
          </v-card-subtitle>
          <div v-for="contatto in contatti" :key="contatto.id">
            <v-card-title class="text-blue-darken-2">
              {{ contatto.title }}
              <v-divider :thickness="5" color="black" class="w-25"></v-divider>
            </v-card-title>
            <v-card-text class="d-flex justify-start align-start text-black">
              <v-icon :icon="contatto.icon"></v-icon><a class="ml-2" href="#" about="_blank">{{ contatto.text }}</a>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="0" color="transparent">
          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>LEGAL</h4>
          </v-card-subtitle>
          <div v-for="legal in legals" :key="legal.id">
            <v-card-title class="text-blue-darken-2">
              {{ legal.title }}
              <v-divider :thickness="5" color="black" class="w-25"></v-divider>
            </v-card-title>
            <v-card-text class="d-flex justify-start align-start text-black">
              <v-icon :icon="legal.icon"></v-icon><a class="ml-2" href="#" about="_blank">{{ legal.text }}</a>
            </v-card-text>
          </div>
        </v-card>
      </v-col>

      <v-col>
        <v-card elevation="0" color="transparent">
          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>(FAQ) DOMANDE FREQUENTI</h4>
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
      &copy; {{ new Date().getFullYear() }} — Faustini Costruzioni S.r.l — <strong> P.IVA: | REA: </strong>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const contatti = reactive([
  { id: 0, title: "Fisso", text: "0971 71 87 45", icon: "mdi-phone text-subtitle-1 text-blue-darken-2" },
  { id: 1, title: "Cellulare", text: "348 81 07 321", icon: "mdi-cellphone text-subtitle-1 text-blue-darken-2" },
  { id: 2, title: "Email", text: "faustini.costruzioni@gmail.com", icon: "mdi-email text-subtitle-1 text-blue-darken-2" },
  { id: 3, title: "PEC", text: "faustini.costruzioni@pec.it", icon: "mdi-email-check text-subtitle-1 text-blue-darken-2" },
]);

const legals = reactive([
  { id: 0, title: "Privacy Policy", text: "Informativa privacy", icon: "mdi-scale-balance text-subtitle-1 text-blue-darken-2" },
  { id: 1, title: "Cookie Policy", text: "Informativa cookie", icon: "mdi-cookie text-subtitle-1 text-blue-darken-2" },
]);

const faqs = reactive([
  { id: 0, request: "Dove offrite i vostri servizi?", responde: "Lorem ipsum dolor est sum cul fordur trusted flaur", icon: "mdi-numeric-1 text-blue-darken-2" },
  { id: 1, request: "Offrite preventivi gratuiti?", responde: "Lorem ipsum dolor est sum cul fordur trusted flaur", icon: "mdi-numeric-2 text-blue-darken-2" },
]);
</script>
