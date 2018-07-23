<template>
  <div>

    <!-- mobile 일때-->
    <div v-if="isMobile" >
      <div>
        <!-- name-->
        <v-layout>
          <v-flex xs2 >
            <avatar
              :name = user.email[0]
              :isLogin = user.isLogin
              :color = user.color>
            </avatar>
          </v-flex>

          <v-flex xs10 text-xs-left>
            {{user.email}} ( {{user.volumeTotal}} | 99%)
            <!-- user의 rank 이미지-->
            <img :src="rankSrc" class="ml-2">
          </v-flex>
        </v-layout>
        <!-- Volume -->
        <v-layout>
            <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left>Volume :</v-flex>
            <v-flex xs6 text-xs-right> {{user.volumeTotal}} {{token}} </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout>
          <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left>Limits :</v-flex>
            <v-flex xs6 text-xs-right> {{user.limitMax}} {{currency}} </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout mb-3>
          <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left>Price :</v-flex>
            <v-flex xs6 text-xs-right> {{user.price}} {{currency}} </v-flex>
        </v-layout>
        <!-- Payment Methods -->
        <v-layout>
          <v-flex xs2></v-flex>
            <v-flex xs6 text-xs-left>
              <a class="tooltips">
                <img class="mr-2" src="../../../../../assets/img/method_bankaccount.png">
                <span class="BankTooltip tooltip-content">Bank account</span>
              </a>
              <a class="tooltips" >
                <img class="mr-2" src="../../../../../assets/img/method_alipay.png">
                <span class="tooltip-content">Alipay</span>
              </a>
              <a class="tooltips" >
                <img class="mr-2" src="../../../../../assets/img/method_wechatpay.png">
                <span class="tooltip-content">Wechatpay</span>
              </a>
            </v-flex>
            <!--거래 버튼-->
            <v-flex xs4 text-xs-right>
              <button class="common-rounded-button" @click="drawer = !drawer">
                {{tradeType}} {{token}}</button>
            </v-flex>
        </v-layout>
      </div>

      <!--거래를 위한 mobile modal-->
      <div v-if="drawer" class="mobileModal">
        <!-- name-->
        <v-layout>
          <v-flex xs2>
            <avatar
                  :name = user.email[0]
                  :isLogin = user.isLogin
                  :color = user.color>
          </avatar>
          </v-flex>
          <v-flex xs12 text-xs-left>
            {{user.email}} ( {{user.volumeTotal}} | 99%)
            <img :src="rankSrc" class="userRank">
          </v-flex>
        </v-layout>
        <!-- Volume -->
        <v-layout >
          <v-flex xs3  offset-xs2 text-xs-left>Volume :</v-flex>
          <v-flex xs5 offset-xs1 text-xs-right> {{user.volumeTotal}} {{token}} </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout >
          <v-flex xs3  offset-xs2 text-xs-left>Limits :</v-flex>
          <v-flex xs5 offset-xs1 text-xs-right> {{user.limitMax}} {{currency}} </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout >
          <v-flex xs3  offset-xs2 text-xs-left>Price :</v-flex>
          <v-flex xs5 offset-xs1 text-xs-right> {{user.price}} {{currency}} </v-flex>
        </v-layout>
        <!-- payment methods -->
        <v-layout >
          <v-flex xs5 offset-xs2 text-xs-left> {{$str("payment")}}:</v-flex>
          <v-flex xs1 text-xs-right><img src="../../../../../assets/img/method_alipay.png"> </v-flex>
          <v-flex xs1 text-xs-right> <img src="../../../../../assets/img/method_bankaccount.png"> </v-flex>
          <v-flex xs1 text-xs-right><img src="../../../../../assets/img/method_wechatpay.png"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs2></v-flex>
          <v-flex xs9>
            <input type="number" class="mobileInput" name="toValue" v-model="toValue"
                   :placeholder="toPlaceholder">

            <input type="number" class="mobileInput" name="toValue" v-model="fromValue"
                   :placeholder="fromPlaceholder">

            <input type="number" class="mobileInput" name="toValue" v-model="tradePassword"
                   :placeholder="pwPlaceholder">
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs6>Payment window is 20 minutes</v-flex>
          <v-flex xs6 text-xs-right>
            <button class="common-rounded-small-flat-button" @click="">{{$str("cancel")}}</button>
            <button class="common-rounded-small-button" @click="">{{$str("confirm")}}</button>
          </v-flex>
        </v-layout>
      </div>

    </div>


    <!--Web 일때-->
    <div v-else class="webListWrapper">
      <v-layout class="userWebList" align-center justify-center fill-height>
        <!--ㅡmerchant-->
        <v-flex  md3 text-md-left>
          <v-layout align-center>
              <avatar
              :name = user.email[0]
              :isLogin = user.isLogin
              :color = user.color>
            </avatar>
            <span class="ml-3">
              {{user.email}} ( {{user.volumeTotal}} | {{user.tradeRate}}%)
            </span>
            <!--판매자 rank-->
            <img :src="rankSrc" class="userRank">
          </v-layout>
        </v-flex>
        <!--available-->
        <v-flex md2 text-md-left >{{user.volumeTotal}} {{token}} </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >{{user.limitMax}} {{currency}} </v-flex>
        <!--price-->
        <v-flex md2 text-md-left >{{user.price}} {{token}} </v-flex>
        <!-- payment method-->
        <v-flex md3 text-md-right>
          <v-layout align-center >
            <!--payment method-->
            <a class="tooltips">
              <img class="mr-2" src="../../../../../assets/img/method_bankaccount.png">
              <span class="BankTooltip tooltip-content">{{$str("bankAccountText")}}</span>
            </a>
            <a class="tooltips">
              <img class="mr-2" src="../../../../../assets/img/method_alipay.png">
              <span class="tooltip-content">{{$str("alipayText")}}</span>
            </a>
            <a class="tooltips">
              <img src="../../../../../assets/img/method_wechatpay.png">
              <span class="tooltip-content">{{$str("wechatPayText")}}</span>
            </a>
            <!--img와 button을 양쪽에 정렬시키기 위함.-->
            <v-spacer></v-spacer>
            <!-- buy 혹은 sell button -->
            <button class="common-rounded-button" @click="drawer = !drawer">
              {{tradeType}} {{token}}
            </button>
          </v-layout>
        </v-flex>
      </v-layout>

      <!--Buy 를 위한 modal-->
      <div v-if="drawer" class="buyWebModal">
        <v-layout row wrap>
          <v-flex md3 text-md-left >
            <v-layout pl-4>
              <!--avarta-->
              <avatar
                        :name = user.email[0]
                        :isLogin = user.isLogin
                        :color = user.color>
              </avatar>

              <!-- merchant 정보-->
              <span>
                <span class="mr-2 ml-3">
                  {{user.email}} ( {{user.volumeTotal}} | {{user.tradeRate}}%)
                </span>
                <img :src="rankSrc" class="userRank">
                <div class="ml-3">{{$str("Available")}}  {{user.volumeTotal}} {{token}}</div>
              </span>
            </v-layout>
          </v-flex>

          <v-flex md2 text-md-left>
            <div>
              {{user.volumeTotal}} {{currency}}
            </div>
            <div>
              {{user.volumeTotal}} {{currency}}
            </div>
          </v-flex>

          <v-flex md4 text-md-left>
            <input type="number" class="userInput" name="toValue" v-model="toValue"
                   :placeholder="currency">
            <span><-></span>
            <input type="number" class="userInput" name="fromValue" v-model="fromValue"
                   :placeholder="tradeType">
          </v-flex>
          <v-flex md3 text-md-left>
            <button class="common-rounded-button common-btn-hover mr-3">{{$str("confirm")}} </button>
            <button class="common-rounded-flat-button common-text-hover" @click="drawer = !drawer">{{$str("cancel")}} </button>
          </v-flex>
        </v-layout>
        <v-layout row wrap buyWebModal-secondRow>
          <v-flex md6 text-md-left>
            <div class="margin-left-74">
              <!--Bank account-->
              <img class="mr-2"src="../../../../../assets/img/method_bankaccount.png">
              <span class="mr-3">{{$str("bankAccountText")}}</span>
              <!--Alipay-->
              <img class="mr-2" src="../../../../../assets/img/method_alipay.png">
              <span class="mr-3">{{$str("alipayText")}}</span>
              <!--WechatPay-->
              <img class="mr-2"src="../../../../../assets/img/method_wechatpay.png">
              <span class="mr-3">{{$str("wechatPayText")}}</span>
            </div>
          </v-flex>
          <v-flex md5 text-md-right>
            <span class="TextDarkgray">{{$str("Payment_window_is_15minutes")}}</span>
          </v-flex>

        </v-layout>



        <!-- 판매자가 남긴 요구 메모가 있을시-->
        <v-layout mt-5>
          <v-flex md12 v-if="user.memo !== '' " margin-left-74 mr-4 text-md-left>
            {{$str("userMemo")}}： <br>
            {{user.memo}}
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import Avatar from '@/components/Avatar.vue';
    export default {
        name: "TradeListItem",
        data: () => ({
            drawer: false,
            pwPlaceholder: 'Trade Password',
            toValue : '',
            fromValue : '',
            tradePassword : '',
            token : 'BTC',      //현재 거래하고자 하는 coin
            currency : 'CNY',   //현재 사용하고자 하는 화폐단위
            tradeType : 'BUY',  //살건지 팔건지 여부.
            rankSrc : ''


        }),
        components:{Avatar},
        props : {
            user: {},
        },
        methods : {

        },
        mounted(){
          switch (this.user.rank) {
              case 1:
                  this.rankSrc = require('../../../../../assets/img/rank_crown.png');
                  break;
              case 2:
                  this.rankSrc = require('../../../../../assets/img/rank_diamond.png');
                  break;
              default:
                  this.rankSrc = '';
          }
        },
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
        },

    }
</script>

<style scoped>
  .webListWrapper{
    position: relative;
  }
  .userWebList{
    height: 84px;
    position: relative;
    z-index: 0;
  }
  .userInput{
    height: 36px;
    border-radius: 2px;
    background-color: #f8f8fa;
    border: solid 1px #8d8d8d;
    width: 153px;
  }
  .mobileInput{
    height: 36px;
    border-radius: 2px;
    background-color: #f8f8fa;
    border: solid 1px #8d8d8d;
    width: 100%
  }
  .userRank{
    width: 16px;
    height: 18px;
    margin-left: 16px;
  }

  .BankTooltip{
    width: 101px;
  }
  .buyWebModal{
    min-height: 171px;
    background-color: #ffffff;
    width: 100%;
    position: absolute;
    border-radius: 2px;
    padding-top: 24px;
    padding-bottom: 48px;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    display: block;
    z-index: 1;
  }

  .buyWebModal-secondRow{
    margin-top: 36px;
  }
  .margin-left-74{
    margin-left: 74px;
  }

</style>