<template>

    <div class="footer">
      <v-layout wrap row mt-5 class="footerContainer">
        <!-- 카드 1 로고사진  -->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <img class="mb-4a" src="@/assets/img/logo_OTC.png">
        </v-flex>
        <!-- 카드 2 Support -->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <p >{{$str("support")}}</p>
          <a  href="https://www.allblab.com"><p>{{$str("guides")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("FAQ")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("announcements")}}</p></a>
        </v-flex>
        <!-- 카드 3 Terms-->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <p >{{$str("terms")}}</p>
          <a  href="https://www.allblab.com" ><p>{{$str("terms_Of_Service")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("transaction_Regulations")}}</p></a>
          <a href="https://www.allblab.com" ><p>{{$str("fees")}}</p></a>
          <a href="https://www.allblab.com" ><p>{{$str("Terms_Of_Privacy_Policy")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("KYC&AML_Policies")}}</p></a>
        </v-flex>
        <!-- 카드 4 Contact Us-->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <p>{{$str("contact_Us")}}</p>
          <a  href="https://www.allblab.com"><p>support@allblab.com</p></a>
        </v-flex>
      </v-layout>
      <v-divider ></v-divider>
      <!-- 언어설정버튼 -->
      <v-layout mt-4a mb-4a row wrap class="footerContainer">
        <v-flex md6 xs12 mb-3 text-xs-center text-md-left>
          <!-- 한국어모드일때-->
          <button v-if="currentLang=='KO'">
            <img src="@/assets/img/flag3.png">
            <span class=" ml-2 ">한국어<v-icon small >keyboard_arrow_up</v-icon></span>
          </button>
          <!-- 영어모드일때 -->
          <button  v-else-if="currentLang=='EN'" >
            <img src="@/assets/img/flag2.png">
            <span class=" ml-2 " >English<v-icon small >keyboard_arrow_up</v-icon></span>
          </button>
          <!-- 중국어모드일때 -->
          <button v-else>
            <img src="@/assets/img/flag1.png">
            <span class=" ml-2">简体中文<v-icon small >keyboard_arrow_up</v-icon></span>
          </button>
          <!--언어 설정시 dropdown box-->
          <div class="">
            <!-- 내 정보 list 버튼-->
            <button @click="changeLang('KO')">한국어</button>
            <button @click="changeLang('ZH')">简体中文</button>
            <button @click="changeLang('EN')">English</button>
          </div>
        </v-flex>

        <v-flex md6 xs12 text-md-right>
          <span>© 2018 allb.com</span>
        </v-flex>
      </v-layout>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue';
    import {abGetLang, abSetLang} from "../../config/localization";

    export default Vue.extend({
        name: 'abFooter',
        data: () => ({
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

  .footerContainer{
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

</style>