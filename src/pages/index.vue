<template>
  <navbar />

  <header-view />

  <text-card title="Titolo" subtitle="chi siamo" icon="mdi-account-hard-hat" bg-number="0" />

  <supporter-bg />

  <CarouselService />

  <text-card title="Titolo" subtitle="servizi" icon="mdi-ruler-square" bg-number="1" />

<form-service />

</template>


<script lang="ts" setup>
import navbar from '../components/NavBar.vue';
import HeaderView from '../components/HeaderView.vue';
import CarouselService from '../components/CarouselService.vue';
import TextCard from '../components/TextCard.vue';
import SupporterBg from '../components/SupporterBg.vue';
import FormService from '../components/FormService.vue';
</script>
