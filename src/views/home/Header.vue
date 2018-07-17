<template>
    <div>
        <div style=" position: fixed; width: 100%; z-index:100 ;min-height:64px; " class="BGNav" wrap>
            <!-- 웹일때 -->
            <v-layout v-if="$vuetify.breakpoint.mdAndUp">
                <v-spacer></v-spacer>
                <v-container style="min-height:64px; max-width: 1200px; padding-top: 8px" pr-0 pl-0 pb-0 wrap>
                    <v-layout row wrap>
                        <v-flex md5 text-xs-left>
                            <!-- logo버튼-->
                            <v-btn flat @click="goMain()">
                                <img src="@/assets/img/logo_color.png" style="width: 38px; height: 33px;">
                            </v-btn>
                            <!-- OTC버튼-->
                            <v-btn flat @click="goTradeCenter()" class="button-2" style="color: #ffffff; ">OTC</v-btn>
                            <!-- Exchange 버튼-->
                            <v-btn flat class="button-2" style="color: #ffffff; ">{{$str("exchange")}}</v-btn>
                            <!-- post AD 버튼 -->
                            <v-btn flat class="button-2" style="color: #ffffff; ">{{$str("postAd")}}</v-btn>
                        </v-flex>

                        <v-flex md7 text-xs-right>
                            <!-- assets -->
                            <v-btn flat class="button-2" style="color: #ffffff; ">{{$str("assets")}}</v-btn>
                            <!-- order버튼 -->
                            <v-btn flat class="button-2" style="color: #ffffff; ">{{$str("order")}}</v-btn>

                            <!-- login 버튼 -->
                            <v-btn flat class="button-2" style="color: #ffffff; " @click="goLogin()">
                                {{$str("loginText")}}
                            </v-btn>
                            <!-- signup 버튼-->
                            <v-btn flat class="button-2" style="color: #ffffff; " @click="goSignup()">
                                {{$str("signupText")}}
                            </v-btn>
                            <!-- 언어설정버튼 -->
                            <v-menu offset-y open-on-hover>
                                <!-- 한국어-->
                                <v-btn flat slot="activator" v-if="currentLang=='KO'">
                                    <img src="@/assets/img/flag3.png">
                                    <div class="caption ml-2 TextWhite">한국어
                                        <v-icon small>keyboard_arrow_down</v-icon>
                                    </div>
                                </v-btn>
                                <!-- 영어 -->
                                <v-btn flat slot="activator" v-else-if="currentLang=='EN'">
                                    <img src="@/assets/img/flag2.png">
                                    <div class="caption ml-2 TextWhite">English
                                        <v-icon small>keyboard_arrow_down</v-icon>
                                    </div>
                                </v-btn>
                                <!-- 중국어 -->
                                <v-btn flat slot="activator" v-else>
                                    <img src="@/assets/img/flag1.png">
                                    <div class="caption ml-2 TextWhite">简体中文
                                        <v-icon small>keyboard_arrow_down</v-icon>
                                    </div>
                                </v-btn>
                                <v-list>
                                    <v-list-tile v-for="(language, index) in languages" :key="index"
                                                 @click="changeLang(language.code)">
                                        <v-list-tile-title>{{ language.title }}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>

                        </v-flex>
                    </v-layout>
                </v-container>
                <v-spacer></v-spacer>
            </v-layout>

            <!-- 모바일 일때-->
            <div v-else>
                <v-layout style="height:64px;">
                    <div style="padding-top: 20px;  padding-left: 16px; ">

                        <img @click="goMain()" src="@/assets/img/logo_color.png" style="width: 30px; height: 24px;">

                    </div>
                    <v-spacer></v-spacer>
                    <div class="mr-3" style="margin-top: 20px">
                        <v-icon class="" style="color: #ffffff; width: 24px; height: 16px;"
                                @click.stop="drawer = !drawer">menu
                        </v-icon>
                    </div>
                </v-layout>

                <!-- navigation drawer 열렸을 시 -->
                <v-flex xs12 v-if="drawer" @click.stop="drawer = !drawer" class="test2">
                    <div style="position: relative; z-index:100;" class="BGNav">
                        <v-layout row wrap>

                            <!-- OTC버튼-->
                            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
                                <div class="button-2 " style="color: #ffffff;" right flat @click="goTradeCenter()">OTC
                                </div>
                            </v-flex>

                            <!-- Exchange 버튼-->
                            <!--<v-flex xs12 text-xs-left mt-3 mb-3 ml-3>-->
                                <!--<div class="button-2" style="color: #ffffff;  " flat>{{$str("exchange")}}</div>-->
                            <!--</v-flex>-->

                            <!-- post AD 버튼 -->
                            <v-flex xs12 text-xs-left mt-3 pb-3>
                                <div class="button-2" style="color: #ffffff; " flat
                                     @click.stop="postadDrawer = !postadDrawer">
                                    <div class="ml-3">{{$str("postAd")}}</div>
                                </div>
                            </v-flex>
                            <!--post AD 눌렀을때 나오는 세부항목-->
                            <v-flex xs12 text-xs-left>
                                <div v-if="postadDrawer" style=" background-color: #21407e; ">
                                    <v-flex xs12 text-xs-left pb-3 ml-5 pt-3>
                                        <div class="button-2" style="color: #ffffff; " flat @click="goPostAd()">
                                            {{$str("Post_General_AD")}}
                                        </div>
                                    </v-flex>
                                    <v-flex xs12 text-xs-left pt-3 ml-5 pb-3>
                                        <div class="button-2" style="color: #ffffff; " flat @click="goPostAd()">{{$str("Post_Block_AD")}}
                                        </div>
                                    </v-flex>
                                </div>
                            </v-flex>


                            <!-- login 버튼-->
                            <v-flex xs12 text-xs-left mt-3 mb-3 ml-3>
                                <div class="button-2" style="color: #ffffff; " flat @click="goLogin()">
                                    {{$str("loginText")}}
                                </div>
                            </v-flex>
                            <!-- signup 버튼-->
                            <v-flex xs12 text-xs-left mt-3 mb-4 ml-3>
                                <div class="button-2" style="color: #ffffff;" flat @click="goSignup()">
                                    {{$str("signupText")}}
                                </div>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-flex>
            </div>
        </div>
        <div style="position: relative; width: 100%; z-index: 0; height:64px;"></div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {abGetLang, abSetLang} from "../../config/localization";

    export default Vue.extend({
        name: 'abHeader',
        data: () => ({
            title: 'header',
            drawer: false,
            postadDrawer: false,
            items: [
                {title: 'Log In', name: 'login'},
                {title: 'Sign Up', name: 'signup'},
                {title: 'Trade Center', name: 'tradeCenter'},
                {title: 'Post AD', name: 'postAd'}
            ],
            languages: [
                {title: '한국어', code: 'KO'},
                {title: '简体中文', code: 'ZH'},
                {title: 'English', code: 'EN'},
            ],
            currentLang: 'EN',


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
            goPostAd() {
                this.$router.push("/postAd");
            },
            changeLang: function (userLang) {
                abSetLang(userLang)
                this.currentLang = userLang
            },

        },
        created() {
            this.currentLang = abGetLang();
        },

    });
</script>

<style>
</style>