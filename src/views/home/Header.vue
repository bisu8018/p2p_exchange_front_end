<template>
  <div>
    <div>
      <!-- 모바일 일때-->
      <div v-if="isMobile">
        <v-layout id="nav" class="align-center">
          <!--logo-->
          <div class="ml-3">
            <img @click="goMain()" src="@/assets/img/logo_color.png" id="logo">
          </div>
          <!--아래의 이 spacer는 가운데 빈 여백을 알아서 할당해 주는 코드임-->
          <v-spacer> </v-spacer>
          <!--햄버거 bar-->
          <div class="mr-3">
            <a><i class="material-icons md-light md-36" @click.stop="drawer = !drawer">menu</i></a>
          </div>
        </v-layout>

        <!-- navigation drawer 열렸을 시 나오는 menu bar-->
        <div class="dropDownBtn" v-if="drawer" @click.stop="drawer = !drawer">
          <v-layout row wrap id="dropDownMenu">
            <!-- TradeCenter버튼-->
            <v-flex xs12 class="verticalcentertext" @click="goTradeCenter()">
              <button class="text-xs-left ml-3">
                <div right flat >{{$str("TradeCenter")}}</div>
              </button>
            </v-flex>
            <!-- BlockTrade 버튼-->
            <v-flex xs12 class="verticalcentertext">

              <button class="text-xs-left ml-3">
                <div flat>{{$str("BlockTrade")}}</div>
              </button>
            </v-flex>
            <!-- post AD 버튼 -->
            <v-flex xs12 class="verticalcentertext" @click.stop="postadDrawer = !postadDrawer">

              <button class="text-xs-left ml-3">
                <div>
                  <div>{{$str("postAd")}}</div>
                </div>
              </button>
            </v-flex>
            <!--post AD 눌렀을때 나오는 세부항목-->
            <div id="submenu">
              <div v-if="postadDrawer">
                <!--post general AD-->
                <v-flex xs12 class="verticalcentertext" @click="goPostGeneralAd" >
                  <button class="text-xs-left ml-5">
                    <div flat>
                      {{$str("Post_General_AD")}}</div>
                  </button>
                </v-flex>
                <!--post block AD-->
                <v-flex xs12 class="verticalcentertext" @click="goPostBlockAd" >
                  <button class="text-xs-left ml-5">
                    <div>
                      {{$str("Post_Block_AD")}}</div>
                  </button>
                </v-flex>
              </div>
            </div>

            <!-- login 버튼-->
            <v-flex xs12 class="verticalcentertext" @click="goLogin()">
              <button class="text-xs-left ml-3">
                <div>{{$str("loginText")}}</div>
              </button>
            </v-flex>
            <!-- signup 버튼-->
            <v-flex xs12 class="verticalcentertext" @click="goSignup()">
              <button class="text-xs-left ml-3">
                <div>{{$str("signupText")}}</div>
              </button>
            </v-flex>

            <!-- 로그인시 추가되는 화면들-->
            <v-flex xs12 class="verticalcentertext" @click="goMyOrder()">
              <button class="text-xs-left ml-3">
                <div>{{$str("order")}}</div>
              </button>
            </v-flex>
            <v-flex xs12 class="verticalcentertext" @click="goBalances()">
              <button class="text-xs-left ml-3">
                <div>{{$str("Balances")}}</div>
              </button>
            </v-flex>
            <v-flex xs12 class="verticalcentertext" @click="goMyAds()">
              <button class="text-xs-left ml-3">
                <div>{{$str("MyAds")}}</div>
              </button>
            </v-flex>
            <v-flex xs12 class="verticalcentertext" @click="goUserCenter()">
              <button class="text-xs-left ml-3">
                <div>{{$str("UserCenter")}}</div>
              </button>
            </v-flex>
            <v-flex xs12 class="verticalcentertext" @click="goMerchant()">
              <button class="text-xs-left ml-3">
                <div>{{$str("Merchant")}}</div>
              </button>
            </v-flex>
            <v-flex xs12 class="verticalcentertext" @click="goLogOut()">
              <button class="text-xs-left ml-3">
                <div>{{$str("LogOut")}}</div>
              </button>
            </v-flex>
          </v-layout>
        </div>
      </div>

      <!-- 웹일때 -->
      <div v-else>
        <v-layout align-center row id="nav">
          <!-- logo버튼-->
          <button @click="goMain()" class="ml-4">
            <img src="@/assets/img/logo_color.png" id="logo">
          </button>
          <!-- TradeCenter버튼-->

          <button @click="goTradeCenter()" class="ml-4a">{{$str("TradeCenter")}}</button>
          <!-- BlockTrade 버튼-->
          <button class="ml-4a">{{$str("BlockTrade")}}</button>
          <!-- post AD 버튼 -->
          <!-- default post AD 버튼-->
          <button class="ml-4a dropDownBtn">{{$str("postAd")}}
            <div class="dropDown-content pl-3 pt-3 pr-3">
              <div class="pb-3 text-md-left" @click="goPostGeneralAd">{{$str("Post_General_AD")}}</div>
              <div class="pb-3 text-md-left" @click="goPostBlockAd">{{$str("Post_Block_AD")}}</div>
            </div>
          </button>

          <!--아래의 v-spacer는 중간여백을 주기 위함으로 삭제해도 무관-->
          <v-spacer></v-spacer>

          <!-- 로그인시 내정보 버튼 -->
          <!--기능 구현을 위해 만들어 놓음. 로그인 시 생겨야 하는 버튼들-->

          <!--MyOrder-->
          <button class="button-2 mr-4a" @click="goMyOrder()">{{$str("MyOrder")}}</button>
          <!--Balances -->
          <button class="button-2 mr-4a" @click="goBalances()">{{$str("Balances")}}</button>
          <!-- My Ads-->
          <button class="button-2 mr-4a" @click="goMyAds()">{{$str("MyAds")}}</button>

          <!--내 정보 끝-->


          <!-- login 버튼 -->
          <button class="button-2 mr-4a" @click="goLogin()">{{$str("loginText")}}</button>
          <!-- signup 버튼-->
          <button class="button-2 mr-4a" @click="goSignup()">{{$str("signupText")}}</button>
          <!-- 언어설정버튼 -->
          <div class="dropDownBtn mr-4a" >
            <!-- 한국어-->
            <div style="display: inline-block;" v-if="currentLang=='KO'">
              <img src="@/assets/img/flag3.png">
              <span class=" ml-2">한국어<i class="material-icons md-light">keyboard_arrow_down</i></span>
            </div>
            <!-- 영어 -->
            <div style="display: inline-block;" v-else-if="currentLang=='EN'">
              <img src="@/assets/img/flag2.png">
              <span class=" ml-2">English<i class="material-icons md-light md-12">keyboard_arrow_down</i></span>
            </div>
            <!-- 중국어 -->
            <div style="display: inline-block;" v-else>
              <img src="@/assets/img/flag1.png">
              <span class=" ml-2">简体中文<v-icon small >keyboard_arrow_down</v-icon></span>
            </div>
            <!--언어 설정시 dropdown box-->
            <div class="dropDown-content dropDown-Lang">
              <!-- 내 정보 list 버튼-->
              <div class=" pl-3 pt-3 pb-3 text-md-left" @click="changeLang('KO')">한국어</div>
              <div class=" pl-3 pb-3 text-md-left" @click="changeLang('ZH')">简体中文</div>
              <div class=" pl-3 pb-3 text-md-left" @click="changeLang('EN')">English</div>
            </div>
          </div>
        </v-layout>

      </div>
    </div>
    <!--header 아래 contents 들이 겹쳐지지 않기 위한 빈 box-->
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        abGetLang,
        abSetLang
    } from "../../config/localization";
    import MainRepository from "../../vuex/MainRepository";

    export default Vue.extend({
        name: 'abHeader',
        data: () => ({
            title: 'header',
            drawer: false,
            postadDrawer: false,

            languages: [{
                title: '한국어',
                code: 'KO'
            },
                {
                    title: '简体中文',
                    code: 'ZH'
                },
                {
                    title: 'English',
                    code: 'EN'
                },
            ],
            currentLang: 'KO',


        }),
        methods: {
            goSignup() {
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
            goPostGeneralAd() {
                this.$router.push("/generalAd");
            },
            goPostBlockAd() {
                this.$router.push("/blockAd");
                //this.$router.push("/postAd?block");
            },
            goMyInfo(myInfo) {
                switch (myInfo) {
                    case 'MyOrder':
                        this.$router.push("/myOrder");
                        break;

                    case 'MyAds':
                        this.$router.push("/myAds");
                        break;
                }
            },
            goMyOrder(){
                this.$router.push("/myOrder");
            },
            goMyAds(){
                this.$router.push("/myAds");
            },
            goBalances(){
                this.$router.push("/balances");
            },

            changeLang: function(userLang) {
                abSetLang(userLang);
                this.currentLang = userLang
            },

        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            }
        },
        created() {
            this.currentLang = abGetLang();
        },

    });
</script>

<style>
  #nav {
    height: 64px;
    background-color: #002970;
    color: white;
  }

  #logo {
    width: 30px;
    height: 24px;
  }


  #dropDownMenu {
    z-index: 100;
    position: absolute;
    width: 100%;
    color: white;
    background-color: #002970;
  }

  #dropDownMenu .flex {
    padding-left: 0;
    padding-right: 0;
    height: 52px;
  }

  #submenu {
    width: 100%;
    background-color: #21407e;
  }

  #submenu.flex {
    height: 52px;
  }

  .verticalcentertext {
    align-items: center;
    display: flex;
  }

  .dropDownBtn:hover .dropDown-content, dropDownBtn:focus {
    display: block;
  }

  .dropDown-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    top: 64px;
    z-index: 0;
    box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.23);
    border-radius: 2px;
    font-weight: 400;

  }

  .dropDown-content div {
    color: black;
    text-decoration: none;
    display: block;
  }


  .dropDown-Lang {
    min-width: 104px;
  }

  .dropDown-MyPage {
    min-width: 104px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.34);
  }
</style>