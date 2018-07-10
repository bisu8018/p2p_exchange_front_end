<template>
  <v-parallax>
     <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
  </v-parallax>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'abMain',
    data () {
      return {
        items: [
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/sky.jpg'
          },
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/bird.jpg'
          },
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/planet.jpg'
          }
        ]
      }
    },
    methods: {
        goLogin() {
        this.$router.push("/login");
      },
      goSignup() {
        this.$router.push("/signup");
      }
    }
});
</script>

<style>
</style>