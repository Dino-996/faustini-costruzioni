<template>
  <v-container>

    <div class="mb-5 d-flex justify-center align-center">
      <h2 class="text-orange">Contattaci oggi stesso</h2>
    </div>

    <div class="d-flex flex-wrap-reverse align-end justify-space-evenly">
      <div>
        <v-card class="mt-10 mb-3" elevation="0" color="transparent">

          <v-card-subtitle class="text-subtitle-1 text-black">
            <h4>CONTATTI </h4>
          </v-card-subtitle>

          <v-card-title class="text-blue-darken-2">
            Telefono
            <v-divider :thickness="5" color="black" class="w-25"></v-divider>
          </v-card-title>

          <v-card-text class="d-flex justify-center align-center text-black">
            <v-icon icon="mdi-cellphone text-subtitle-1 text-black"></v-icon><a class="ml-2" href="#" about="_blank">333 333 33 333</a>
          </v-card-text>

          <v-card-title class="text-blue-darken-2">
            Email
            <v-divider :thickness="5" color="black" class="w-25"></v-divider>
          </v-card-title>

          <v-card-text class="d-flex justify-center align-center text-black">
            <v-icon icon="mdi-email text-subtitle-1 text-black"></v-icon><a class="ml-2" href="#" about="_blank">faustini@gmail.com</a>
          </v-card-text>

        </v-card>
      </div>
      <div>
        <v-sheet class="mx-auto" width="300" elevation="0" color="transparent">

          <v-form @submit.prevent>
            <v-text-field clearable prepend-icon="mdi-alpha-n text-yellow-darken-2" variant="underlined" v-model="nome"
              :rules="rulesName" label="Nome o Impresa" color="yellow-darken-2">
            </v-text-field>

            <v-text-field clearable prepend-icon="mdi-alpha-e text-yellow-darken-2" variant="underlined" v-model="email"
              :rules="rulesEmail" label="Email" color="yellow-darken-2">
            </v-text-field>

            <v-text-field clearable prepend-icon="mdi-alpha-t text-yellow-darken-2" variant="underlined"
              v-model="telefono" :rules="rulesCellphone" label="Cellulare" color="yellow-darken-2">
            </v-text-field>

            <v-textarea clearable prepend-icon="mdi-alpha-r text-yellow-darken-2" variant="underlined"
              label="Inserisci la tua richiesta" :rules="rulesRequest" v-model="richiesta"></v-textarea>

            <div class="d-flex justify-end">
              <v-btn class="mt-5" type="submit" rounded="sm" variant="elevated"
                append-icon="mdi-arrow-right">Invia</v-btn>
            </div>
          </v-form>
        </v-sheet>
      </div>

    </div>

  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const nome = ref('');
const rulesName = [
  (name: any) => {
    if (name) return true
    return 'Inerisci il tuo nome e cognome o la Ragione Sociale della tua impresa'
  }
]

const email = ref('');
const rulesEmail = [
  (mail: any) => {
    if (mail) return true
    return 'Inserisci un indirizzo email valido al quale potrai essere ricontattato'
  }
]

const telefono = ref('');
const rulesCellphone = [
  (cellphone: any) => {
    if (cellphone) return true
    return 'Inserisci un numero cellulare valido'
  }
]

const richiesta = ref('');
const rulesRequest = [
  (request: any) => {
    if (request) return true
    return 'Compila questo campo per richiedere un preventivo'
  }
]
</script>

<style>
a {
  text-decoration: none;
  color: #FBC02D
}
</style>
