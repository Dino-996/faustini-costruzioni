<template>

  <v-app-bar color="yellow-darken-2" density="comfortable" elevation="0"
    :scroll-behavior="mobile ? 'inverted hide' : 'inverted hide'" scroll-threshold="630">

    <template v-slot:prepend>
      <v-img width="45" height="45" class="cursor-pointer"  src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890" lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890" @click="scrollTo" alt="logo faustini costruzioni srl"></v-img>
    </template>

    <template v-slot:append>
      <v-btn v-for="social in socials" :key="social.id" :icon="social.icon" variant="text" rounded="sm"
        color="blue-darken-2" :href="social.link" target="_blank" class="mr-3"></v-btn>
      <v-btn prepend-icon="mdi-cellphone text-button" variant="tonal" color="blue-darken-2"
        href="tel:+393488107321">Telefono</v-btn>
    </template>

  </v-app-bar>

</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { reactive } from "vue";

const { mobile } = useDisplay();

const scrollTo = () => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

const socials = reactive([
  {
    id: 0,
    icon: "mdi-facebook",
    link: "https://www.facebook.com/faustini.costruzioni.Srl.1/",
  },
  {
    id: 1,
    icon: "mdi-instagram",
    link: "https://www.instagram.com/faustinicostruzioni/?igsh=MWI2ejNvN3ppOTA2dQ%3D%3D",
  },
  {
    id: 2,
    icon: "mdi-map",
    link: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x1339169b662e3187:0xdf1ebf67f980f6eb?source=g.page.m._",
  },
]);
</script>
