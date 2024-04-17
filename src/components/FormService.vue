<template>

  <div class="ml-5 mt-5 mb-5 justify-center align-center">
    <h2 class="text-orange">Contatti</h2>
    <v-divider :thickness="5" color="black" class="w-25"></v-divider>
  </div>

  <div class="d-flex flex-wrap-reverse align-center justify-space-evenly bg-image">

    <div class="d-flex justify-center align-center mb-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.3566113781385!2d15.507098!3d40.599955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1339169b662e3187%3A0xdf1ebf67f980f6eb!2sFaustini%20Costruzioni!5e0!3m2!1sit!2sit!4v1713049534195!5m2!1sit!2sit"
        class="resize mr-1" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <v-card class="mb-5 pt-5 pb-5 pr-5 pl-5 text-black" rounded="sm" color="yellow-darken-2">
      <v-sheet class="mx-auto" width="300" elevation="0" color="transparent">

        <div class="text-subtitle-1 text-grey-darken-1 mb-3">
          <h4>PREVENTIVO GRATUITO</h4>
        </div>

        <v-form @submit.prevent>
          <v-text-field clearable prepend-inner-icon="mdi-account-hard-hat text-blue-darken-2" variant="underlined"
            v-model="name" :rules="rulesName" label="Nome o Impresa" color="blue-darken-2">
          </v-text-field>

          <v-text-field clearable prepend-inner-icon="mdi-email text-blue-darken-2" variant="underlined" v-model="email"
            :rules="rulesEmail" label="Email" color="blue-darken-2">
          </v-text-field>

          <v-text-field clearable prepend-inner-icon="mdi-cellphone text-blue-darken-2" variant="underlined"
            v-model="telefono" :rules="rulesCellphone" label="Cellulare" color="blue-darken-2" counter="10">
          </v-text-field>

          <!-- Alla v-select manca la validazione -->
          <v-select prepend-inner-icon="mdi-toolbox-outline text-blue-darken-2" color="blue-darken-2" label="Servizi" :items="services"
            variant="underlined" chips multiple closable-chips></v-select>

          <v-textarea clearable prepend-inner-icon="mdi-forum text-blue-darken-2" variant="underlined"
            label="Inserisci la tua richiesta" :rules="rulesRequest" v-model="richiesta" counter="250"></v-textarea>

          <div class="d-flex justify-end">
            <v-btn class="mt-5" type="submit" rounded="sm" variant="elevated"
              append-icon="mdi-arrow-right">Invia</v-btn>
          </div>
        </v-form>

      </v-sheet>
    </v-card>

  </div>

</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const services = ['Costruzioni generali', 'Idrodemolizione', 'Restauro conservativo', 'Noleggio ponteggio e attrezzature'];

const contacts = reactive([
  { id: 0, title: "Fisso", text: "0971 71 87 45", icon: "mdi-phone text-subtitle-1 text-blue-darken-2" },
  { id: 1, title: "Cellulare", text: "348 81 07 321", icon: "mdi-cellphone text-subtitle-1 text-blue-darken-2" },
  { id: 2, title: "Email", text: "faustini.costruzioni@gmail.com", icon: "mdi-email text-subtitle-1 text-blue-darken-2" },
  { id: 3, title: "PEC", text: "faustini.costruzioni@pec.it", icon: "mdi-email-check text-subtitle-1 text-blue-darken-2" },
]);

const name = ref('');
const rulesName = [
  (name: any) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (name && nameRegex.test(name)) return true;
    return 'Inserisci il tuo nome e cognome o la Ragione Sociale della tua impresa';
  }
]


const email = ref('');
const rulesEmail = [
  (mail: any) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (mail && emailRegex.test(mail)) return true;
    return 'Inserisci un indirizzo email valido al quale potrai essere ricontattato';
  }
]

const telefono = ref('');
const rulesCellphone = [
  (cellphone: any) => {
    const phoneRegex = /^3\d{9}$/;
    if (cellphone && phoneRegex.test(cellphone)) return true;
    return 'Inserisci un numero di telefono cellulare valido';
  }
]

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
]

</script>

<style scoped>
.bg-image {
  background-image: url('src/assets/bg3.png');
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}

@media screen and (max-width: 1200px) {
  .resize {
    width: 350px;
    height: 500px;
  }
}

@media screen and (min-width: 898px) {
  .resize {
    width: 800px;
    height: 550px;
  }
}
</style>
