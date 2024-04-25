<template>

  <!-- NAVBAR -->
  <v-app-bar color="yellow-darken-2" density="comfortable" elevation="0"
    :scroll-behavior="mobile ? 'inverted hide' : 'inverted hide'" scroll-threshold="630">

    <template v-slot:prepend>
      <v-img width="45" height="45" class="cursor-pointer"
        src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
        lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
        @click="scroll('top')" id="top" alt="logo faustini costruzioni srl"></v-img>
    </template>

    <template v-slot:append>
      <v-btn v-for="social in socials" :key="social.id" :icon="social.icon" variant="text" rounded="sm"
        color="blue-darken-2" :href="social.link" target="_blank" class="mr-3"></v-btn>
      <v-btn prepend-icon="mdi-cellphone text-button" variant="outlined" color="blue-darken-2"
        href="tel:+393488107321">Telefono</v-btn>
    </template>

  </v-app-bar>

  <!-- HEADER -->
  <carousel-text />

  <!-- TEXT CARD 1 -->
  <text-card title="Faustini Costruzioni" subtitle="chi siamo" icon="mdi-account-hard-hat"
    text="Fondata nel 2008, questa impresa edile trae origine dalla fusione per incorporazione dell’impresa individuale di Rocco Macellaro, con sede in Corso Garibaldi 82, a Vietri di Potenza (PZ). L’azienda è impegnata nella realizzazione di opere edili e stradali, rivolgendosi sia al settore pubblico che a quello privato, con una particolare specializzazione nelle idrodemolizioni. Personale specializzato che opera in conformità alle normative in materia di sicurezza e salute sui luoghi di lavoro e nel rispetto dell'etica e dignità professionale. L’azienda dispone di attrezzature e macchine utili alla realizzazione dei lavori in modo efficiente e sicuro. Faustini Costruzioni Srl è regolarmente iscritta presso la Camera di Commercio, Industria, Artigianato e Agricoltura (CCIAA) di Potenza e detiene l’attestazione SOA per l’esecuzione di lavori pubblici, conformemente al Decreto del Presidente della Repubblica n. 207/2010, nelle categorie OG1, OG2 e OG3."
    bg-number="0" />

  <!-- IMAGE GALLERY -->
  <v-parallax
    src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/background%2Fbg4.webp?alt=media&token=e54b41b6-4c36-4d3e-b4ec-f770f0ef148f"
    lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/background%2Fbg4.webp?alt=media&token=e54b41b6-4c36-4d3e-b4ec-f770f0ef148f"
    alt="ponteggio">

    <v-container>
      <div class="mt-5 justify-center align-center">
        <h2 class="text-orange">Progetti</h2>
        <v-divider :thickness="5" color="black" class="w-25"></v-divider>
      </div>
      <v-container fluid class="d-flex flex-wrap align-center justify-center">
        <div class="d-flex flex-wrap align-center justify-space-between">

          <v-skeleton-loader rounded="sm" :loading="!isLoading" type="card" color="transparent">
            <v-card elevation="5" rounded="sm" color="transparent" class="ml-5 mt-2" v-for="image in images"
              :key="image.id">
              <v-img rounded="sm" :src="image.fileimage" :lazy-src="image.fileimage" height="300" width="300"
                :alt="image.title" class="text-end align-end cursor-pointer" @click="selectImage(image)"
                @mouseover="isSelected(image)" @mouseout="imageSelected = !imageSelected" cover>
                <span v-if="imageSelected && isSelectedImage.id == image.id" style="pointer-events: none;">
                  <v-btn append-icon="mdi-eye-outline">Scopri di pi&ugrave;</v-btn>
                </span>
              </v-img>
            </v-card>
          </v-skeleton-loader>

          <v-overlay v-model="overlay" scroll-strategy="reposition" class="align-center justify-center" role="tooltip"
            aria-label="progetti">
            <v-card rounded="sm" color="yellow-darken-2" elevation="5" width="380" height="667" class="overflow-y-auto">

              <template v-slot:append>
                <v-btn color="blue-darken-2" icon="mdi-close" variant="text" rounded="sm"
                  @click.once="overlay = !overlay" />
              </template>

              <v-carousel :show-arrows="selectedImage.subfileimage.length > 1 ? 'hover' : false" hide-delimiters>
                <v-carousel-item v-for="(item, id) in selectedImage.subfileimage" :src="item" :key="id" rounded="t-sm"
                  cover eager>
                  <video v-if="item.endsWith('.mp4')"
                    poster="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
                    muted autoplay style="width: 380px !important;">
                    <source v-if="item.includes('faustini')" src="../assets/faustini.mp4" type="video/mp4">
                    <source v-if="item.includes('viadotto')" src="../assets/viadotto.mp4" type="video/mp4">
                  </video>
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

  <!-- TEXT CARD 2 -->
  <text-card title="Tecnologie e Conservazione nell’Ingegneria Civile" subtitle="servizi" icon="mdi-ruler-square"
    text="L’idrodemolizione è una tecnica innovativa che utilizza l’acqua ad altissima pressione per rimuovere il calcestruzzo danneggiato, essenziale nel ripristino di infrastrutture come ponti e viadotti.
    Questo metodo si integra perfettamente con il restauro conservativo, il quale mira a preservare l’estetica degli edifici rinforzando elementi strutturali come fondamenta, travi e colonne.
    Parallelamente, i lavori stradali richiedono attenzione alla manutenzione di pile e viadotti, oltre alla gestione delle acque e all’installazione di condotti e tubazioni.
    La sinergia tra queste pratiche evidenzia un approccio olistico alla costruzione e al mantenimento dell’infrastruttura urbana, dove la tecnologia e il rispetto per il patrimonio storico si fondono per garantire sicurezza e bellezza nelle nostre città."
    bg-number="1" />

  <!-- CAROUSEL SERVICE -->
