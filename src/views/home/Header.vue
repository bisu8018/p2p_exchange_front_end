<!--project의 규모가 커지며 유지보수의 간편화를 위해 Header를 한통으로 옮김-->
<!-- CSS가 두벌이므로 참고할것-->
<template>
    <div>
        <div v-if="drawer && isMobile" class="layout_dim" @click="closeHeader()"></div>
        <div class="nav" v-bind:class="{cssFixed : isFixed || isChatOpened}">
            <div class="mobile-header">
                <!--logo-->
                <button @click="goMain()" class="logo ">
                    <img src="../../assets/img/icon_logo_red.png" style="width: 35px">
                </button>
                <div v-if="isMobile" class="full-width">
                    <v-spacer></v-spacer>
                    <!--햄버거 bar-->
                    <div class="p-relative menu-margin">
                        <i class="material-icons md-light md-36 c-pointer" @click.stop="drawer = !drawer">menu</i>
                        <div v-if="isLogin && totalMsgCount > 0 && orderList.length > 0" class="new-msg-dot"></div>
                    </div>
                </div>
            </div>
            <transition name="dropInMobile">
              <div v-if="drawer || !isMobile" class="dropdown-wrapper dropDownMenu" @click.stop="drawer = !drawer">
                  <!-- 좌측 -->
                  <div>
                      <div class="display-flex">
                          <!--Wallet-->
                          <button v-if="!isMobile" class="menu-button"  @click="goWallet()">
                              {{$str("Wallet")}}
                          </button>
                          <!--OTC-->
                          <button v-if="!isMobile" class="menu-button" @click="goOTC()"
                                  v-bind:class="{'left16-right32' : (getDomain === 'OTC')}" >
                              {{$str("OTC")}}
                          </button>
                          <transition-group  name="OTC" class="both-flex">
                              <!-- TradeCenter-->
                              <div v-if="getDomain === 'OTC'" key="TradeCenter" class="dropdown ">
                                  <div @click.stop="onTradeCenter" class="menu-button dropbtn sub-domain-menu left32-right16"
                                  >{{$str("TradeCenter")}}</div>
                                  <transition name="SubMenu">
                                      <div v-if="!isMobile || tradeCenterDrawer" class="dropdown-content" style="min-width: 140px;">
                                          <div class="submenu" @click="goGeneralTrade()">
                                              {{$str("GeneralTrade")}}
                                          </div>
                                          <div class="submenu" @click="goBlockTrade()">
                                              {{$str("BlockTrade")}}
                                          </div>
                                          <div class="submenu" @click="goCustomTokenTrade()">
                                              {{$str("CustomTokenTrade")}}
                                          </div>
                                      </div>
                                  </transition>
                              </div>
                              <!--Post Ad-->
                              <div v-if="getDomain === 'OTC'" key="PostAd" class="dropdown">
                                  <button class="menu-button dropbtn sub-domain-menu left16-right32" @click.stop="onPostAD">{{$str("postAd")}}</button>
                                  <transition name="SubMenu">
                                      <div v-if="!isMobile || postadDrawer" class="dropdown-content" style="min-width: 140px;">
                                          <div class="submenu" @click="goPostAd(false)">
                                              {{$str("Post_General_AD")}}
                                          </div>
                                          <div class="submenu" @click="goPostAd(true)">
                                              {{$str("Post_Block_AD")}}
                                          </div>
                                      </div>
                                  </transition>
                              </div>
                          </transition-group >
                          <!--Exchange-->
                          <!--button v-if="!isMobile" class="menu-button" @click="goExchange()"
                                  v-bind:class="{'left32-right16' : (getDomain === 'OTC')}">
                              {{$str("Exchange")}}
                          </button-->
                          <!--Service-->
                          <button v-if="!isMobile" class="menu-button" @click="goService()"
                                  v-bind:class="{'left16-right32' : getDomain === 'Service','left32-right16' : (getDomain === 'OTC')}">
                              {{$str("Service")}}
                          </button>
                          <transition name="Service" >
                            <div v-if="getDomain === 'Service'" class="menu-button dropbtn sub-domain-menu left32-right32">
                                {{$str("myToken")}}</div>
                          </transition>
                      </div>
                  </div>

                  <!-- 우측 -->
                  <div>
                      <!--MyOrder-->
                      <div class="dropdown" v-if="getDomain ==='OTC'">

                          <button class="menu-button dropbtn" @click="goMyOrder()" v-if="isLogin">
                              <button v-if="isLogin && totalMsgCount > 0 &&!isMobile" class="badge mr-1">{{ totalMsgCount }}</button>
                              {{$str("order")}}
                              <button v-if="isLogin && totalMsgCount > 0 &&isMobile" class="badge ml-1">{{ totalMsgCount }}</button>
                          </button>


                          <!-- ongoing order 드롭다운 -->
                          <div v-if="!isFixed &&!isMobile" class="dropdown-content myorder-dropdown">
                              <div class="scroll-space">
                                  <v-layout pa-3 align-center>
                                      <h3 class="medium">{{$str("Ongoing order")}}</h3>
                                      <v-spacer></v-spacer>
                                      <v-layout justify-end c-pointer @click="fixModal()">
                                          <div class="color-blue-active mr-2 h5">{{$str("Fixed")}}</div>
                                          <div class="sprite-img ic-fix color-blue-active"></div>
                                      </v-layout>
                                  </v-layout>
                                  <v-divider></v-divider>
                                  <div v-if="haveItem">
                                      <!-- ongoing items -->
                                      <div v-for="item in orderList">
                                          <my-order-simple-item
                                                  :data="item"
                                          />
                                          <v-divider />
                                      </div>
                                  </div>
                                  <div v-else>
                                      <div class="sprite-img ic-no-ad-sm no-more-ads">
                                      </div>
                                      <div class="color-gray no-more-ads-text">
                                          {{$str("No more orders")}}
                                      </div>
                                      <v-divider />
                                  </div>
                              </div>
                              <div @click="goMyOrder()" class="h5 text-md-right color-blue-active my-3 mr-3">
                                  {{$str("View All")}}
                              </div>
                          </div>
                      </div>

                      <!--Chat-->
                      <button v-if="!isMobile" class="menu-button" @click="goChat()">{{$str("Chat")}}</button>

                      <!-- login 버튼 -->
                      <button class="menu-button" @click="goLogin()" v-if="!isLogin">{{$str("loginText")}}</button>
                      <!-- signup 버튼-->
                      <button class="menu-button" @click="goSignup()" v-if="!isLogin">{{$str("signupText")}}</button>

                      <span v-if="isLogin">
                      <!--아바타 (로그인 시 출력)-->
                      <div class="my-menu-button dropdown ">
                          <div v-if="!isMobile" class="verticalcentertext dropbtn padding-top-16" @click="goMyPage">
                              <avatar
                                      :me=true
                                      class=" mr-1 ">
                              </avatar>
                              <i class="material-icons md-light md-12 ">keyboard_arrow_down</i>
                          </div>
                          <div class="dropdown-content ">
                              <div class="my-menu" @click="goMyPage">
                                  {{$str("MyPage")}}
                              </div>
                              <div v-if="getDomain ==='OTC'" class="my-menu" @click="goMyAds">
                                  {{$str("MyAds")}}
                              </div>
                              <div v-if="getDomain ==='OTC'" class="my-menu" @click="goMerchant">
                                  {{$str("Merchant")}}
                              </div>
                              <form v-if="isMobile" action="/logout" method="post" ref="logout" id="logoutFormMobile"
                                    @click="onLogout">
                                  <div class="my-menu">
                                      {{$str("LogOut")}}
                                  </div>
                              </form>
                              <form v-else action="/logout" method="post" ref="logout" id="logoutFormDesktop"
                                    @click="onLogout">
                                  <div class="my-menu">
                                      {{$str("LogOut")}}
                                  </div>
                              </form>
                          </div>
                      </div>
                  </span>

                      <!-- 언어설정버튼 -->
                      <div v-if="!isMobile" class="dropdown mr-4 ml-3">
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
                          <div class="dropdown-content lang-menu">
                              <!-- 언어 list 버튼-->
                              <div @click="changeLang('ZH')">简体中文
                              </div>
                              <div @click="changeLang('HK')">繁體中文
                              </div>
                              <div @click="changeLang('EN')">English
                              </div>
                              <div @click="changeLang('KO')">한국어
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Avatar from '@/components/Avatar.vue';
    import MyOrderSimpleItem from './body/myOrder/item/MyOrderSimpleItem'
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
            tradeCenterDrawer: false,
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
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            isLogin() {
                return MainRepository.MyInfo.isLogin();
            },
            totalMsgCount() {
                return MainRepository.MyOrder.controller().getUnreadMsgCount();
            },
            orderList() {
                return MainRepository.MyOrder.controller().getMyOrderAlarmItems();
            },
            isFixed() {
                return MainRepository.MyOrder.controller().getMyOrderModalFixed();
            },
            haveItem() {
                return MainRepository.MyOrder.controller().getMyOrderAlarmItems().length !== 0;
            },
            getDomain() {
                return MainRepository.State.getDomain();
            },
            isChatOpened() {
                return MainRepository.Chat.controller().getChatStatus();
            },

        },
        created() {
            this.currentLang = abGetLang();

            if (MainRepository.MyInfo.isLogin()) {
                // 시작하자마자 한번 실행
                MainRepository.MyOrder.loadAlarm();
            }
        },
        methods: {
            onTradeCenter() {
                //mobile에서
                if (this.isMobile) {
                    this.postadDrawer = false;
                    this.tradeCenterDrawer = !this.tradeCenterDrawer
                }
                //web에서
                else {
                    this.goGeneralTrade();
                }
            },
            onPostAD() {
                if (this.isMobile) {
                    this.tradeCenterDrawer = false;
                    this.postadDrawer = !this.postadDrawer
                }
                else {
                    this.goPostAd(false)
                }
            },
            goWallet() {
                MainRepository.router().goWallet();
            },
            goOTC() {
                MainRepository.router().goMain();
            },
            goExchange() {
                this.$eventBus.$emit('showAlert', 9000);
                //MainRepository.State.setDomain('Exchange')
                //MainRepository.router().goWallet();
            },
            goService() {
                MainRepository.router().goMyToken();
            },
            serializeserialize(form) {
                console.log(form);
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
                if (MainRepository.State.isMobile()) {
                    data = "logoutFormMobile"
                } else {
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
                    window.location.replace(AxiosService.getRootUrl() + '/generalTrade')
                })
            },
            goSignup() {
                MainRepository.router().goSignup();
            },
            goLogin() {
                MainRepository.router().goLogin();
            },
            goMain() {
                location.href = "/";
            },
            goGeneralTrade() {
                MainRepository.router().goGeneralTrade();
            },
            goBlockTrade() {
                MainRepository.router().goBlockTrade();
            },
            goCustomTokenTrade() {
                MainRepository.router().goCustomTokenSelect();
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
                MainRepository.router().goMyPage();
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
            goMerchant() {
                MainRepository.router().goMerchant();
            },

            changeLang: function (userLang) {
                abSetLang(userLang);
                this.currentLang = userLang;
            },
            fixModal() {
                MainRepository.MyOrder.controller().setMyOrderModalFixed(
                    !MainRepository.MyOrder.controller().getMyOrderModalFixed()
                );
                MainRepository.Chat.isClosed();     //채팅 종료 후 my order modal fix
            },
            goChat() {
               MainRepository.router().goChat();
            },
            closeHeader(){
                this.drawer = false;
            }
        },


    });
