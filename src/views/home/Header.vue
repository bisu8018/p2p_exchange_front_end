<template>
    <div>
        <div>

            <!-- 모바일 일때-->
            <div v-if="isMobile">
                <v-layout class="nav align-center">

                    <!--logo-->
                    <button @click="goMain()" class="ml-3">
                        <div class="sprite-img2 ic-header-logo "></div>
                    </button>

                    <!--아래의 이 spacer는 가운데 빈 여백을 알아서 할당해 주는 코드임-->
                    <v-spacer></v-spacer>

                    <!--햄버거 bar-->
                    <div class="p-relative mr-3">
                        <a><i class="material-icons md-light md-36" @click.stop="drawer = !drawer">menu</i></a>
                        <div v-if="isLogin && totalMsgCount > 0 && orderList.length > 0" class="new-msg-dot"></div>
                    </div>

                </v-layout>

                <!-- navigation drawer 열렸을 시 나오는 menu bar-->
                <v-layout row wrap mt-6 v-if="drawer" @click.stop="drawer = !drawer" class="dropDownMenu">
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
                            <v-flex xs12 class="verticalcentertext" @click="goPostAd(false)">
                                <button class="text-xs-left ml-5">
                                    <div flat>
                                        {{$str("Post_General_AD")}}
                                    </div>
                                </button>
                            </v-flex>
                            <!--post block AD-->
                            <v-flex xs12 class="verticalcentertext" @click="goPostAd(true)">
                                <button class="text-xs-left ml-5">
                                    <div>
                                        {{$str("Post_Block_AD")}}
                                    </div>
                                </button>
                            </v-flex>
                        </div>
                    </div>

                    <span v-if="!isLogin" class="mobile-span">
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
                    </span>

                    <span v-if="isLogin" class="mobile-span">
                        <!-- 로그인시 추가되는 화면들-->
                        <v-flex xs12 class="verticalcentertext" @click="goMyOrder()">
                            <button class="text-xs-left ml-3">
                                <div>{{$str("order")}}</div>
                            </button>
                            <span v-if="isLogin && totalMsgCount > 0" class="badge ml-2">{{ totalMsgCount }}</span>
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
                        <form action="/logout" method="post" ref="logout" @click="onLogout" id="logoutFormMobile">
                            <v-flex xs12 class="verticalcentertext">
                                <button class="text-xs-left ml-3">
                                    <div>{{$str("LogOut")}}</div>
                                </button>
                            </v-flex>
                        </form>
                    </span>
                </v-layout>
            </div>



            <!-- 웹일때 -->
            <div class="nav-web" v-else>
                <v-layout align-center row class="nav">

                    <!-- logo버튼-->
                    <button @click="goMain()" class="ml-4">
                        <div class="sprite-img2 ic-header-logo "></div>
                    </button>

                    <!-- TradeCenter버튼-->
                    <button @click="goTradeCenter()" class="ml-4a">{{$str("TradeCenter")}}</button>

                    <!-- BlockTrade 버튼-->
                    <button @click="goBlockTrade()" class="ml-4a">{{$str("BlockTrade")}}</button>

                    <!-- post AD 버튼 -->
                    <!-- default post AD 버튼-->
                    <div class="dropdown">
                        <button class="ml-4a dropbtn" @click="goPostAd(false)">{{$str("postAd")}}</button>
                        <div class="dropdown-content" style="min-width: 140px;">
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goPostAd(false)">
                                {{$str("Post_General_AD")}}
                            </div>
                            <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goPostAd(true)">
                                {{$str("Post_Block_AD")}}
                            </div>
                        </div>
                    </div>

                    <!--아래의 v-spacer는 중간여백을 주기 위함으로 삭제해도 무관-->
                    <v-spacer></v-spacer>

                    <!-- 로그인시 내정보 버튼 -->
                    <!--기능 구현을 위해 만들어 놓음. 로그인 시 생겨야 하는 버튼들-->

                    <span v-if="isLogin && totalMsgCount > 0" class="badge mr-1">{{ totalMsgCount }}</span>

                    <!--MyOrder-->
                    <div class="dropdown">
                        <button class="button-2 mr-4a dropbtn" @click="goMyOrder()" v-if="isLogin">
                            {{$str("order")}}
                        </button>

                        <!-- ongoing order 드롭다운 -->
                        <div class="dropdown-content myorder-dropdown">
                            <div class="scroll-space">
                                <v-layout pa-3 align-center>
                                    <h3 class="medium">{{$str("Ongoing order")}}</h3>
                                    <v-spacer></v-spacer>
                                    <!--<div class="color-blue mr-2">{{$str("Fixed")}}</div>-->
                                    <!--<div class="sprite-img ic-fix color-blue"></div>-->
                                </v-layout>
                                <v-divider></v-divider>

                                <!-- ongoing items -->
                                <div v-for="item in orderList">
                                    <my-order-simple-item
                                            :data="item"
                                    />
                                    <v-divider />
                                </div>
                            </div>
                            <div @click="goMyOrder()" class="myorder-footer text-md-right color-blue text-white-hover my-3 mr-3 c-pointer">
                                {{$str("View All")}}
                            </div>
                        </div>
                    </div>
                    <!--Balances -->
                    <button class="button-2 mr-4a" @click="goBalances()" v-if="isLogin">{{$str("Balances")}}</button>
                    <!--내 정보 끝-->


                    <!-- login 버튼 -->
                    <button class="button-2 mr-4a" @click="goLogin()" v-if="!isLogin">{{$str("loginText")}}</button>
                    <!-- signup 버튼-->
                    <button class="button-2 mr-4a" @click="goSignup()" v-if="!isLogin">{{$str("signupText")}}</button>

                    <span v-if="isLogin">
                        <!--아바타 (로그인 시 출력)-->
                        <div class="mr-4a mt-1 dropdown c-pointer d-block">
                            <div class="verticalcentertext dropbtn" @click="goMyPage">
                                <avatar
                                        :me= true
                                        class=" mr-1 ">
                                </avatar>
                                <i class="material-icons md-light md-12 ">keyboard_arrow_down</i>
                            </div>
                            <div class="dropdown-content avatar-dropdown">
                                <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goMyPage">
                                    {{$str("MyPage")}}
                                </div>
                                <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goMyAds">
                                    {{$str("MyAds")}}
                                </div>
                                <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer" @click="goMerchant">
                                    {{$str("Merchant")}}
                                </div>
                                <form action="/logout" method="post" ref="logout" id="logoutFormDesktop"
                                      @click="onLogout">
                                    <div class=" btn-blue-hover  pr-3 pl-3 pt-2 pb-2 c-pointer">
                                        {{$str("LogOut")}}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </span>

                    <!-- 언어설정버튼 -->
                    <div class="dropdown mr-4a d-block">
                        <!-- 중문간체 -->
                        <button v-if="currentLang=='ZH'" class="dropbtn  vertical-center">
                            <div class="sprite-img ic-chinese f-left"></div>
                            <span class="ml-2">简体中文<i
                                    class="material-icons md-light md-12">keyboard_arrow_down</i></span>
                        </button>
                        <!-- 중문번체 -->
                        <button v-else-if="currentLang=='HK'" class="dropbtn vertical-center">
                            <div class="sprite-img ic-chinese f-left"></div>
                            <span class=" ml-2">繁體中文<i class="material-icons md-light md-12">keyboard_arrow_down</i></span>
                        </button>
                        <!-- 영어 -->
                        <button v-else-if="currentLang=='EN'" class="dropbtn vertical-center">
                            <div class="sprite-img ic-english f-left"></div>
                            <span class=" ml-2">English<i class="material-icons md-light md-12">keyboard_arrow_down</i></span>
                        </button>
                        <!-- 한국어-->
                        <button v-else class="dropbtn vertical-center">
                            <div class="sprite-img ic-korean f-left"></div>
                            <span class=" ml-2">한국어<i
                                    class="material-icons md-light md-12">keyboard_arrow_down</i></span>
                        </button>
                        <!--언어 설정시 dropdown box-->
                        <div class="dropdown-content">
                            <!-- 언어 list 버튼-->
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="changeLang('ZH')">简体中文
                            </div>
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="changeLang('HK')">繁體中文
                            </div>
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="changeLang('EN')">English
                            </div>
                            <div class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer" @click="changeLang('KO')">한국어
                            </div>
                        </div>
                    </div>
                </v-layout>
            </div>
        </div>
        <!--header 아래 contents 들이 겹쳐지지 않기 위한 빈 box-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import Avatar from '@/components/Avatar.vue';
    import MyOrderSimpleItem from './body/myOrder/MyOrderListItem/MyOrderSimpleItem'
    import axios from 'axios'

    import {
        abGetLang,
        abSetLang
    } from "../../config/localization";
    import MainRepository from "../../vuex/MainRepository";
    import AxiosService from "../../service/AxiosService";

    export default Vue.extend({
        name: 'abHeader',
        components: {Avatar, MyOrderSimpleItem},
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
                    title: '中國傳統',
                    code: 'HK'
                },
                {
                    title: 'English',
                    code: 'EN'
                },
            ],
            currentLang: 'KO',
            totalMsgCount: 5,
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            isLogin() {
                return MainRepository.MyInfo.isLogin();
            },
            orderList() {
                this.totalMsgCount = MainRepository.MyOrder.controller().getUnreadMsgCount();
                return MainRepository.MyOrder.controller().getMyUnpaidOrderItems();
            }
        },
        created() {
            this.currentLang = abGetLang();

            if (MainRepository.MyInfo.isLogin()) {
                // 시작하자마자 한번 실행
                MainRepository.MyOrder.load(true);
            }
        },
        methods: {
            onMyOrderItemClick() {

            },
            serializeserialize (form) { console.log(form);
                var field,
                    l,
                    s = [];

                if (typeof form == 'object' && form.nodeName == "FORM") {
                    var len = form.elements.length;

                    for (var i = 0; i < len; i++) {
                        field = form.elements[i];
                        if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'hidden' && field.type != 'reset' && field.type != 'submit') {
                            if (field.type == 'select-multiple') {
                                l = form.elements[i].options.length;

                                for (var j = 0; j < l; j++) {
                                    if (field.options[j].selected) {
                                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                                    }
                                }
                            }
                            else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                            }
                        }
                    }
                }
                return s.join('&').replace(/%20/g, '+');
            },
            onLogout() {
                //this.$refs.logout.submit();
                let self = this;
                let data;
                if(MainRepository.State.isMobile()){
                    data = "logoutFormMobile"
                }else{
                    data = "logoutFormDesktop"
                }

                axios({
                    method: 'POST',
                    url: '/logout',
                    data: self.serializeserialize(document.getElementById(data)),
                    withCredentials: true,
                    headers: {
                        //  'Accept': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((response) => {
                    window.location.replace(AxiosService.getRootUrl() + '/tradeCenter')
                })
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
            goPostAd(isBlock) {
                // Merchant 확인 로직 포함됨
                MainRepository.router().goPostAd(isBlock)
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
                if (this.isMobile) {
                    this.$router.push("/myOrderSimpleMobile");
                } else {
                    this.$router.push("/myOrder");
                }
            },
            goMyAds() {
                this.$router.push("/myAds");
            },
            goBalances() {
                this.$router.push("/balances");
            },
            goMerchant() {
                MainRepository.router().goMerchant();
            },

            changeLang: function (userLang) {
                abSetLang(userLang);
                this.currentLang = userLang;
            },
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

    .dropDownMenu > div,
    .mobile-span > div {
        cursor: pointer;
    }

    .dropDownMenu > div:hover,
    .mobile-span > div:hover {
        background-color: #316ee4
    }

    .dropDownMenu > .submenu:hover {
        background-color: #21407e;
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

    .mobile-span {
        width: 100%;
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
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
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
    .myorder-dropdown{
        min-width: 306px;
        z-index: 2;
        top: 56px;
        right: 18px;
        max-height: 384px;
        overflow: visible;
        position: absolute;
    }

    .myorder-dropdown:after{
        content: '';
        position: absolute;
        bottom: 100%;
        right: 24px;
        width: 0; height: 0;
        border-style: solid;
        border-bottom: 4px solid  #ffffff;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-color: transparent transparent  #ffffff transparent ;
    }

    .scroll-space {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        position: relative;
        max-height: 336px;
    }

    /*.myorder-footer {*/
        /*position: absolute;*/
        /*z-index: 2;*/
    /*}*/

    .new-msg-dot {
        width: 7px;
        height: 7px;
        background-color: #e62a2b;
        border-radius: 20px;
        position: absolute;
        top: 1px;
        left: -8px;
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