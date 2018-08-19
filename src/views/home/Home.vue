<template>
  <v-app v-if="isInitCompleted">
    <abHeader></abHeader>
    <v-content class="bg-white mt-6">
      <alert></alert>
      <div class="mainView" :class="{ fullSizeMainView : isFullSize }">
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
    import Alert from './../../components/Alerts.vue';


    export default Vue.extend({
        name: 'home',
        components: {
            AbHeader,
            AbFooter,
            Alert,
        },
        data() {
            return {
                isMobileMode: false,
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            isFullSize() {
                if (this.$route.name === 'abMain') {
                    return true;
                } else {
                    return false;
                }
            },
            isInitCompleted() {
              return MainRepository.State.isInitCompleted();
            },
        },
        beforeCreate: function() {
            // vuex store를 넘겨준다.
            MainRepository.init(this.$store, function() {
                //console.log("MainRepository");
            });

            MainRepository.initRouterController(this.$router);
        },
        created(){
            this.$eventBus.$on('goLogin', (status) => {
                this.$router.push("/login");
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
                } else { // PC 버전으로 전환됨
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
  /* 웹에서 최대 size 주기*/

  @media only screen and (min-width: 960px) {
    .mainView {
      max-width: 1224px;
      min-height: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    /*main일때만 예외로 width 할당*/
    .fullSizeMainView {
      max-width: 100%;
    }
  }

  /* mobile 에서 gutter 주기*/

  @media only screen and (max-width: 959px) {
    .mainView {
      padding-left: 12px;
      padding-right: 12px;
      min-height: 400px;
    }
    /*main일때만 예외로 width 할당*/
    .fullSizeMainView {
      padding: 0px;
      max-width: 100%;
    }
  }
</style>