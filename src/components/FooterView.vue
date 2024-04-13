<template>
  <v-footer color="yellow-darken-2" class="d-flex flex-column">
    <div>
      <v-btn icon="mdi-home" variant="text" rounded="sm"></v-btn>
    </div>
    <v-row>
      <v-col>
        Contatti
      </v-col>
      <v-col>
        Policy
      </v-col>
      <v-col>
        FAQ(Domande frequenti)
      </v-col>
    </v-row>
    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template>
