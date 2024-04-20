<template>

  <div class="video-background">

    <video autoplay loop muted>
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
                  <v-btn append-icon="mdi-arrow-down" variant="elevated" @click="scrollTo">
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

</template>

<script lang="ts" setup>

function scrollTo() {
  window.scroll({ top: 10000, left: 0, behavior: 'smooth' });
}
</script>

<style scoped>
.video-background {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.video-background video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  transform: translate(-50%, -50%);
}

.overlay-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>