<<<<<<< HEAD
  <scroll-card />
=======
  <v-carousel height="650" @mouseover="cycle = false" @mouseout="cycle = true" :cycle="cycle" :show-arrows="false"
    delimiter-icon="mdi-square" interval="7000" hide-delimiter-background>
    <v-carousel-item v-for="slide in slides" :key="slide.id" :src="slide.src" :alt="slide.title" color="black" cover>
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
            <v-btn @click="scroll('contact')" variant="elevated" append-icon="mdi-arrow-down" rounded="sm">{{
              slide.button
              }}</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-carousel-item>
  </v-carousel>
>>>>>>> f78812301946537cca941ae7c6c156793cad64e4

  <!-- FORM -->
  <div class="ml-5 mt-5 mb-5 justify-center align-center">
    <h2 id="services" class="text-orange">Contattaci</h2>
    <v-divider :thickness="5" color="black" class="w-25"></v-divider>
  </div>

  <div class="d-flex flex-wrap-reverse align-center justify-space-evenly bg-image">

    <div class="d-flex justify-center align-center mb-5 mt-5">

      <v-skeleton-loader class="resize border rounded-sm" elevation="2" :loading="!isLoading" type="image, article"
        transition="fade-transition">
        <iframe title="Mappa dell'indirizzo" :src="mapSrc" class="resize" style="border:0;" allowfullscreen=""
          loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </v-skeleton-loader>

    </div>

    <v-skeleton-loader class="resize border rounded-sm" rounded="sm" :loading="!isLoading"
      type="card, table-heading, table-thead, button" color="transparent">
      <v-card class="mx-auto text-black h-100 w-100 pr-5 pl-5 pt-1 pb-2" rounded="sm" color="yellow-darken-2">
        <v-sheet class="mx-auto resize" height="auto" width="auto" elevation="0" color="transparent">

          <div class="text-subtitle-1 text-grey-darken-1 mb-3">
            <span class="text-h6">PREVENTIVO GRATUITO</span>
          </div>

          <v-form @submit.prevent ref="form">

            <v-text-field prepend-inner-icon="mdi-account-hard-hat text-blue-darken-2" variant="underlined"
              v-model="name" type="text" :rules="rulesName" label="Nome o Impresa" color="blue-darken-2"
              aria-required="true" required>
            </v-text-field>

            <v-text-field prepend-inner-icon="mdi-email text-blue-darken-2" variant="underlined" v-model="email"
              :rules="rulesEmail" type="email" label="Email" color="blue-darken-2" aria-required="true">
            </v-text-field>

            <v-text-field prepend-inner-icon="mdi-cellphone text-blue-darken-2" variant="underlined" v-model="telefono"
              :rules="rulesCellphone" type="tel" label="Cellulare" color="blue-darken-2" counter="10"
              aria-required="true" required>
            </v-text-field>

            <v-select prepend-inner-icon="mdi-toolbox-outline text-blue-darken-2" color="blue-darken-2"
              v-model="servizioSelezionato" :rules="rulesService" variant="underlined" label="Servizi" :items="services"
              chips closable-chips aria-required="true" required>
            </v-select>

            <v-textarea clearable class="mt-3" prepend-inner-icon="mdi-forum text-blue-darken-2" variant="underlined"
              label="Inserisci la tua richiesta" type="text" :rules="rulesRequest" v-model="richiesta" counter="250"
              required aria-required="true">
            </v-textarea>

            <v-checkbox color="blue-darken-2" v-model="privacyPolicy" :rules="isCheck" aria-required="true" required>
              <template v-slot:label>
                <div>
                  Acconsento al trattamento dei dati personali come specificato nell'informativa
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <a href="https://www.iubenda.com/privacy-policy/31752374" target="_blank" v-bind="props"
                        @click.stop>
                        Privacy Policy
                      </a>
                    </template>
                    Consulta l'informativa'
                  </v-tooltip>
                </div>
              </template>
            </v-checkbox>

            <div class="mt-5 d-flex justify-end">
              <v-btn @click="validate" type="submit" rounded="sm" variant="elevated" :color="formValid.color"
                :append-icon="formValid.iconValid" :loading="formValid.loading">{{ formValid.text }}</v-btn>
            </div>
          </v-form>

        </v-sheet>
      </v-card>
    </v-skeleton-loader>

  </div>

  <!-- FOOTER -->
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
      • REA 127800
    </div>

  </v-footer>

