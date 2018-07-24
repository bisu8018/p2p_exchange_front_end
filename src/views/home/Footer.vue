<template>

  <div class="footer">
    <div class="flex">
      <v-layout wrap row mt-4 mb-4 class="footerContainer">
        <!-- 카드 1 로고사진  -->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <img class="mb-4a" src="@/assets/img/logo_OTC.png">
        </v-flex>
        <!-- 카드 2 Support -->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <p >{{$str("support")}}</p>
          <a  href="https://www.allblab.com"><p>{{$str("guides")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("FAQ")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("announcements")}}</p></a>
        </v-flex>
        <!-- 카드 3 Terms-->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <p >{{$str("terms")}}</p>
          <a  href="https://www.allblab.com" ><p>{{$str("terms_Of_Service")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("transaction_Regulations")}}</p></a>
          <a href="https://www.allblab.com" ><p>{{$str("fees")}}</p></a>
          <a href="https://www.allblab.com" ><p>{{$str("Terms_Of_Privacy_Policy")}}</p></a>
          <a  href="https://www.allblab.com" ><p>{{$str("KYC&AML_Policies")}}</p></a>
        </v-flex>
        <!-- 카드 4 Contact Us-->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <p>{{$str("contact_Us")}}</p>
          <a  href="https://www.allblab.com"><p>support@allblab.com</p></a>
        </v-flex>
      </v-layout>
    </div>
    <v-divider></v-divider>
    <!-- 언어설정버튼 -->
    <div class="flex">
      <v-layout mt-4a mb-4a row wrap class="footerContainer">
        <v-flex md6 xs12 mb-1 text-md-left>
          <div class="dropup">
            <!-- 한국어모드일때-->
            <button v-if="currentLang=='KO'" class="dropbtn">
              <img src="@/assets/img/flag3.png">
              <span class=" ml-2 ">한국어<i class="material-icons md-12">keyboard_arrow_up</i></span>
            </button>
            <!-- 영어모드일때 -->
            <button  v-else-if="currentLang=='EN'" class="dropbtn">
              <img src="@/assets/img/flag2.png">
              <span class=" ml-2 " >English<i class="material-icons md-12">keyboard_arrow_up</i></span>
            </button>
            <!-- 중국어모드일때 -->
            <button v-else class="dropbtn">
              <img src="@/assets/img/flag1.png">
              <span class=" ml-2">简体中文<i class="material-icons md-12">keyboard_arrow_up</i></span>
            </button>
            <!--언어 설정시 dropdown box-->
            <div class="dropup-content pl-3">
              <!-- 내 정보 list 버튼-->
              <button class="mt-3 mb-3" @click="changeLang('KO')">한국어</button>
              <button @click="changeLang('ZH')">简体中文</button>
              <button class="mt-3 mb-3" @click="changeLang('EN')">English</button>
            </div>
          </div>
        </v-flex>

        <v-flex md6 xs12 text-md-right>
          <span>© 2018 allb.com</span>
        </v-flex>
      </v-layout>
    </div>

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
  .footer {
    background-color: #f8f8fa;
  }
  .footer p {
    color: #9294a6;
    font-size: 14px;
  }
  .footer a {
    text-decoration: none;
  }
  .footer a p{
    color: #353535;
  }

  .dropbtn {
    border: none;
  }

  .dropup {
    position: relative;
    display: inline-block;
  }

  .dropup-content {
    display: none;
    position: absolute;
    background-color: #fff;
    bottom: 20px;
    color: black;
    min-width: 104px;
    box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.23);
    z-index: 1;
    border-radius: 2px;
    font-weight: 400;
    text-align: left;
  }

  .dropup-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropup-content a:hover {background-color: #ccc}

  .dropup:hover .dropup-content {
    display: block;
  }

  .footer-top {
    text-align: left;
  }

  /* .dropdown:hover .dropbtn {background-color: #3e8e41;} */
</style>