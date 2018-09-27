<template>
  <div>
    <!--margin-top 64px를 주기위한 빈 div-->
    <div style="min-height: 64px; background-color: #ffffff"></div>
    <!--footer시작-->
    <div class="footer footer-mobile">
      <v-layout wrap row pt-4 mb-4 class="footerContainer">
        <!-- 카드 1 로고사진  -->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <div class="sprite-img ic-only-logo-otc mb-4a"></div>
        </v-flex>
        <!-- 카드 2 Support -->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <p>{{$str("support")}}</p>
          <a @click="go_Guides()">
            <p>{{$str("guides")}}</p>
          </a>
          <a @click="go_FAQ()" >
            <p>{{$str("FAQ")}}</p>
          </a>
          <a @click="go_announcements()">
            <p>{{$str("announcements")}}</p>
          </a>
        </v-flex>
        <!-- 카드 3 Terms-->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <p>{{$str("terms")}}</p>
          <a @click="go_Terms_of_Service()">
            <p>{{$str("terms_Of_Service")}}</p>
          </a>
          <a @click="go_Transaction_Regulations()">
            <p>{{$str("transaction_Regulations")}}</p>
          </a>
          <a @click="go_Fees()">
            <p>{{$str("fees")}}</p>
          </a>
          <a @click="go_Terms_Of_Privacy_Policy()">
            <p>{{$str("Terms_Of_Privacy_Policy")}}</p>
          </a>
          <a @click="go_KYC_Policies()" >
            <p>{{$str("KYC&AML_Policies")}}</p>
          </a>
        </v-flex>
        <!-- 카드 4 Contact Us-->
        <v-flex xs12 md3 mt-4 class="footer-top">
          <p>{{$str("contact_Us")}}</p>
          <a href="https://www.allblab.com" target="_blank">
            <p>support@allblab.com</p>
          </a>
        </v-flex>
      </v-layout>
    <v-divider></v-divider>
    <!-- 언어설정버튼 -->
      <v-layout pt-4a pb-4a row wrap class="footerContainer ">
        <v-flex md6 xs12 mb-1 text-md-left>
          <div class="dropup">
            <!-- 중국어간체일때 -->
            <button v-if="currentLang=='ZH'" class="dropbtn vertical-center">
              <div class="sprite-img ic-chinese f-left"></div>
              <span class=" ml-2">简体中文<i class="material-icons md-12">keyboard_arrow_up</i></span>
            </button>
            <!-- 중국어번체일때 -->
            <button v-else-if="currentLang=='HK'" class="dropbtn vertical-center">
              <div class="sprite-img ic-chinese f-left"></div>
              <span class=" ml-2">繁體中文<i class="material-icons md-12">keyboard_arrow_up</i></span>
            </button>
            <!-- 영어모드일때 -->
            <button v-else-if="currentLang=='EN'" class="dropbtn vertical-center">
              <div class="sprite-img ic-english f-left"></div>
              <span class=" ml-2 " >English<i class="material-icons md-12">keyboard_arrow_up</i></span>
            </button>
            <!-- 한국어모드일때-->
            <button v-else class="dropbtn vertical-center">
              <div class="sprite-img ic-korean f-left"></div>
              <span class=" ml-2 ">한국어<i class="material-icons md-12">keyboard_arrow_up</i></span>
            </button>

            <!--언어 설정시 dropdown box-->
            <div class="dropup-content lang-menu">
              <!-- 언어 list 버튼-->
              <div  @click="changeLang('ZH')">简体中文
              </div>
              <div  @click="changeLang('HK')">繁體中文
              </div>
              <div  @click="changeLang('EN')">English
              </div>
              <div  @click="changeLang('KO')">한국어
              </div>
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
    import {
        abGetLang,
        abSetLang
    } from "../../config/localization";

    export default Vue.extend({
        name: 'abFooter',
        data: () => ({
            currentLang: 'EN',
        }),
        created() {
            this.currentLang = abGetLang();
        },
        methods: {
            changeLang: function(userLang) {
                abSetLang(userLang)
            },
            go_Guides(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/sections/360001880552-Beginners-Guide";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/zh-cn";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/zh-cn";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/zh-cn";
                    window.open(URL, "_blank");
                }
            },
            go_FAQ(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
            },
            go_announcements(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/sections/360001880491";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/sections/360001880491";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/sections/360001880491";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/sections/360001880491";
                    window.open(URL, "_blank");
                }
            },
            go_Terms_of_Service(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
            },
            go_Transaction_Regulations(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012615751";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012615751";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012615751";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012615751";
                    window.open(URL, "_blank");
                }
            },
            go_Fees(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us";
                    window.open(URL, "_blank");
                }
            },
            go_Terms_Of_Privacy_Policy(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012603291";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012603291";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012603291";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012603291";
                    window.open(URL, "_blank");
                }
            },
            go_KYC_Policies(){
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012389672";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012389672";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012389672";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012389672";
                    window.open(URL, "_blank");
                }
            },

        },

    });
</script>

<style scoped>
  @media only screen and (max-width: 959px) {
    .footer-mobile {
      margin-bottom: 68px;
    }
  }
  .footerContainer {
    max-width: 1224px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 959px) {
    .footerContainer {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .footer {
    background-color: #f8f8fa;
  }

  .footer p {
    color: #9294a6;
    font-size: 14px;
    margin-bottom: 16px !important;
  }

  .footer a {
    text-decoration: none;
  }

  .footer a p {
    color: #353535;
  }

  .footer a p:hover {
    color: #316ee4;
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
    text-align: center;
  }

  .dropup-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropup-content a:hover {
    background-color: #ccc
  }

  .dropup:hover .dropup-content {
    display: block;
  }

  .footer-top {
    text-align: left;
  }


</style>