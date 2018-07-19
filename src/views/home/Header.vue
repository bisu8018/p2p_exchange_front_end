<template>
    <div >
        <div class="headerFirst BGNav">
            <!-- 모바일 일때-->
            <div v-if="isMobile" >
                <v-layout style="height:64px;">
                    <!--logo-->
                    <div style="padding-top: 20px;  padding-left: 16px; ">
                        <img @click="goMain()" src="@/assets/img/logo_color.png" style="width: 30px; height: 24px;">
                    </div>
                    <!--아래의 이 spacer는 가운데 빈 여백을 알아서 할당해 주는 코드임-->
                    <v-spacer> </v-spacer>
                    <!--햄버거 bar-->
                    <div class="mr-3" style="margin-top: 20px">
                        <v-icon style="color: #ffffff; width: 24px; height: 16px;" @click.stop="drawer = !drawer">menu</v-icon>
                    </div>
                </v-layout>

                <!-- navigation drawer 열렸을 시 나오는 menu bar-->
                <div v-if="drawer" @click.stop="drawer = !drawer">
                    <div style="position: relative; z-index:100;" class="BGNav">
                        <v-layout row wrap >
                            <!-- TradeCenter버튼-->
                            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
                                <div class="button-2 " style="color: #ffffff;" right flat  @click="goTradeCenter()">{{$str("TradeCenter")}}</div>
                            </v-flex>
                            <!-- BlockTrade 버튼-->
                            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
                                <div class="button-2" style="color: #ffffff;  " flat >{{$str("BlockTrade")}}</div>
                            </v-flex>
                            <!-- post AD 버튼 -->
                            <v-flex xs12 text-xs-left mt-3 pb-3 >
                                <div class="button-2" style="color: #ffffff; " flat @click.stop="postadDrawer = !postadDrawer">
                                    <div class="ml-3">{{$str("postAd")}}</div>
                                </div>
                            </v-flex>
                            <!--post AD 눌렀을때 나오는 세부항목-->
                            <div class="xs12 text-xs-left" style="width: 100%">
                              <div v-if="postadDrawer" style=" background-color: #21407e; ">
                                <!--post general AD-->
                                <v-flex xs12 text-xs-left pb-3 ml-5 pt-3>
                                    <div class="button-2" @click="goPostGeneralAd" style="color: #ffffff; " flat >
                                        {{$str("Post_General_AD")}}</div>
                                </v-flex>
                                <!--post block AD-->
                                <v-flex xs12 text-xs-left pt-3  ml-5 pb-3>
                                    <div class="button-2" @click="goPostBlockAd" style="color: #ffffff; " flat >
                                        {{$str("Post_Block_AD")}}</div>
                                </v-flex>
                                </div>
                            </div>

                            <!-- login 버튼-->
                            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
                                <div class="button-2" style="color: #ffffff; "  flat  @click="goLogin()">{{$str("loginText")}}</div>
                            </v-flex>
                            <!-- signup 버튼-->
                            <v-flex xs12 text-xs-left mt-3 mb-4 ml-3>
                                <div class="button-2" style="color: #ffffff;" flat  @click="goSignup()">{{$str("signupText")}}</div>
                            </v-flex>
                        </v-layout>
                    </div>
                </div>
            </div>

            <!-- 웹일때 -->
            <div  v-else class="headerMainWrapper">
                <v-layout class="webHeadercontent"align-center row fill-height>
                    <!-- logo버튼-->
                    <div  @click="goMain()" class="ml-4">
                        <img  src="@/assets/img/logo_color.png" style="width: 38px; height: 33px;">
                    </div>
                    <!-- TradeCenter버튼-->
                    <div   @click="goTradeCenter()" class="button-2 ml-4a" style="color: #ffffff; ">{{$str("TradeCenter")}}</div>
                    <!-- BlockTrade 버튼-->
                    <div class="button-2 ml-4a" style="color: #ffffff; ">{{$str("BlockTrade")}}</div>
                    <!-- post AD 버튼 -->
                    <div class="dropDownBtn">
                      <!-- default post AD 버튼-->
                        <button  class="button-2 ml-4a" style="color: #ffffff; ">{{$str("postAd")}}
                          <div class="dropDown-content dropDown-PostAd">
                            <div @click="goPostGeneralAd">{{$str("Post_General_AD")}}</div>
                            <div @click="goPostBlockAd">{{$str("Post_Block_AD")}}</div>
                          </div>
                        </button>
                    </div>

                    <!--아래의 v-spacer는 중간여백을 주기 위함으로 삭제해도 무관-->
                    <v-spacer></v-spacer>

                    <!-- 로그인시 내정보 버튼 -->

                  <div class="dropDownBtn mr-4a">
                    <button  class="button-2 ml-4a" style="color: #ffffff; ">{{$str("MyPage")}}
                      <div class="dropDown-content dropDown-MyPage">
                        <!-- 내 정보 list 버튼-->
                        <div @click="goMyInfo('MyOrder')">{{$str("MyOrder")}}</div>
                        <div @click="goMyInfo('MyAds')">{{$str("MyAds")}}</div>
                      </div>
                    </button>
                  </div>
                    <!--내 정보 끝-->


                    <!-- login 버튼 -->
                    <div  class="button-2 mr-4a" style="color: #ffffff; " @click="goLogin()">{{$str("loginText")}}</div>
                    <!-- signup 버튼-->
                    <div  class="button-2 mr-4a" style="color: #ffffff; " @click="goSignup()">{{$str("signupText")}}</div>
                    <!-- 언어설정버튼 -->
                    <div class="dropDownBtn mr-4a">
                      <!-- 한국어-->
                      <div style="display: inline-block;"  v-if="currentLang=='KO'">
                          <img src="@/assets/img/flag3.png">
                          <span class=" ml-2 TextWhite">한국어<v-icon small >keyboard_arrow_down</v-icon></span>
                      </div>
                      <!-- 영어 -->
                      <div style="display: inline-block;"  v-else-if="currentLang=='EN'" >
                          <img src="@/assets/img/flag2.png">
                          <span class=" ml-2 TextWhite" >English<v-icon small >keyboard_arrow_down</v-icon></span>
                      </div>
                      <!-- 중국어 -->
                      <div style="display: inline-block;"  v-else>
                          <img src="@/assets/img/flag1.png">
                          <span class=" ml-2 TextWhite">简体中文<v-icon small >keyboard_arrow_down</v-icon></span>
                      </div>
                      <!--언어 설정시 dropdown box-->
                      <div class="dropDown-content dropDown-Lang">
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
        <div style="position: relative; width: 100%; z-index: 0; height:64px;"> </div>
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