</template>


<script lang="ts" setup>
import TextCard from '../components/TextCard.vue';
import emailjs from '@emailjs/browser';
import CarouselText from '../components/CarouselText.vue';
import ScrollCard from '../components/ScrollCard.vue';

import { db } from '../plugins/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useDisplay, useGoTo } from "vuetify";
import { reactive, ref, Ref, computed, onMounted } from "vue";

const { mobile } = useDisplay();
const goTo = useGoTo();

const overlay: Ref<boolean> = ref(false);
const selectedImage: Ref<null> = ref(null);
const isSelectedImage: Ref<null> = ref(null);
const imageSelected: Ref<boolean> = ref(false);
let mapSrc: Ref<string> = ref('');
const isLoading: Ref<boolean> = ref(false);

onMounted(() => {
  mapSrc.value = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.3566113781385!2d15.507098!3d40.599955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1339169b662e3187%3A0xdf1ebf67f980f6eb!2sFaustini%20Costruzioni!5e0!3m2!1sit!2sit!4v1713049534195!5m2!1sit!2sit'
  setTimeout(() => isLoading.value = true, 3000);
});

const isSelected = (image: null) => {
  isSelectedImage.value = image;
  imageSelected.value = true;
};

const selectImage = (image: null) => {
  selectedImage.value = image;
  overlay.value = true;
};

const options = computed(() => ({
  duration: 8000,
  easing: 'easeInOutCubic',
  offset: 0,
}));

const scroll = (id: string) => {
  goTo('#' + id, options.value);
};

