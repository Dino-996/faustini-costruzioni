<template>
  <nav-bar />

  <header-view />

  <text-card title="Faustini Costruzioni" subtitle="chi siamo" icon="mdi-account-hard-hat" text="Fondata nel 2008, questa impresa edile trae origine dalla fusione per incorporazione dell’impresa individuale di Rocco Macellaro. Con sede in Corso Garibaldi 82, a Vietri di Potenza (PZ), l’azienda è impegnata nella realizzazione di opere edili e stradali, rivolgendosi sia al settore pubblico che a quello privato, con una particolare specializzazione nelle idrodemolizioni. Personale specializzato che opera in conformità alle normative in materia di sicurezza e salute sui luoghi di lavoro e nel rispetto dell'etica e dignità professionale. L’azienda dispone di attrezzature e macchine utili alla realizzazione dei lavori in modo efficiente e sicuro. Faustini Costruzioni Srl è regolarmente iscritta presso la Camera di Commercio, Industria, Artigianato e Agricoltura (CCIAA) di Potenza e detiene l’attestazione SOA per l’esecuzione di lavori pubblici, conformemente al Decreto del Presidente della Repubblica n. 207/2010, nelle categorie OG1, OG2 e OG3." bg-number="0" />

  <image-gallery />

  <text-card title="Tecnologie e Conservazione nell’Ingegneria Civile" subtitle="servizi" icon="mdi-ruler-square" text="L’idrodemolizione è una tecnica innovativa che utilizza l’acqua ad altissima pressione per rimuovere il calcestruzzo danneggiato, essenziale nel ripristino di infrastrutture come ponti e viadotti. Questo metodo si integra perfettamente con il restauro conservativo, il quale mira a preservare l’estetica degli edifici rinforzando elementi strutturali come fondamenta, le travi e colonne. Nel contesto delle costruzioni generali, l’idrodemolizione contribuisce alla manutenzione e al miglioramento energetico e sismico di strutture sia pubbliche che private. Parallelamente, i lavori stradali richiedono attenzione alla manutenzione di pile e viadotti, oltre alla gestione delle acque e all’installazione di condotte e tubazioni. La sinergia tra queste pratiche evidenzia un approccio olistico alla costruzione e al mantenimento dell’infrastruttura urbana, dove la tecnologia e il rispetto per il patrimonio storico si fondono per garantire sicurezza e bellezza nelle nostre città." bg-number="1" />

  <carousel-service />

  <form-service />

  <footer-view />

</template>


<script lang="ts" setup>
import NavBar from '../components/NavBar.vue';
import HeaderView from '../components/HeaderView.vue';
import TextCard from '../components/TextCard.vue';
import CarouselService from '../components/CarouselService.vue';
import ImageGallery from '../components/ImageGallery.vue';
import FormService from '../components/FormService.vue';
import FooterView from '../components/FooterView.vue';
</script>
