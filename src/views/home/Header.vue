<template>
  <div >
    <div>
      <!-- 모바일 일때-->
      <div v-if="isMobile">
        <v-layout id="nav">
          <!--logo-->
          <div>
            <img @click="goMain()" src="@/assets/img/logo_color.png" id="logo">
          </div>
          <!--아래의 이 spacer는 가운데 빈 여백을 알아서 할당해 주는 코드임-->

          <!--햄버거 bar-->
          <div class="mr-3">
            <v-icon @click.stop="drawer = !drawer">menu</v-icon>
          </div>
        </v-layout>

        <!-- navigation drawer 열렸을 시 나오는 menu bar-->
        <div class="dropDownBtn" v-if="drawer" @click.stop="drawer = !drawer">
          <v-layout row wrap class="hello">
            <!-- TradeCenter버튼-->
            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
              <div right flat  @click="goTradeCenter()">{{$str("TradeCenter")}}</div>
            </v-flex>
            <!-- BlockTrade 버튼-->
            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
              <div flat >{{$str("BlockTrade")}}</div>
            </v-flex>
            <!-- post AD 버튼 -->
            <v-flex xs12 text-xs-left mt-3 pb-3 ml-3>
              <div flat @click.stop="postadDrawer = !postadDrawer">
                <div>{{$str("postAd")}}</div>
              </div>
            </v-flex>
            <!--post AD 눌렀을때 나오는 세부항목-->
            <div id="submenu">
              <div v-if="postadDrawer">
                <!--post general AD-->
                <v-flex xs12 text-xs-left pb-3 ml-5 pt-3>
                  <div @click="goPostGeneralAd" flat >
                    {{$str("Post_General_AD")}}</div>
                </v-flex>
                <!--post block AD-->
                <v-flex xs12 text-xs-left pt-3  ml-5 pb-3>
                  <div @click="goPostBlockAd" flat >
                    {{$str("Post_Block_AD")}}</div>
                </v-flex>
              </div>
            </div>

            <!-- login 버튼-->
            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
              <div flat  @click="goLogin()">{{$str("loginText")}}</div>
            </v-flex>
            <!-- signup 버튼-->
            <v-flex xs12 text-xs-left mt-3 mb-4 ml-3>
              <div flat  @click="goSignup()">{{$str("signupText")}}</div>
            </v-flex>
          </v-layout>
        </div>
      </div>

      <!-- 웹일때 -->
      <div  v-else>
        <v-layout align-center row fill-height>
          <!-- logo버튼-->
          <div  @click="goMain()" class="ml-4">
            <img  src="@/assets/img/logo_color.png" >
          </div>
          <!-- TradeCenter버튼-->
          <div   @click="goTradeCenter()" class="ml-4a">{{$str("TradeCenter")}}</div>
          <!-- BlockTrade 버튼-->
          <div class="ml-4a" >{{$str("BlockTrade")}}</div>
          <!-- post AD 버튼 -->
          <div >
            <!-- default post AD 버튼-->
            <button  class="ml-4a">{{$str("postAd")}}
              <div>
                <div @click="goPostGeneralAd">{{$str("Post_General_AD")}}</div>
                <div @click="goPostBlockAd">{{$str("Post_Block_AD")}}</div>
              </div>
            </button>
          </div>

          <!--아래의 v-spacer는 중간여백을 주기 위함으로 삭제해도 무관-->
          <v-spacer></v-spacer>

          <!-- 로그인시 내정보 버튼 -->

          <div class=" mr-4a">
            <button class="ml-4a" >{{$str("MyPage")}}
              <div class="">
                <!-- 내 정보 list 버튼-->
                <div @click="goMyInfo('MyOrder')">{{$str("MyOrder")}}</div>
                <div @click="goMyInfo('MyAds')">{{$str("MyAds")}}</div>
              </div>
            </button>
          </div>
          <!--내 정보 끝-->


          <!-- login 버튼 -->
          <button  class="mr-4a" @click="goLogin()">{{$str("loginText")}}</button>
          <!-- signup 버튼-->
          <div  class="mr-4a" @click="goSignup()">{{$str("signupText")}}</div>
          <!-- 언어설정버튼 -->
          <div class="mr-4a">
            <!-- 한국어-->
            <div   v-if="currentLang=='KO'">
              <img src="@/assets/img/flag3.png">
              <span class=" ml-2 ">한국어<v-icon small >keyboard_arrow_down</v-icon></span>
            </div>
            <!-- 영어 -->
            <div  v-else-if="currentLang=='EN'" >
              <img src="@/assets/img/flag2.png">
              <span class=" ml-2" >English<v-icon small >keyboard_arrow_down</v-icon></span>
            </div>
            <!-- 중국어 -->
            <div   v-else>
              <img src="@/assets/img/flag1.png">
              <span class=" ml-2 ">简体中文<v-icon small >keyboard_arrow_down</v-icon></span>
            </div>
            <!--언어 설정시 dropdown box-->
            <div >
              <!-- 내 정보 list 버튼-->
              <div @click="changeLang('KO')">한국어</div>
              <div @click="changeLang('ZH')">简体中文</div>
              <div @click="changeLang('EN')">English</div>
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
    import {abGetLang, abSetLang} from "../../config/localization";
    import MainRepository from "../../vuex/MainRepository";

    export default Vue.extend({
        name: 'abHeader',
        data: () => ({
            title : 'header',
            drawer: false,
            postadDrawer : false,

            languages: [
                {title: '한국어', code: 'KO'},
                {title: '简体中文', code: 'ZH'},
                {title: 'English', code: 'EN'},
            ],
            currentLang : 'KO',


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
            goPostGeneralAd() {
                this.$router.push("/generalAd");
            },
            goPostBlockAd() {
                this.$router.push("/blockAd");
                //this.$router.push("/postAd?block");
            },
            goMyInfo(myInfo){
                switch(myInfo){
                    case 'MyOrder':
                        this.$router.push("/myOrder");
                        break;

                    case 'MyAds':
                        this.$router.push("/myAds");
                        break;
                }
            },

            changeLang: function (userLang) {
                abSetLang(userLang);
                this.currentLang = userLang
            },

        },
        computed : {
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
    padding-top: 20px;
    padding-left: 16px;
    background-color: #002970;

  }

  #submenu {
    width: 100%;
    background-color: #21407e;
  }

  #logo {
    width: 30px;
    height: 24px;
  }






  .hello {
    z-index: 100;
    position: absolute;
    width: 100%;
    color: white;
    background-color: #002970;
    display: inline-block;
  }




  .headerFirst{
    position: fixed;
    z-index:100 ;
    width: 100%;

  }
  .headerMainWrapper{
    min-height:64px;


  }
  .webHeadercontent{
    margin-left: auto;
    margin-right: auto;
    min-height:64px;
  }

  .dropDownBtn:hover .dropDown-content{
    display: block;
  }
  .dropDown-content{
    display: none;
    position: absolute;
    background-color: #ffffff;
    top: 42px;
    z-index: 1;
  }
  .dropDown-content div{
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropDown-PostAd{
    min-width: 215px;
    text-align: left;
    box-shadow: 1px 1px 8px 0px rgba(0,0,0,0.23);
  }
  .dropDown-Lang{
    min-width: 104px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.34);
  }
  .dropDown-MyPage{
    min-width: 104px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.34);
  }

</style>