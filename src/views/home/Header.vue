<template>
 <div>
  <v-toolbar flat dark color="BGNav"  app fixed style="min-height:64px" wrap >
    <!-- 웹일때 -->
    <v-layout  v-if="$vuetify.breakpoint.mdAndUp" >
        <v-spacer></v-spacer>
          <v-container  style=" min-height:64px; max-width: 1200px; padding-top: 8px" pr-0 pl-0 pb-0  wrap >
            <v-layout row wrap>
              <v-flex md5 text-xs-left >
                <!-- logo버튼-->
                <v-btn flat style="font-weight: 400;" @click="goMain()" >
                  <img  src="@/assets/img/logo_color.png" style="width: 38px; height: 33px;">
                </v-btn>
                <!-- OTC버튼-->
                <v-btn flat style="font-weight: 400" @click="goTradeCenter()">OTC</v-btn>
                <!-- Exchange 버튼-->
                <v-btn  flat style="font-weight: 400">{{$str("exchange")}}</v-btn>
                <!-- post AD 버튼 -->
                <v-btn  flat style="font-weight: 400">{{$str("postAd")}}</v-btn>
              </v-flex>

              <v-flex md7 text-xs-right >
                <!-- assets -->
                <v-btn  flat style="font-weight: 400">{{$str("assets")}}</v-btn>
                <!-- order버튼 -->
                <v-btn  flat style="font-weight: 400">{{$str("order")}}</v-btn>
                <!-- 언어설정버튼 -->
                <v-menu offset-y open-on-hover>
                  <v-btn  flat style="font-weight: 400" slot="activator" v-if="currentLang=='KO'"> <img src="@/assets/img/flag3.png">한국어▼</v-btn>
                  <v-btn  flat style="font-weight: 400" slot="activator" v-else-if="currentLang=='EN'"> <img src="@/assets/img/flag2.png">English▼</v-btn>
                  <v-btn  flat style="font-weight: 400" slot="activator" v-else> <img src="@/assets/img/flag1.png">简体中文▼</v-btn>
                  <v-list>
                    <v-list-tile  v-for="(language, index) in languages"   :key="index"  @click="changeLang(language.code)">
                      <v-list-tile-title>{{ language.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <!-- login 버튼 -->
                <v-btn  flat style="font-weight: 400" @click="goLogin()">{{$str("loginText")}}</v-btn>
                <!-- signup 버튼-->
                <v-btn  flat style="font-weight: 400" @click="goSignup()">{{$str("signupText")}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-spacer></v-spacer>
    </v-layout>

    <!-- 모바일 일때-->
    <v-layout v-else >
      <v-btn flat>
        <img @click="goMain()" src="@/assets/img/logo_color.png" style="width: 30px; height: 24px;">
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    </v-layout>
  </v-toolbar>

  <v-navigation-drawer v-model="drawer" temporary right app>
     <v-list class="pa-1">
          <v-list-tile>        
            <v-list-tile-content>
              <v-list-tile-title class="title" @click="goMain()">ALLB</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.name" @click="item.name=='login' ? goLogin() : (item.name=='signup' ? goSignup() : (item.name=='tradeCenter' ? goTradeCenter() : goPostAd()))">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {abGetLang, abSetLang} from "../../config/localization";
  
  export default Vue.extend({
    name: 'abHeader',
    data: () => ({        
        title : 'header',
        drawer: null,
        items: [
          { title: 'Log In' ,name: 'login'},
          { title: 'Sign Up', name: 'signup'},
          { title: 'Trade Center', name: 'tradeCenter'},
          { title: 'Post AD', name: 'postAd'}
        ],
        languages: [
            {title: '한국어', code: 'KO'},
            {title: '简体中文', code: 'ZH'},
            {title: 'English', code: 'EN'},
        ],
        currentLang : 'EN',


    }),
     methods: {      
        goSignup(){
            this.$router.push("/signup");
        },
        goLogin() {
             this.$router.push("/login");
        },
        goMain() {
          this.$router.push("/abMain");
        },
        goTradeCenter() {
          this.$router.push("/tradeCenter");
        },
        goPostAd() {
          this.$router.push("/postAd");
        },
         changeLang: function (userLang) {
             abSetLang(userLang)
             this.currentLang = userLang

         }
     },
      created() {
        this.currentLang = abGetLang();
      },

  });
</script>

<style>
  
</style>