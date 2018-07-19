<template>

    <div class="footer">
      <v-layout wrap row mt-5 style="max-width: 1200px">
        <!-- 카드 1 로고사진  -->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <div class="mb-4a">
            <img src="@/assets/img/logo_OTC.png">
          </div>
        </v-flex>
        <!-- 카드 2 Support -->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <p class="TextDarkgray">{{$str("support")}}</p>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p>{{$str("guides")}}</p></a>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p>{{$str("FAQ")}}</p></a>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p >{{$str("announcements")}}</p></a>
          <div v-if="$vuetify.breakpoint.smAndDown" class=""> </div>
        </v-flex>
        <!-- 카드 3 Terms-->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <p class="TextDarkgray">{{$str("terms")}}</p>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p>{{$str("terms_Of_Service")}}</p></a>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p>{{$str("transaction_Regulations")}}</p></a>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p>{{$str("fees")}}</p></a>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p>{{$str("Terms_Of_Privacy_Policy")}}</p></a>
          <a class="TextBlack" href="https://www.allblab.com" target="_blank"><p>{{$str("KYC&AML_Policies")}}</p></a>
        </v-flex>
        <!-- 카드 4 Contact Us-->
        <v-flex xs12 md3 text-md-left text-xs-left>
          <p class="TextDarkgray">{{$str("contact_Us")}}</p>
          <a class="TextBlack " href="https://www.allblab.com" target="_blank"><p>support@allblab.com</p></a>
        </v-flex>
      </v-layout>
      <v-divider ></v-divider>
      <!-- 언어설정버튼 -->
      <v-layout mt-4a mb-4a row wrap style="max-width: 1200px">
        <v-flex md6 xs12 mb-3 class="dropDownBtn" text-xs-center text-md-left>
          <!-- 한국어모드일때-->
          <div style="display: inline-block;"  v-if="currentLang=='KO'">
            <img src="@/assets/img/flag3.png">
            <span class=" ml-2 TextBlack">한국어<v-icon small >keyboard_arrow_up</v-icon></span>
          </div>
          <!-- 영어모드일때 -->
          <div style="display: inline-block;"  v-else-if="currentLang=='EN'" >
            <img src="@/assets/img/flag2.png">
            <span class=" ml-2 TextBlack" >English<v-icon small >keyboard_arrow_up</v-icon></span>
          </div>
          <!-- 중국어모드일때 -->
          <div style="display: inline-block;" v-else>
            <img src="@/assets/img/flag1.png">
            <span class=" ml-2 TextBlack">简体中文<v-icon small >keyboard_arrow_up</v-icon></span>
          </div>
          <!--언어 설정시 dropdown box-->
          <div class="dropDown-content dropDown-Lang">
            <!-- 내 정보 list 버튼-->
            <div @click="changeLang('KO')">한국어</div>
            <div @click="changeLang('ZH')">简体中文</div>
            <div @click="changeLang('EN')">English</div>
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
    font-size : 14px;
  }
  .footer{

  }
  .dropDownBtn{
    position: relative;
    display: inline-block;

  }
  .dropDownBtn:hover .dropDown-content{
    display: block;
  }
  .dropDown-content{
    display: none;
    position: absolute;
    background-color: #ffffff;
    top: auto;
    bottom: 100%;
    z-index: 1;
  }
  .dropDown-content div{
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropDown-Lang{
    min-width: 104px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.34);
  }

</style>