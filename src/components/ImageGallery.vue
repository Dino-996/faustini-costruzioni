<template>
  <v-parallax src="/src/assets/bg4.jpg">

    <v-container>
      <div class="mt-5 justify-center align-center">
        <h2 class="text-orange">Progetti</h2>
        <v-divider :thickness="5" color="black" class="w-25"></v-divider>
      </div>
      <v-container fluid class="d-flex flex-wrap align-center justify-center">
        <div class="d-flex flex-wrap align-center justify-space-evenly">

          <v-card elevation="5" rounded="sm" color="transparent" class="ml-5 mt-2" v-for="image in images"
            :key="image.id">
            <v-img @mouseover="isSelected(image)" @mouseout="imageSelected = !imageSelected" style="cursor: pointer;"
              height="300" width="300" @click="selectImage(image)" :src="image.fileimage"
              class="text-end align-end test" cover>
              <span v-if="imageSelected && isSelectedImage.id == image.id" style="pointer-events: none;">
                <v-btn icon="mdi-cursor-default-click"></v-btn>
              </span>
            </v-img>
          </v-card>

          <v-overlay v-model="overlay" scroll-strategy="reposition" class="align-center justify-center">
            <v-card color="transparent" elevation="0" height="580px" width="380px">
              <template v-slot:append>
                <v-btn color="yellow-darken-2" icon="mdi-close" variant="text" rounded="xl"
                  @click.once="overlay = !overlay" />
              </template>
              <v-img rounded="sm" :src="selectedImage.fileimage" width="auto" height="400"></v-img>
              <template v-slot:prepend>
                <v-card-title class="text-orange">
                  {{ selectedImage.title }}
                </v-card-title>
              </template>
              <v-card-text class="text-white">
                {{ selectedImage.text }}
              </v-card-text>
            </v-card>
          </v-overlay>
        </div>
      </v-container>
    </v-container>

  </v-parallax>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const overlay = ref(false);
const selectedImage = ref(null);
const isSelectedImage = ref(null);
const imageSelected = ref(false);

const isSelected = (image: null) => {
  isSelectedImage.value = image;
  imageSelected.value = true;
}

const selectImage = (image: null) => {
  selectedImage.value = image;
  overlay.value = true;
};

const images = reactive([
  { id: 0, fileimage: '/src/assets/work1.webp', title: "Title1", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 1, fileimage: '/src/assets/work2.webp', title: "Title2", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 2, fileimage: '/src/assets/work3.webp', title: "Title3", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 3, fileimage: '/src/assets/work4.webp', title: "Title4", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 4, fileimage: '/src/assets/work5.webp', title: "Title5", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 5, fileimage: '/src/assets/work6.webp', title: "Title6", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 6, fileimage: '/src/assets/work7.webp', title: "Title7", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
  { id: 7, fileimage: '/src/assets/work8.webp', title: "Title8", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ut itaque ipsam repellat dignissimos ad saepe ducimus, numquam voluptate doloremque, placeat veritatis praesentium doloribus vel deleniti quos eum beatae sit." },
]);
</script>
