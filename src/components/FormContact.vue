<template>
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
              <v-btn @click="validate" type="submit" variant="elevated" :color="formValid.color"
                :append-icon="formValid.iconValid" :loading="formValid.loading">{{ formValid.text }}</v-btn>
            </div>
          </v-form>

        </v-sheet>
      </v-card>
    </v-skeleton-loader>

  </div>
</template>

<script lang="ts" setup>
import emailjs from '@emailjs/browser';
import { Ref, ref, onMounted } from 'vue';
import { db } from '../plugins/firebase';
import { collection, addDoc } from "firebase/firestore";

const name: Ref<string> = ref('');
const mapSrc: Ref<string> = ref('');
const isLoading: Ref<boolean> = ref(false);

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
const formValid = ref({ text: 'Invia', color: 'blue-darken-2', iconValid: 'mdi-chevron-right', loading: false });
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
      formValid.value.iconValid = 'mdi-chevron-right';
      formValid.value.text = 'Invia';
      formValid.value.color = 'blue-darken-2';
    }, 5000);
  }
};

onMounted(() => {
  mapSrc.value = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.3566113781385!2d15.507098!3d40.599955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1339169b662e3187%3A0xdf1ebf67f980f6eb!2sFaustini%20Costruzioni!5e0!3m2!1sit!2sit!4v1713049534195!5m2!1sit!2sit'
  setTimeout(() => isLoading.value = true, 3000)
});
</script>
