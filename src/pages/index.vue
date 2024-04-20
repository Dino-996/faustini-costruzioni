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
      <v-btn prepend-icon="mdi-cellphone text-button" variant="tonal" color="blue-darken-2"
        href="tel:+393488107321">Telefono</v-btn>
    </template>

  </v-app-bar>

  <!-- HEADER -->
  <div class="video-background">

    <video preload="none" poster="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork7.webp?alt=media&token=3ff0bdc1-8f3e-4514-8ca1-c7bf815a4a27" autoplay loop muted controls playsinline>
      <source src="../assets/faustini.mp4" type="video/mp4">
    </video>

    <div class="overlay-text">

      <v-container class="fill-height" fluid>

        <v-row align="center" justify="center">

          <div class="ml-5 mr-5 d-flex flex-row flex-wrap fill-height justify-space-evenly align-center">

            <div>
              <v-img width="auto" max-width="150"
                src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
                lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/logo.webp?alt=media&token=18353037-9486-4a2d-bfab-c2a60b6fc890"
                alt="logo faustini costruzioni srl"></v-img>
            </div>

            <div>
              <v-card elevation="0" color="transparent">

                <v-card-title class="ml-10 mr-10">
                  <h1 class="text-yellow-darken-2 text-h5 font-weight-bold">Faustini Costruzioni</h1>
                </v-card-title>

                <v-card-text class="ml-10 mr-10">
                  Qualità e avanguardia, i pilastri su cui costruiamo il tuo futuro.
                </v-card-text>

                <v-card-actions class="ml-10 mr-10">
                  <v-btn @click="scroll('services')" append-icon="mdi-arrow-down" density="compact" variant="elevated">
                    Preventivo gratuito
                  </v-btn>
                </v-card-actions>

              </v-card>
            </div>

          </div>
        </v-row>
      </v-container>
    </div>
  </div>

  <!-- TEXT CARD 1 -->
  <text-card title="Faustini Costruzioni" subtitle="chi siamo" icon="mdi-account-hard-hat"
    text="Fondata nel 2008, questa impresa edile trae origine dalla fusione per incorporazione dell’impresa individuale di Rocco Macellaro, con sede in Corso Garibaldi 82, a Vietri di Potenza (PZ). L’azienda è impegnata nella realizzazione di opere edili e stradali, rivolgendosi sia al settore pubblico che a quello privato, con una particolare specializzazione nelle idrodemolizioni. Personale specializzato che opera in conformità alle normative in materia di sicurezza e salute sui luoghi di lavoro e nel rispetto dell'etica e dignità professionale. L’azienda dispone di attrezzature e macchine utili alla realizzazione dei lavori in modo efficiente e sicuro. Faustini Costruzioni Srl è regolarmente iscritta presso la Camera di Commercio, Industria, Artigianato e Agricoltura (CCIAA) di Potenza e detiene l’attestazione SOA per l’esecuzione di lavori pubblici, conformemente al Decreto del Presidente della Repubblica n. 207/2010, nelle categorie OG1, OG2 e OG3."
    bg-number="0" />

  <!-- IMAGE GALLERY -->
  <v-parallax
    src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/background%2Fbg4.webp?alt=media&token=7a9b0b41-71ad-4193-9e20-c15bbd9c6f8d"
    lazy-src="https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/background%2Fbg4.webp?alt=media&token=7a9b0b41-71ad-4193-9e20-c15bbd9c6f8d"
    alt="ponteggio">

    <v-container>
      <div class="mt-5 justify-center align-center">
        <h2 class="text-orange">Progetti</h2>
        <v-divider :thickness="5" color="black" class="w-25"></v-divider>
      </div>
      <v-container fluid class="d-flex flex-wrap align-center justify-center">
        <div class="d-flex flex-wrap align-center justify-space-between">

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

          <v-overlay v-model="overlay" scroll-strategy="reposition" class="align-center justify-center">
            <v-card rounded="sm" color="yellow-darken-2" elevation="5" width="380" height="667" class="overflow-y-auto">

              <template v-slot:append>
                <v-btn color="blue-darken-2" icon="mdi-close" variant="text" rounded="sm"
                  @click.once="overlay = !overlay" />
              </template>

              <v-carousel :show-arrows="selectedImage.subfileimage.length > 1 ? 'hover' : false" hide-delimiters>
                <v-carousel-item v-for="(item, id) in selectedImage.subfileimage" :src="item" :key="id" rounded="t-sm" cover>
                  <v-windows class="v-carousel-item">
                    <video v-if="item.endsWith('.mp4')" muted autoplay style="width: 380px !important;">
                      <source v-if="item.includes('faustini')" src="../assets/faustini.mp4" type="video/mp4">
                      <source v-if="item.includes('viadotto')" src="../assets/viadotto.mp4" type="video/mp4">
                    </video>
                  </v-windows>
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
            <v-btn @click="scroll('contact')" variant="elevated" append-icon="mdi-arrow-down" rounded="sm">{{
              slide.button
              }}</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-carousel-item>
  </v-carousel>

  <!-- FORM -->
  <div class="ml-5 mt-5 mb-5 justify-center align-center">
    <h2 id="services" class="text-orange">Contattaci</h2>
    <v-divider :thickness="5" color="black" class="w-25"></v-divider>
  </div>

  <div class="d-flex flex-wrap-reverse align-center justify-space-evenly bg-image">

    <div class="d-flex justify-center align-center mb-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.3566113781385!2d15.507098!3d40.599955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1339169b662e3187%3A0xdf1ebf67f980f6eb!2sFaustini%20Costruzioni!5e0!3m2!1sit!2sit!4v1713049534195!5m2!1sit!2sit"
        class="resize mr-1" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <v-card class="mb-5 pt-5 pb-5 pr-5 pl-5 text-black" rounded="sm" color="yellow-darken-2">
      <v-sheet class="mx-auto resize" height="auto" elevation="0" color="transparent">

        <div class="text-subtitle-1 text-grey-darken-1 mb-3">
          <h4>PREVENTIVO GRATUITO</h4>
        </div>

        <v-form @submit.prevent ref="form">

          <v-text-field prepend-inner-icon="mdi-account-hard-hat text-blue-darken-2" variant="underlined" v-model="name"
            :rules="rulesName" label="Nome o Impresa" color="blue-darken-2">
          </v-text-field>

          <v-text-field prepend-inner-icon="mdi-email text-blue-darken-2" variant="underlined" v-model="email"
            :rules="rulesEmail" label="Email" color="blue-darken-2">
          </v-text-field>

          <v-text-field prepend-inner-icon="mdi-cellphone text-blue-darken-2" variant="underlined" v-model="telefono"
            :rules="rulesCellphone" label="Cellulare" color="blue-darken-2" counter="10">
          </v-text-field>

          <v-select prepend-inner-icon="mdi-toolbox-outline text-blue-darken-2" color="blue-darken-2"
            v-model="servizioSelezionato" :rules="rulesService" variant="underlined" label="Servizi" :items="services"
            chips closable-chips>
          </v-select>

          <v-textarea clearable class="mt-3" prepend-inner-icon="mdi-forum text-blue-darken-2" variant="underlined"
            label="Inserisci la tua richiesta" :rules="rulesRequest" v-model="richiesta" counter="250">
          </v-textarea>

          <v-checkbox color="blue-darken-2" v-model="privacyPolicy" :rules="isCheck" required>
            <template v-slot:label>
              <div>
                Acconsento al trattamento dei dati personali come specificato nell'informativa
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <a href="https://vuetifyjs.com" target="_blank" v-bind="props" @click.stop>
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

  </div>

  <!-- FOOTER -->
  <v-footer color="yellow-darken-2" class="d-flex flex-column">

    <div class="mb-3">
      <v-btn v-for="social in socials" :key="social.id" :icon="social.icon" variant="text" rounded="sm"
        :href="social.link" target="_blank"></v-btn>
    </div>

    <v-row>

      <v-col>

        <v-card elevation="0" color="transparent">

          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4 id="contact">CONTATTI</h4>
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
              <a class="ml-2" href="#" about="_blank" aria-label="Area dedicata alla consultazione delle Policy">{{
                legal.text }}</a>
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
      &copy; {{ new Date().getFullYear() }} • <strong>Faustini Costruzioni S.R.L</strong> • P.IVA 01699410765 • URI PZ
      • REA 127800
    </div>

  </v-footer>

