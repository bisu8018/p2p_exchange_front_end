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
                <v-flex xs12 v-if="drawer" @click.stop="drawer = !drawer">
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
                            <v-flex xs12 text-xs-left><div v-if="postadDrawer" style=" background-color: #21407e; ">
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
                            </v-flex>

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
                </v-flex>
            </div>

            <!-- 웹일때 -->
            <div  v-else class="headerMainWrapper">
                <v-layout class="webHeadercontent"row wrap>
                    <!-- logo버튼-->
                    <div  @click="goMain()" class="ml-4">
                        <img  src="@/assets/img/logo_color.png" style="width: 38px; height: 33px;">
                    </div>
                    <!-- TradeCenter버튼-->
                    <div   @click="goTradeCenter()" class="button-2 ml-4a" style="color: #ffffff; ">{{$str("TradeCenter")}}</div>
                    <!-- BlockTrade 버튼-->
                    <div class="button-2 ml-4a" style="color: #ffffff; ">{{$str("BlockTrade")}}</div>
                    <!-- post AD 버튼 -->
                    <v-menu offset-y open-on-hover >
                        <div  slot="activator" flat class="button-2 ml-4a" @click="goPostAd(GeneralAd)" style="color: #ffffff; ">{{$str("postAd")}}</div>
                        <!-- default post AD 버튼-->
                        <v-list>
                            <v-list-tile  v-for="(postAdType, index) in postAdTypes"  :key="index"  @click="goPostAd(postAdType.code)">
                                <v-list-tile-title>{{ postAdType.title }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                    <!--아래의 v-spacer는 중간여백을 주기 위함으로 삭제해도 무관-->
                    <v-spacer></v-spacer>
                    <!-- 로그인시 내정보 버튼 -->
                    <v-menu offset-y open-on-hover class="mr-4a">
                        <v-avatar slot="activator"  color="white"  :size="34">
                            <span class="TextBlack">My</span>
                        </v-avatar>
                        <!-- 내 정보 list 버튼-->
                        <v-list>
                            <v-list-tile  v-for="(myInfoItem, index) in myInfoItems"  :key="index"  @click="goMyInfo(myInfoItem.code)">
                                <v-list-tile-title>{{ myInfoItem.title }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                    <!--내 정보 끝-->


                    <!-- login 버튼 -->
                    <div  class="button-2 mr-4a" style="color: #ffffff; " @click="goLogin()">{{$str("loginText")}}</div>
                    <!-- signup 버튼-->
                    <div  class="button-2 mr-4a" style="color: #ffffff; " @click="goSignup()">{{$str("signupText")}}</div>
                    <!-- 언어설정버튼 -->
                    <v-menu offset-y open-on-hover mr-4a>
                        <!-- 한국어-->
                        <div slot="activator" v-if="currentLang=='KO'">
                            <img src="@/assets/img/flag3.png">
                            <div class=" ml-2 TextWhite">한국어<v-icon small >keyboard_arrow_down</v-icon></div>
                        </div>
                        <!-- 영어 -->
                        <div  slot="activator" v-else-if="currentLang=='EN'" >
                            <img src="@/assets/img/flag2.png">
                            <div class=" ml-2 TextWhite" >English<v-icon small >keyboard_arrow_down</v-icon></div>
                        </div>
                        <!-- 중국어 -->
                        <div slot="activator" v-else>
                            <img src="@/assets/img/flag1.png">
                            <div class=" ml-2 TextWhite">简体中文<v-icon small >keyboard_arrow_down</v-icon></div>
                        </div>
                        <!--언어 설정시 dropdown box-->
                        <v-list>
                            <v-list-tile  v-for="(language, index) in languages"   :key="index"  @click="changeLang(language.code)">
                                <v-list-tile-title>{{ language.title }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
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
            postAdTypes : [
                {title: 'Post General Ad', code: 'GeneralAd'},
                {title: 'Post Block Ad', code: 'BlockAd'},
            ],
            myInfoItems : [
                {title: 'My Order', code: 'MyOrder'},
                {title: 'My Ads', code: 'MyAds'},
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
}
</style>