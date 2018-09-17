<template>
    <div>
        <v-parallax style="height: 600px;" v-if="!isMobile">
            <v-carousel delimiter-icon="remove" lazy style="height: 600px;">
                <v-carousel-item>
                    <div class="landing-img-first">
                        <div class="sprite-img2-small ic-allb-logo-big d-inline-block mb-2"></div>
                        <div class="landing-subject"> {{ $str('landingSubj_1') }}</div>
                        <div class="landing-content"> {{ $str('landingContent_1') }}</div>
                    </div>
                </v-carousel-item>
                <v-carousel-item>
                    <div class="landing-img-second">
                        <div class="landing-subject mt-6a"> {{ $str('landingSubj_2') }}</div>
                        <div class="landing-content"> {{ $str('landingContent_2') }}</div>
                    </div>
                </v-carousel-item>
                <v-carousel-item>
                    <div class="landing-img-third">
                        <div class="landing-subject mt-6a"> {{ $str('landingSubj_3') }}</div>
                        <div class="landing-content"> {{ $str('landingContent_3') }}</div>
                        <div class="landing-content"> ABT, ABC, ABH!</div>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </v-parallax>
      <div v-if="isMobile" class="pageView mt-5">
        <h2 class="bold sizeUp">{{ $str('ALLB OTC') }}</h2>
        <h5 class="medium mt-3">{{ $str('The world\'s leading P2P trading platform')}}</h5>
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
              <option value="Buy" class="o-none">{{$str("Buy")}}</option>
              <option value="Sell" class="o-none">{{$str("Sell")}}</option>
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
            <div v-else class="color-darkgray pt-2 mb-4">{{$str('Via')}}</div>
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
                <h3>{{$str('landingSubject_1')}}</h3>
                <p>{{$str('landingContents_1')}}</p>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons arrows-style">compare_arrows</i>
                <h3>{{$str('landingSubject_2')}}</h3>
                <p>{{$str('landingContents_2')}}</p>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">live_help</i>
                <h3>{{$str('landingSubject_3')}}</h3>
                <p>{{$str('landingContents_3')}}</p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {doesHttpOnlyCookieExist} from "@/common/common";
    import MainRepository from "../../../vuex/MainRepository";
    import SelectBox  from "../../../components/SelectBox";
    import {abGetLang} from "../../../config/localization";

    export default Vue.extend({
        name: 'abMain',
        components: {SelectBox},
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
        data() {
            return {
                selectedCryptocurrency : 'BTC',
                selectedTradeType : 'Buy',
                amount : '',
                currentLang : abGetLang(),
            }
        },
        mounted(){

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
                this.$router.push("/generalTrade?main");
            }

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
      .userInput{
        min-width: 155px;
      }
    }

    /* mobile 에서 gutter 주기*/

    @media only screen and (max-width: 959px) {
        .pageView {
            padding-left: 12px;
            padding-right: 12px;
        }
      .userInput {
        width: 100%;
      }
    }
    h1 {
        font-size: 48px;
        line-height: 1.2em;
    }

    h2 {
        font-size: 32px;
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




</style>