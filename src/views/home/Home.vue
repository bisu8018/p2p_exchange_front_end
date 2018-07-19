<template>
  <v-app>
      <abHeader></abHeader>
      <v-content>
        <div class="mainView">
          <router-view></router-view>
        </div>
      </v-content>
      <abFooter></abFooter>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import MainRepository from "../../vuex/MainRepository";
import AbHeader from "./Header.vue"
import AbFooter from "./Footer.vue"

export default Vue.extend({
    name: 'home',    
    components: {
      AbHeader, AbFooter
    },
    data() {
      return {
          isMobileMode: false,
      }
    },
    computed: {
        isMobile() {
            console.log(MainRepository.State.isMobile())
            return MainRepository.State.isMobile();
        }
    },
    beforeCreate: function () {    
        // vuex store를 넘겨준다.
        MainRepository.init(this.$store, function () {
            console.log("MainRepository");
        })
    },
    mounted() {
        this.$nextTick(function() {
            window.addEventListener('resize', this.getWindowWidth);
            //Init
            this.getWindowWidth()
        })
    },
    methods: {
        getWindowWidth() {
            // 모바일 버전으로 전환됨
            if (document.documentElement.clientWidth < 960) {
                if (!this.isMobileMode) {
                    this.isMobileMode = true;
                    MainRepository.State.controller().setMobile(true);
                }
            } else {  // PC 버전으로 전환됨
                if (this.isMobileMode) {
                    this.isMobileMode = false;
                    MainRepository.State.controller().setMobile(false);
                }
            }
        },
    }
});
</script>

<style>
  .mainView{
    max-width: 1200px;
    min-height: 600px;
    margin-left: auto;
    margin-right: auto;


  }
</style>