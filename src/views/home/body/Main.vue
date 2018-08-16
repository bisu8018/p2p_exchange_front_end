<template>
    <div>
        <v-parallax style="height: 600px;" v-if="!isMobile">
            <v-carousel delimiter-icon="remove" lazy style="height: 600px;">
                <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
                    <!-- <v-layout column align-center justify-center class="white--text">
                    <h1 class="text-white mb-2 text-xs-center">Welcome to AllB OTC</h1>
                    <h2 class="text-white mb-2 text-xs-center mt-2">위아위아~~위어어앙아어어 어~</h2>
                  </v-layout> -->
                </v-carousel-item>
            </v-carousel>
        </v-parallax>
      <div v-if="isMobile" class="pageView mt-5">
        <h2 class="bold">ALLB OTC</h2>
        <h5 class="medium mt-3">The world's leading P2P trading platform</h5>
      </div>
      <v-layout row wrap pageView mt-6>
        <!-- 국가 -->
        <v-flex xs6 md2 mb-4>
          <select-box :selectBoxType="'country'"></select-box>
        </v-flex>
        <!-- tradeType -->
        <v-flex xs6 md2 mb-4>
          <div class="p-relative">
            <select v-model="selectedTradeType" class="comp-selectbox o-none h6">
              <option class="o-none">Buy</option>
              <option class="o-none">Sell</option>
            </select>
            <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
          </div>
        </v-flex>
        <!-- amount -->
        <v-flex xs12 md3 mb-4>
          <v-layout>
            <v-flex xs9 pl-0 pr-0>
              <input type="text" class="input amount-box" v-model="amount"
                     :placeholder="$str('How_much_you_want_to_trade?')">
            </v-flex>
            <!-- currency -->
            <v-flex xs3 pl-0 pr-0>
              <div class="p-relative">
                <select-box :selectBoxType="'currency'"></select-box>
                <div class="currency-box-border"></div>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4 mb-4 >
          <v-layout justify-space-between>
            <div class="p-relative userInput">
              <!-- cryptocurrency -->
              <select v-model="selectedCryptocurrency" class="comp-selectbox  o-none h6">
                <option class="o-none">BTC</option>
                <option class="o-none">ETH</option>
                <option class="o-none">ALLB</option>
              </select>
              <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
            </div>
            <div v-if="isMobile" class="pl-1 pr-1"></div>
            <div v-else class="color-darkgray pt-2 mb-4">Via</div>
            <!-- paymentmethod -->
            <div class="p-relative userInput">
              <select-box :selectBoxType="'payment'"></select-box>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs12 md1 mb-4>
          <div class="searchBtn btn-blue btn-blue-hover c-pointer" @click="goSearchedTradeCenter">
            {{$str("search")}}
          </div>
        </v-flex>
      </v-layout>
        <v-layout wrap class="pageView">
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">verified_user</i>
                <h3>Safe and Reliable</h3>
                <p>It's a digital assets trusteeship platform, merchants must pay security deposits in order to minimize
                    transaction risks</p>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">monetization_on</i>
                <h3>Zero Transaction Fee</h3>
                <p>Free charge for selling and buying</p>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">live_help</i>
                <h3>24-hours Customer Support</h3>
                <p>7/24 professional customer service, solve your trading problem anytime</p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {doesHttpOnlyCookieExist} from "@/common/common";
    import MainRepository from "../../../vuex/MainRepository";
    import SelectBox  from "../../../components/SelectBox";

    export default Vue.extend({
        name: 'abMain',
        components: {SelectBox},
        data() {
            return {
                items: [{
                    src: 'https://file.rci8.top/vue/static/banner/banner33.png'
                },
                    {
                        src: 'https://file.rci8.top/vue/static/banner/banner39.jpg'
                    },
                    {
                        src: 'https://file.rci8.top/vue/static/banner/banner37.png'
                    },
                ],
                selectedCryptocurrency : 'BTC',
                selectedTradeType : 'Buy',
                amount : '',
            }
        },
        created() {
            // 유저 정보 VUEX 저장
            let isLogin = doesHttpOnlyCookieExist('SESSION');
            console.log(isLogin);

            //firefox 미동작 하므로 추가 코딩 필요
            if (isLogin === true) {
                MainRepository.Login.setUserInfo();
            }

        },
        methods: {
            goLogin() {
                this.$router.push("/login");
            },
            goSignup() {
                this.$router.push("/signup");
            },
            goSearchedTradeCenter(){
                MainRepository.TradeView.setTradeLeftFilter(this.selectedCryptocurrency, this.selectedTradeType);
                MainRepository.TradeView.setTradeRightFilter('', '', '', this.amount);
                this.$router.push("/tradecenter?main");
            }

        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
    })
</script>

<style scoped>
    /* 웹에서 최대 width 주기*/

    @media only screen and (min-width: 960px) {
        .pageView {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    /* mobile 에서 gutter 주기*/

    @media only screen and (max-width: 959px) {
        .pageView {
            padding-left: 12px;
            padding-right: 12px;
        }
    }

    /* 패럴랙스에 이미지 삽입
    :src="require('@/assets/img/main.jpg')" */

    h1 {
        font-size: 48px;
        line-height: 1.2em;
    }

    h2 {
        font-size: 26px;
    }

    h3 {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 8px;
        margin-top: 8px;
    }

    p {
        font-size: 16px;
    }
    .searchBtn{
      height: 40px;
      padding-top: 8px;
    }
    .amount-box{
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-right: 0.5px;
    }
    .currency-box-border {
      position : absolute;
      height: 40px;
      width: 1px;
      top: 0px;
      background-color: #8d8d8d;

    }

    .userInput{
      min-width: 155px;
    }
    @media only screen and (max-width: 959px) {
      .userInput {
        width: 100%;
      }
    }

</style>