const images = reactive([
  { id: 0, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork2.webp?alt=media&token=1d1e429c-8cb0-468e-b86d-9876f7dc4931', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork2.webp?alt=media&token=1d1e429c-8cb0-468e-b86d-9876f7dc4931', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork3.webp?alt=media&token=cac204db-f424-46c8-9b94-ec888eb0bc74'], title: "Area Rupe", subtitle: "Vietri di Potenza (PZ)", text: "L'area Rupe nel centro storico di Vietri di Potenza rappresenta un importante patrimonio culturale e storico della città. L'intervento di riqualificazione ha l'obiettivo di valorizzare e riqualificare questa zona, conservando e valorizzando le sue caratteristiche architettoniche e storiche, nonché migliorando la qualità urbana e il benessere dei cittadini." },
  { id: 1, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork1.webp?alt=media&token=293e5dac-8bdb-4737-8519-ed6e12a8a8a9', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork1.webp?alt=media&token=293e5dac-8bdb-4737-8519-ed6e12a8a8a9', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork4.webp?alt=media&token=71e9cc4a-530c-4562-98cb-5e12759c6d62', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork5.webp?alt=media&token=16516fc9-df21-48fa-ac43-afd6d7af4e89'], title: "Teatro Cecilia", subtitle: "Tito (PZ)", text: "Il Teatro Cecilia di Tito è un edificio storico situato in provincia di Potenza. Considerato il suo valore culturale e storico, l'obiettivo dell'intervento di efficientamento energetico è stato quello di migliorare la performance energetica dell'edificio riducendo consumi ed emissioni, senza compromettere l'integrità architettonica e storica dell'immobile." },
  { id: 2, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496'], title: "Risanamento locale", subtitle: "Viadotto S.Venere I e II R.A n.5 Sicignano - Potenza", text: "Abbiamo eseguito interventi di risanamento locale delle strutture del Viadotto S.Venere I e II R.A n.5 sulla tratta Sicignano - Potenza. Il nostro team di esperti ha effettuato un'analisi dettagliata delle condizioni strutturali del viadotto, identificando le aree critiche e i punti di degrado. Attraverso l'applicazione di tecniche e materiali avanzati, abbiamo proceduto con interventi mirati di ripristino e consolidamento delle strutture, garantendo la sicurezza, la durabilità e l'integrità del viadotto." },
  { id: 3, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork7.webp?alt=media&token=3ff0bdc1-8f3e-4514-8ca1-c7bf815a4a27', subfileimage: ['../assets/faustini.mp4', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork7.webp?alt=media&token=3ff0bdc1-8f3e-4514-8ca1-c7bf815a4a27', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork8.webp?alt=media&token=0954a9a4-7f20-4bda-8fb0-646523ffff77'], title: "Galleria San Nicola", subtitle: "SS 658 Potenza-Melfi", text: "Abbiamo realizzato interventi di manutenzione straordinaria per il rivestimento e il ripristino corticale della galleria San Nicola sulla SS 658 Potenza-Melfi. Il nostro team di professionisti ha lavorato con precisione e competenza, applicando materiali di alta qualità per risolvere problemi di usura, deterioramento e degrado delle superfici interne della galleria. La nostra esperienza e professionalità hanno permesso di completare i lavori nel rispetto dei tempi di realizzazione e delle normative vigenti, assicurando la conservazione e la manutenzione ottimale delle infrastrutture stradali." },
  { id: 4, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FviadottoSicignanoPotenza%2Fwork9.webp?alt=media&token=7a1c859c-f2cf-4b5c-a7b4-d4a8a0977ea2', subfileimage: ['../assets/viadotto.mp4', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FviadottoSicignanoPotenza%2Fwork9.webp?alt=media&token=7a1c859c-f2cf-4b5c-a7b4-d4a8a0977ea2'], title: "Viadotto autostradale", subtitle: "Raccordo autostradale Sicignano - Potenza", text: "Il ripristino con malta tixotropica delle pile di viadotti sul raccordo autostradale Sicignano - Potenza ha permesso di riparare e rinforzare le strutture danneggiate, garantendo la sicurezza e la durabilità delle pile nel tempo. Attraverso l'applicazione di soluzioni tecnologicamente avanzate e l'utilizzo di materiali di alta qualità, abbiamo contribuito a prolungare la vita utile dei viadotti, minimizzando i rischi di cedimenti strutturali e garantendo la continuità e l'efficienza del collegamento autostradale tra la Campania e la Basilicata." },
  { id: 5, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork11.webp?alt=media&token=a646fbd0-808d-4793-994f-25d6d7ab3071', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork10.webp?alt=media&token=3a79cd61-216f-4dc5-8ab2-23b635658046', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork11.webp?alt=media&token=a646fbd0-808d-4793-994f-25d6d7ab3071'], title: "Ripristino facciate", subtitle: "Vietri di Potenza (PZ)", text: "Il ripristino facciate dell'edificio restituisce all'immobile un aspetto estetico rinnovato e valorizzato, migliorando la sua integrità architettonica e preservando il suo valore storico e patrimoniale. Grazie all'applicazione di soluzioni tecniche appropriate e all'utilizzo di materiali di alta qualità, l'edificio risplende in una nuova veste, riaffermando la sua presenza nel contesto urbano e contribuendo a valorizzare l'ambiente circostante." },
  { id: 6, fileimage: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork12.webp?alt=media&token=a96b3a53-00fb-4bc1-9989-d223081f036f', subfileimage: ['https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork13.webp?alt=media&token=eb276be0-e149-447a-b376-3526a23eceeb', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork12.webp?alt=media&token=a96b3a53-00fb-4bc1-9989-d223081f036f', 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe'], title: "Idrodemolizione", subtitle: "Raccordo autostradale Sicignano - Potenza ", text: "Abbiamo trasformato le pile autostradali del raccordo 05 Sicignano-Potenza con la nostra tecnologia d'avanguardia di idrodemolizione. Grazie ai getti d'acqua ad alta pressione, abbiamo rimosso il calcestruzzo deteriorato con precisione chirurgica, salvaguardando la struttura d'acciaio e garantendo una durata senza pari. Se cerchi un intervento efficiente e di alta qualità per il rinnovamento delle infrastrutture, sei nel posto giusto." },
]);


const socials = reactive([
  { id: 0, icon: "mdi-facebook text-subtitle-1 text-blue-darken-2", title: "Facebook", link: "https://www.facebook.com/faustini.costruzioni.Srl.1/" },
  { id: 1, icon: "mdi-instagram text-subtitle-1 text-blue-darken-2", title: "Instagram", link: "https://www.instagram.com/faustinicostruzioni/?igsh=MWI2ejNvN3ppOTA2dQ%3D%3D" },
  { id: 2, icon: "mdi-map text-subtitle-1 text-blue-darken-2", title: "Google Maps", link: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x1339169b662e3187:0xdf1ebf67f980f6eb?source=g.page.m._" },
]);

const contacts = reactive([
  { id: 0, title: "Fisso", text: "0971 71 87 45", icon: "mdi-phone text-subtitle-1 text-blue-darken-2", link: "tel:+390971718745" },
  { id: 1, title: "Cellulare", text: "348 81 07 321", icon: "mdi-cellphone text-subtitle-1 text-blue-darken-2", link: "tel:+393488107321" },
  { id: 2, title: "Email", text: "faustini.costruzioni@gmail.com", icon: "mdi-email text-subtitle-1 text-blue-darken-2", link: "mailto:faustini.costruzioni@gmail.com" },
  { id: 3, title: "PEC", text: "faustini.costruzioni@pec.it", icon: "mdi-email-check text-subtitle-1 text-blue-darken-2", link: "mailto:faustini.costruzioni@pec.it" },
]);

const legals = reactive([
  { id: 0, title: "Privacy Policy", text: "Informativa privacy", link: "https://www.iubenda.com/privacy-policy/31752374", icon: "mdi-scale-balance text-subtitle-1 text-blue-darken-2" },
  { id: 1, title: "Cookie Policy", text: "Informativa cookie", link: "https://www.iubenda.com/privacy-policy/31752374/cookie-policy", icon: "mdi-cookie text-subtitle-1 text-blue-darken-2" },
]);

const faqs = reactive([
  { id: 0, request: "Dove offrite i vostri servizi?", responde: "Offriamo i nostri servizi in Basilicata e nelle regioni limitrofe.", icon: "mdi-numeric-1 text-blue-darken-2" },
  { id: 1, request: "Offrite preventivi gratuiti?", responde: "Certamente. Offriamo preventivi gratuiti per tutti i nostri servizi. Puoi contattarci attraverso il modulo di contatto sul nostro sito web, via email o telefonicamente per richiedere un preventivo personalizzato.", icon: "mdi-numeric-2 text-blue-darken-2" },
  { id: 2, request: "Siete un impresa qualificata?", responde: "Sì, siamo un'impresa qualificata con l'attestazione SOA in varie categorie, garantendo professionalità e competenza nei nostri servizi. ", icon: "mdi-numeric-3 text-blue-darken-2" },
  { id: 3, request: "In che modo la vostra tecnologia di idrodemolizione è superiore ai metodi tradizionali?", responde: "La nostra tecnologia di idrodemolizione ad alta pressione permette una rimozione precisa del calcestruzzo senza danneggiare la struttura d'acciaio sottostante, garantendo un intervento efficace e duraturo.", icon: "mdi-numeric-4 text-blue-darken-2" },
  { id: 4, request: "Quali garanzie offrite sui vostri lavori?", responde: "Offriamo garanzie sulla qualità e la durabilità dei nostri interventi. Inoltre, il nostro team di professionisti altamente qualificati assicura la massima precisione e attenzione ai dettagli in ogni lavoro.", icon: "mdi-numeric-5 text-blue-darken-2" },
]);

const name = ref('');
const rulesName = [
  (name: any) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (name && nameRegex.test(name)) {
      return true;
    }
    return 'Inserisci il tuo nome e cognome o la Ragione Sociale della tua impresa';
  }
];

const email = ref('');
const rulesEmail = [
  (mail: any) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (mail && emailRegex.test(mail)) {
      return true;
    }
    return 'Inserisci un indirizzo email valido al quale potrai essere ricontattato';
  }
];

const telefono = ref('');
const rulesCellphone = [
  (cellphone: any) => {
    const phoneRegex = /^3\d{9}$/;
    if (cellphone && phoneRegex.test(cellphone)) {
      return true;
    }
    return 'Inserisci un numero di telefono cellulare valido';
  }
];

const servizioSelezionato = ref(null);
const services = ['Costruzioni generali', 'Idrodemolizione', 'Restauro conservativo', 'Noleggio ponteggi e attrezzature', 'Altro'];
const rulesService = [
  (service: any) => {
    if (service) {
      return true;
    }
    return 'Seleziona il servizio desiderato';
  }
];

const privacyPolicy = ref(null);
const isCheck = [
  (checkbox: any) => {
    if (checkbox) {
      return true;
    }
    return 'Questo campo è obligatorio';
  }
];

const richiesta = ref('');
const rulesRequest = [
  (request: any) => {
    if (request) {
      const charCount = request.length;
      if (charCount > 250) {
        return 'La tua richiesta non può contenere più di 250 caratteri';
      }
      return true;
    }
    return 'Compila questo campo per richiedere un preventivo';
  }
];

const form = ref();
const formValid = ref({ text: 'Invia', color: 'blue-darken-2', iconValid: 'mdi-arrow-right', loading: false });
const validate = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    formValid.value.loading = true;
    sendEmail();
  }
};

