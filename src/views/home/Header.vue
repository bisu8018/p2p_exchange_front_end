<template>
    <div>
        <div>
            <!-- 모바일 일때-->
            <div v-if="isMobile">
                <v-layout class="nav align-center">
                    <!--logo-->
                    <button @click="goMain()" class="ml-3">
                        <div class="sprite-img ic-logo"></div>
                    </button>
                    <!--아래의 이 spacer는 가운데 빈 여백을 알아서 할당해 주는 코드임-->
                    <v-spacer></v-spacer>
                    <!--햄버거 bar-->
                    <div class="mr-3">
                        <a><i class="material-icons md-light md-36" @click.stop="drawer = !drawer">menu</i></a>
                    </div>
                </v-layout>

                <!-- navigation drawer 열렸을 시 나오는 menu bar-->
                <div class="dropDownBtn mt-6" v-if="drawer" @click.stop="drawer = !drawer">
                    <v-layout row wrap class="dropDownMenu">
                        <!-- TradeCenter버튼-->
                        <v-flex xs12 class="verticalcentertext" @click="goTradeCenter()">
                            <button class="text-xs-left ml-3">
                                <div right flat>{{$str("TradeCenter")}}</div>
                            </button>
                        </v-flex>
                        <!-- BlockTrade 버튼-->
                        <v-flex xs12 class="verticalcentertext" @click="goBlockTrade()">

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
                        <div class="submenu">
                            <div v-if="postadDrawer">
                                <!--post general AD-->
                                <v-flex xs12 class="verticalcentertext" @click="goPostGeneralAd">
                                    <button class="text-xs-left ml-5">
                                        <div flat>
                                            {{$str("Post_General_AD")}}
                                        </div>
                                    </button>
                                </v-flex>
                                <!--post block AD-->
                                <v-flex xs12 class="verticalcentertext" @click="goPostBlockAd">
                                    <button class="text-xs-left ml-5">
                                        <div>
                                            {{$str("Post_Block_AD")}}
                                        </div>
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
                        <v-flex xs12 class="verticalcentertext" @click="goMyPage()">
                            <button class="text-xs-left ml-3">
                                <div>{{$str("MyPage")}}</div>
                            </button>
                        </v-flex>
                        <v-flex xs12 class="verticalcentertext">
                            <button class="text-xs-left ml-3" @click="onLogout()">
                                <div>{{$str("LogOut")}}</div>
                            </button>
                        </v-flex>
                    </v-layout>
                </div>
            </div>

            <!-- 웹일때 -->
            <div v-else>
                <v-layout align-center row class="nav">
                    <!-- logo버튼-->
                    <button @click="goMain()" class="ml-4">
                        <div class="sprite-img ic-logo"></div>
                    </button>
                    <!-- TradeCenter버튼-->

                    <button @click="goTradeCenter()" class="ml-4a">{{$str("TradeCenter")}}</button>
                    <!-- BlockTrade 버튼-->
                    <button @click="goBlockTrade()" class="ml-4a">{{$str("BlockTrade")}}</button>
                    <!-- post AD 버튼 -->
                    <!-- default post AD 버튼-->
                    <div class="dropdown">
                        <button class="ml-4a dropbtn" @click="goPostGeneralAd">{{$str("postAd")}}</button>
                        <div class="dropdown-content " style="min-width: 140px;">
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goPostGeneralAd">
                                {{$str("Post_General_AD")}}
                            </div>
                            <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goPostBlockAd">
                                {{$str("Post_Block_AD")}}
                            </div>
                        </div>
                    </div>


                    <!--아래의 v-spacer는 중간여백을 주기 위함으로 삭제해도 무관-->
                    <v-spacer></v-spacer>

                    <!-- 로그인시 내정보 버튼 -->
                    <!--기능 구현을 위해 만들어 놓음. 로그인 시 생겨야 하는 버튼들-->

                    <!--MyOrder-->
                    <button class="button-2 mr-4a" @click="goMyOrder()">{{$str("order")}}</button>
                    <!--Balances -->
                    <button class="button-2 mr-4a" @click="goBalances()">{{$str("Balances")}}</button>
                    <!--내 정보 끝-->


                    <!-- login 버튼 -->
                    <button class="button-2 mr-4a" @click="goLogin()">{{$str("loginText")}}</button>
                    <!-- signup 버튼-->
                    <button class="button-2 mr-4a" @click="goSignup()">{{$str("signupText")}}</button>

                    <!--아바타 (로그인 시 출력)-->
                    <div class="mr-4a mt-1 dropdown c-pointer d-block">
                        <div class="verticalcentertext dropbtn" @click="goMyPage">
                            <avatar
                                    :name="'T'"
                                    :isLogin="true"
                                    :color="'#13b0cb'" class=" mr-1 ">
                            </avatar>
                            <i class="material-icons md-light md-12 ">keyboard_arrow_down</i>
                        </div>
                        <div class="dropdown-content avatar-dropdown">
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goMyPage">
                                {{$str("UserCenter")}}
                            </div>
                            <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goMyAds">
                                {{$str("MyAds")}}
                            </div>
                            <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goMerchant">
                                {{$str("Merchant")}}
                            </div>
                            <form action="http://13.125.249.179:8080/logout" method="post" id="logoutForm" @click="onLogout()">
                            <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer" >
                                {{$str("LogOut")}}
                            </div>
                            </form>
                        </div>
                    </div>

                    <!-- 언어설정버튼 -->
                    <div class="dropdown mr-4a d-block">
                        <!-- 한국어-->
                        <button v-if="currentLang=='KO'" class="dropbtn vertical-center">
                            <div class="sprite-img ic-korean f-left"></div>
                            <span class=" ml-2">한국어<i
                                    class="material-icons md-light md-12">keyboard_arrow_down</i></span>
                        </button>
                        <!-- 영어 -->
                        <button v-else-if="currentLang=='EN'" class="dropbtn vertical-center">
                            <div class="sprite-img ic-english f-left"></div>
                            <span class=" ml-2">English<i class="material-icons md-light md-12">keyboard_arrow_down</i></span>
                        </button>
                        <!-- 중국어 -->
                        <button v-else class="dropbtn  vertical-center">
                            <div class="sprite-img ic-chinese f-left"></div>
                            <span class="ml-2">简体中文<i
                                    class="material-icons md-light md-12">keyboard_arrow_down</i></span>
                        </button>
                        <!--언어 설정시 dropdown box-->
                        <div class="dropdown-content">
                            <!-- 내 정보 list 버튼-->
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="changeLang('KO')">한국어
                            </div>
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="changeLang('ZH')">简体中文
                            </div>
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="changeLang('EN')">
                                English
                            </div>
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
    import Avatar from '@/components/Avatar.vue';

    import {
        abGetLang,
        abSetLang
    } from "../../config/localization";
    import MainRepository from "../../vuex/MainRepository";

    export default Vue.extend({
        name: 'abHeader',
        components: {Avatar},
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
            onLogout() {console.log(123);
            document.getElementById("logoutForm").submit();
            },
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
            goBlockTrade() {
                this.$router.push("/blockTrade");
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
            goMyPage() {
                this.$router.push("/myPage");
            },
            goMyOrder() {
                this.$router.push("/myOrder");
            },
            goMyAds() {
                this.$router.push("/myAds");
            },
            goBalances() {
                this.$router.push("/balances");
            },
            goMerchant() {
                this.$router.push("/merchant");
            },

            changeLang: function (userLang) {
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

<style scoped>
    .nav {
        height: 64px;
        background-color: #002970;
        color: white;
        position: fixed;
        top: 0;
        overflow: hidden;
        z-index: 999;
        width: 100%;
    }

    .dropDownMenu {
        z-index: 100;
        width: 100%;
        color: white;
        background-color: #002970;
        position: fixed;
    }

    .dropDownMenu .flex {
        padding-left: 0;
        padding-right: 0;
        height: 52px;
    }

    .submenu {
        width: 100%;
        background-color: #21407e;
    }

    .submenu.flex {
        height: 52px;
    }

    .verticalcentertext {
        align-items: center;
        display: flex;
    }

    .dropbtn {
        padding-top: 22px;
        padding-bottom: 21px;
        border: none;
    }

    .dropdown {
        position: relative;
    }

    .dropdown-content {
        display: none;
        position: fixed;
        color: black;
        min-width: 104px;
        box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.23);
        z-index: 1;
        border-radius: 2px;
        font-weight: 400;
        background-color: white;
        top: 64px;
    }

    .dropdown-content a {
        color: black;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content,
    .dropdown-content button {
        display: block;
    }

    .avatar-dropdown {
        right: 135px;
    }

    /* .dropDownBtn:hover .dropDown-content, dropDownBtn:focus {
        display: block;
      }

      .dropDown-content {
        display: none;
        position: absolute;
        background-color: #ffffff;
        padding-top: 64px;
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
      } */
</style>