</script>

<style scoped>
    /*web 일때*/
    @media only screen and (min-width: 960px) {
        .nav {
            display: flex;
        }
        .dropdown-wrapper{
            display: inline-flex;
            justify-content: space-between;
            width: 100%;
        }


        .dropdown-wrapper > div {
            display: flex;
        }

        .logo{
            margin: 22px 16px 22px 24px;
        }

        .menu-button {
            padding-top: 22px;
            padding-bottom: 21px;
            padding-right: 16px;
            padding-left: 16px;
            cursor: pointer;
            font-size: 14px;
        }
        .sub-domain-menu{
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 64px;
        }

        .left16-right32{
            padding-right: 32px;
            padding-left: 16px;
        }

        .left32-right16{
            padding-right: 16px;
            padding-left: 32px;
        }

        .left32-right32{
            padding-right: 32px;
            padding-left: 32px;
        }

        .my-menu-button {
            margin: auto 16px;
            cursor: pointer;
        }

        .display-flex{
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
            background-color: #316ee4;
            color: white;
        }

        .dropdown:hover .dropdown-content,
        .dropdown-content button {
            display: block;
        }

        /*sub menu 드롭다운*/
        .submenu {
            font-size: 14px;
            padding: 8px 16px 8px 16px;
            cursor: pointer;
        }

        .submenu:hover, .submenu:active {
            background-color: #316ee4;
            color: white;
        }


        /*my menu 드롭다운*/
        .my-menu {
            padding: 8px 16px 8px 16px;
            cursor: pointer;
        }

        .my-menu:hover, .my-menu:active {
            background-color: #316ee4;
            color: white
        }

        .myorder-dropdown {
            min-width: 306px;
            z-index: 2;
            top: 56px;
            right: 18px;
            max-height: 461px;
            overflow: visible;
            position: absolute;
        }

        .myorder-dropdown:after {
            content: '';
            position: absolute;
            bottom: 100%;
            right: 24px;
            width: 0;
            height: 0;
            border-style: solid;
            border-bottom: 4px solid #ffffff;
            border-right: 4px solid transparent;
            border-left: 4px solid transparent;
            border-color: transparent transparent #ffffff transparent;
        }

        .scroll-space {
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            position: relative;
            max-height: 336px;
        }
        .padding-top-16 {
            padding-top: 16px;
        }

        .no-more-ads {
            margin: 50px auto 0px auto;
        }

        .no-more-ads-text {
            margin-bottom: 50px;
            text-align: center;
        }
        /*subDomain animation*/

        .OTC-enter-active, .OTC-leave-active{
            transition: 0.2s ease-out;
        }

        .OTC-enter, .OTC-leave-to{
          /*transform: scaleX(0.4);*/
            transform: translate(-40%, 0) scaleX(0.4);
            margin-right: -100px;
            opacity: 0;

        }
        .OTC-enter-to, .OTC-leave{

        }

        .Service-enter-active, .Service-leave-active{
          transition: .2s ease-in;
        }

        .Service-enter, .Service-leave-to{
          transform: translateX(-30px) scaleX(0.3);
          padding-left: 0px;
          margin-left: 0px;
            opacity: 0.3;

        }
        .Service-enter-to, .ServiceTC-leave{
          margin-right: 0px;
        }

        .both-flex{
            display: flex;
            flex-direction: row;
        }
    }

    /*mobile 일때*/
    @media only screen and (max-width: 959px) {
        .dropdown-wrapper {
            background-color: #002970;
        }

        .logo {
            margin-left: 24px;
        }

        .mobile-header {
            display: flex;
            height: 64px;
        }

        .full-width {
            display: flex;
            width: 100%;
        }

        .menu-margin {
            margin: auto 24px auto auto;
            padding-top: 4px;
        }
        .menu-button {
            height: 52px;
            padding: 16px 24px 16px 24px;
            text-align: left;
            cursor: pointer;
            width: 100%;
        }

        .menu-button:hover {
            background-color: #316ee4;
        }

        .my-menu {
            background-color: #002970;
            height: 52px;
            padding: 16px 24px 16px 24px;
            text-align: left;
            cursor: pointer;
            width: 100%;
        }

        .my-menu:hover {
            background-color: #316ee4;
        }

        .dropDownMenu {
            z-index: 50;
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
            text-align: left;
            padding: 16px 48px;
            cursor: pointer;
        }

        .submenu:hover {
            background-color: #316ee4
        }

        .submenu.flex {
            height: 52px;
        }

        /*subDomain animation*/
        .SubMenu-enter-active, .SubMenu-leave-active{
            transition: all .3s ease-out;
        }
        .SubMenu-enter{
            height: 56px;
            margin-bottom: -56px;
            opacity: 0;

        }
        .SubMenu-enter-to{
          margin-bottom: 0px;
          height: auto;
        }

        .SubMenu-leave{
          height: 112px;
        }

        .SubMenu-leave-to{
            height: 56px;
            margin-bottom: -56px;
            opacity: 0;
        }


        .dropInMobile-enter-active, .dropInMobile-leave-active{
            transition: all .3s ease-out;
        }

        .dropInMobile-enter, .dropInMobile-leave-to{
          transform: translateY(-52px) scaleY(0.8);
          opacity: 0;
        }

        .layout_dim {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.45);
            opacity: 0.5;
            z-index: 110;           /*tab의 z-index: 100*/
        }

        .both-flex{
            display: flex;
            flex-direction: column;
        }

}

.nav {
height: 64px;
background-color: #002970;
color: white;
position: fixed;
top: 0;
width: 100%;
}

.verticalcentertext {
align-items: center;
display: flex;
}

.vertical-divider {
width: 1px;
height: 20px;
margin: 22px 16px 22px 16px;
background-color: #9294a6;
}

.new-msg-dot {
width: 7px;
height: 7px;
background-color: #e62a2b;
border-radius: 20px;
position: absolute;
top: 5px;
left: -3px;
}

.cssFixed {
width: auto !important;
right: 300px;
left: 0px;
}


</style>