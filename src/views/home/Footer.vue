<template>
  <v-footer
    height="auto"
    color="grey lighten-4"
    column
    wrap
    align-center
  >
    <v-container fluid grid-list-xs style="max-width: 1200px;" pl-0 pr-0 pt-0>
      <v-layout
        wrap
        row
        mt-5
      >
        <!-- 카드 1 로고사진  -->
        <v-flex xs12 md3 text-md-left>
          <div class="mb-4a">
              <img src="@/assets/img/logo_OTC.png">
          </div>
        </v-flex>
        <!-- 카드 2 Support -->
        <v-flex xs12 md3 text-md-left>
          <div class="TextDarkgray caption mb-3">{{$str("support")}}</div>
          <a class="TextBlack" href="https://vuetifyjs.com" target="_blank"><p>{{$str("guides")}}</p></a>
          <a class="TextBlack" href="https://vuetifyjs.com" target="_blank"><p>{{$str("FAQ")}}</p></a>
          <a class="TextBlack" href="https://vuetifyjs.com" target="_blank"><p>{{$str("announcements")}}</p></a>
          <div v-if="$vuetify.breakpoint.smAndDown" class=""> </div>
        </v-flex>
        <!-- 카드 3 Terms-->
        <v-flex xs12 md3 text-md-left>
          <p class="TextDarkgray">{{$str("terms")}}</p>
          <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>{{$str("terms_Of_Service")}}</p></a>
          <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>{{$str("transaction_Regulations")}}</p></a>
          <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>{{$str("fees")}}</p></a>
        </v-flex> b b
        <!-- 카드 4 Contact Us-->
        <v-flex xs12 md3 text-md-right  class="grey lighten-4">
          <p class="TextDarkgray">{{$str("contact_Us")}}</p>
          <a class="black--text " href="https://vuetifyjs.com" target="_blank"><div class="mb-5">support@allblab.com</div></a>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <!--언어설정 버튼-->
      <v-layout justify-center mt-4>
        <v-menu offset-y open-on-hover >
          <v-btn  flat style="font-weight: 400" slot="activator" v-if="currentLang=='KO'"> <img src="@/assets/img/flag3.png">한국어▼</v-btn>
          <v-btn  flat style="font-weight: 400" slot="activator" v-else-if="currentLang=='EN'"> <img src="@/assets/img/flag2.png">English▼</v-btn>
          <v-btn  flat style="font-weight: 400" slot="activator" v-else> <img src="@/assets/img/flag1.png">简体中文▼</v-btn>
          <v-list>
            <v-list-tile  v-for="(language, index) in languages"   :key="index"  @click="changeLang(language.code)">
              <v-list-tile-title>{{ language.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {abGetLang, abSetLang} from "../../config/localization";

    export default Vue.extend({    
        name: 'abFooter',
         data: () => ({
         icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ],
        support: [
          'Guides',
          'FAQ',
          'Announcements',
          'Terms of Service',
          'Transaction Regulations',
          'Fees',
          'Terms of Privacy Policy',
          'KYC&AML Policies',
          // &amp; => &;
          'Support@allb.com'
        ],
         languages: [
             {title: '한국어', code: 'KO'},
             {title: '简体中文', code: 'ZH'},
             {title: 'English', code: 'EN'},
         ],
          currentLang : 'EN',
      }),
        methods : {
            changeLang: function (userLang) {
                abSetLang(userLang)
            }
        },
        created() {
            this.currentLang = abGetLang();
        },

    });
</script>

<style scoped>
  a{
    text-decoration: none;

  }
  p{
    margin-bottom: 16px;
    font-size : 12px;
  }
</style>