const sendEmail = async () => {
  const public_key = "j1IAnXQOEsaEW01gQ";
  emailjs.init(public_key);

  let param = {
    from_name: name.value,
    cellphone: telefono.value,
    email: email.value,
    service: servizioSelezionato.value,
    message: richiesta.value,
    reply_to: "faustini.costruzioni@gmail.com",
  };

  try {
    const docRef = await addDoc(collection(db, "preventivi"), {
      nome: name.value,
      cellulare: telefono.value,
      email: email.value,
      servizio: servizioSelezionato.value,
      messaggio: richiesta.value,
      privacyPolicyAccettata: privacyPolicy.value
    });
    console.log(docRef.id);
  } catch (e) {
    console.error(e);
  }

  await emailjs.send("service_0otesgc", "template_pefdhyp", param).then(
    (response) => {
      formValid.value.loading = false;
      formValid.value.iconValid = 'mdi-alert-decagram';
      formValid.value.text = 'Modulo inviato correttamente';
      formValid.value.color = 'success';
      form.value.reset();
      console.log(response.status, response.text);
      resetButton();
    },
    (error) => {
      formValid.value.loading = false;
      formValid.value.iconValid = 'mdi-alert-circle';
      formValid.value.text = 'Si è verificato un errore, riprova';
      formValid.value.color = 'red';
      console.log(error);
      resetButton();
    },
  )

  function resetButton(): void {
    setTimeout(() => {
      formValid.value.loading = false;
      formValid.value.iconValid = 'mdi-arrow-right';
      formValid.value.text = 'Invia';
      formValid.value.color = 'blue-darken-2';
    }, 5000);
  }
};
</script>