</template>


<script lang="ts" setup>
import TextCard from '../components/TextCard.vue';
import emailjs from '@emailjs/browser';

import { useDisplay, useGoTo } from "vuetify";
import { reactive, ref, computed } from "vue";

const { mobile } = useDisplay();
const goTo = useGoTo();

const options = computed(() => ({
  duration: 600,
  easing: 'easeInOutCubic',
  offset: 0,
}));

const scroll = (id: string) => {
  goTo('#' + id, options.value);
};

const cycle = ref(true);
const overlay = ref(false);
const selectedImage = ref(null);
const isSelectedImage = ref(null);
const imageSelected = ref(false);

const isSelected = (image: null) => {
  isSelectedImage.value = image;
  imageSelected.value = true;
};

const selectImage = (image: null) => {
  selectedImage.value = image;
  overlay.value = true;
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

const slides = reactive([
  { id: 0, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FcostruzioniGenerali.webp?alt=media&token=73fd9d18-5e91-4b24-a473-03711d49a5d2", emoji: "🏗", title: "Costruzioni Generali", text: "La nostra esperienza si estende alla cura di ogni tipo di edificio, pubblico o privato. Con un occhio attento all’innovazione, ci dedichiamo alla manutenzione, ristrutturazione e all’aggiornamento energetico e sismico, perché ogni costruzione possa essere un sicuro rifugio nel presente e un solido patrimonio per il domani.", button: "Contattaci" },
  { id: 1, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FlavoriStradali.webp?alt=media&token=ce87be66-0e3a-435b-9b05-f3f10265fa0c", emoji: "🔨", title: "Lavori Edili e Stradali", text: "Le arterie della nostra comunità, le strade, richiedono una manutenzione che va oltre il semplice intervento. Noi ci occupiamo della salute complessiva delle infrastrutture stradali, dalla manutenzione di pile e viadotti alla gestione delle acque, fino alla realizzazione di scavi e sistemi di canalizzazione, assicurando così fluidità e sicurezza al flusso vitale della circolazione quotidiana.", button: "Contattaci" },
  { id: 2, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe", emoji: "💦🚧", title: "Idrodemolizioni", text: "Immaginate una tecnologia all’avanguardia che, con la forza purificatrice dell’acqua, riesce a cancellare i segni del tempo dal calcestruzzo, restituendo vigore e stabilità alle infrastrutture che incorniciano la nostra vita quotidiana. Ponti, viadotti e gallerie rinascono sotto l’azione mirata e potente dell’idrodemolizione.", button: "Contattaci" },
  { id: 3, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Frestauro.webp?alt=media&token=989ba4d7-3016-440e-997e-a89aa98b5b67", emoji: "🛠️", title: "Restauro Conservativo", text: "Ogni edificio ha una storia da raccontare, e il nostro intervento conservativo ne è il narratore fedele. Con maestria e rispetto, lavoriamo per preservare l’essenza estetica degli edifici, rinforzando le loro ossature e garantendo che il passato possa dialogare con il futuro.", button: "Contattaci" },
  { id: 4, src: "https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496", emoji: "🚚", title: "Noleggio Ponteggi e Attrezzature", text: "Offriamo un servizio di noleggio professionale di ponteggi e attrezzature per lavori di costruzione, ristrutturazione e manutenzione. Con una vasta gamma di attrezzature di alta qualità e conformi alle normative di sicurezza, garantiamo soluzioni su misura per ogni tipo di esigenza, dalla piccola ristrutturazione domestica ai grandi cantieri edili.", button: "Contattaci" },
]);

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
const services = ['Costruzioni generali', 'Idrodemolizione', 'Restauro conservativo', 'Noleggio ponteggi e attrezzature'];
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

  await emailjs.send("service_0otesgc", "template_pefdhyp", param).then(
    (response) => {
      formValid.value.loading = false;
      formValid.value.iconValid = 'mdi-alert-decagram';
      formValid.value.text = 'Modulo inviato correttamente';
      formValid.value.color = 'success';
      form.value.reset();
      console.log('SUCCESS!', response.status, response.text);
      resetButton();
    },
    (error) => {
      formValid.value.loading = false;
      formValid.value.iconValid = 'mdi-alert-circle';
      formValid.value.text = 'Si è verificato un errore, riprova';
      formValid.value.color = 'red';
      console.log('FAILED...', error);
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
