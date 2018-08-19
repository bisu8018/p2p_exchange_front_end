<template>
  <div>
    <!-- mobile 일때 -->
    <div v-if="isMobile">
      <v-layout row wrap>
        <v-flex xs12 text-xs-left mt-5 mb-4>
          <avatar
                :name = merchant.email[0]
                :isLogin = merchant.isLogin
                :color = merchant.color class="f-left mr-3">192.168
          </avatar>
          <h5 class="ml-3">
            <v-layout>
              {{merchant.email}}
              <h5 class="userRank sprite-img ic-premium"></h5>
            </v-layout>
          </h5>
          <!--판매자 rank-->
          <h6 class="ml-3 color-darkgray">Created at: {{merchant.register_datetime}}</h6>
        </v-flex>
        <v-flex xs12><v-divider></v-divider></v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mt-3 mb-2>Security deposit</v-flex>
        <v-flex xs4 text-xs-right mt-3 mb-2>{{merchant.security_deposit}} BTC</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>Completion rate</v-flex>
        <v-flex xs4 text-xs-right mb-2>{{merchant.tradeRate}} % </v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>Trades</v-flex>
        <v-flex xs4 text-xs-right mb-2>{{merchant.totalTrades}} Times</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>Trades in 30days</v-flex>
        <v-flex xs4 text-xs-right mb-2>{{merchant.trades_inMonth}} Times</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-3>Avg release</v-flex>
        <v-flex xs4 text-xs-right mb-3>{{merchant.Avg_release}} Min</v-flex>
        <v-flex xs12><v-divider></v-divider></v-flex>

        <v-flex xs3 offset-xs2 text-xs-left mt-4>
          <v-layout v-if="merchant.verifiedEmail" align-center>
            <h6>Email</h6>
            <h6 class="ic-success-sm sprite-img ml-1"></h6>
          </v-layout>
        </v-flex>
        <v-flex xs7 text-xs-right mt-4>
          <v-layout v-if="merchant.verifiedID" justify-end align-center >
            <h6>ID Verification</h6>
            <h6 class="ic-success-sm sprite-img ml-1 "></h6>
          </v-layout>
        </v-flex>
        <v-flex xs3 offset-xs2 text-xs-left mt-3>
          <v-layout v-if="merchant.verifiedPhone" align-center >
            <h6>Phone</h6>
            <h6 class="ic-success-sm sprite-img ml-1"></h6>
          </v-layout>
        </v-flex>
        <v-flex xs7 text-xs-right mt-3>
          <v-layout v-if="merchant.verifiedAdvanced" justify-end align-center >
            <h6>Advanced Verification</h6>
            <h6 class="ic-success-sm sprite-img ml-1 "></h6>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--SELL-->
      <v-flex xs12 text-xs-left mt-5 mb-2>
        <h3 class="bold">Online Sell</h3>
      </v-flex>
      <div  v-for="user in SellLists" >
          <user-trade-item
                  :user="user"
                  :tradeType = "tradeType = 'SELL'"
          ></user-trade-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
      <!--Buy-->
      <v-flex text-xs-left mt-5 mb-2>
        <h3 class="bold">Online Buy</h3>
      </v-flex>
      <div  v-for="user in BuyLists">
        <user-trade-item
                :user="user"
                :tradeType = "tradeType = 'BUY'"
        ></user-trade-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
      <v-flex text-xs-right color-darkgray mt-3 mb-5>
        Do not want to trade with this user?<br>
        <span class="color-blue" @click="showBlockModal = true"> Block this user</span>
      </v-flex>
    </div>
    <!--Web 일때-->
    <div v-else>
      <!--최 상단부 user정보-->
      <v-layout class="userWebList" align-center justify-center fill-height mt-5 mb-4>
        <v-flex  md3 text-md-left>
          <v-layout align-center>
            <avatar
                    :name = merchant.email[0]
                    :isLogin = merchant.isLogin
                    :color = merchant.color>
            </avatar>
            <span class="ml-3 color-blue">
            {{merchant.email}}
            </span>
            <!--판매자 rank-->
            <span class="userRank sprite-img ic-premium"></span>
          </v-layout>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.security_deposit}} BTC</div>
          <div class="color-darkgray">{{$str("Security_Deposit")}} </div>
        </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >
          <div>{{merchant.tradeRate}} %</div>
          <div class="color-darkgray">{{$str("Completion_rate")}}</div>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.totalTrades}} {{$str("Times")}}</div>
          <div class="color-darkgray">{{$str("Trades")}}</div>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.trades_inMonth}} {{$str("Times")}}</div>
          <div class="color-darkgray">{{$str("Trades_in_30_days")}}</div>
        </v-flex>
        <v-flex md1 text-md-right >
          <div>{{merchant.Avg_release}} {{$str("Min")}}</div>
          <div class="color-darkgray"> {{$str("Avg_release")}}</div>
        </v-flex>
      </v-layout>
      <v-flex><v-divider></v-divider></v-flex>
      <!--2번째 줄-->
      <v-layout mt-3 mb-4a>
        <v-flex md3 text-md-left>
          <h6 class="color-darkgray">Created at : {{merchant.register_datetime}}</h6>
        </v-flex>
        <v-flex md9>
          <v-layout justify-end >
            <div v-if="merchant.verifiedEmail" class="vertical-center">
              <h6 class="veri_icon">{{$str("email")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 mr-4 veri_icon"></h6>
            </div>
            <div v-if="merchant.verifiedPhone" class="vertical-center">
              <h6 class="veri_icon">{{$str("Phone")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 mr-4 veri_icon"></h6>
            </div>
            <div v-if="merchant.verifiedID" class="vertical-center">
              <h6 class="veri_icon">{{$str("ID_Verification")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 mr-4 veri_icon"></h6>
            </div>
            <div v-if="merchant.verifiedAdvanced" class="vertical-center">
              <h6 class="veri_icon">{{$str("Advanced_Verification")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 veri_icon"></h6>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--Online Sell title-->
      <v-flex text-md-left mb-4 bold>
        <h3>{{$str("Online_Sell")}}</h3>
      </v-flex>
      <!-- chart의 title들 -->
      <v-layout mb-3>
        <v-flex  md3 text-md-left color-darkgray>
          {{$str("Coin")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("Available")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("limits")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("price")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("paymentMethod")}}
        </v-flex>
        <v-flex  md1 text-md-right color-darkgray>
          {{$str("control")}}
        </v-flex>
      </v-layout>
      <v-flex><v-divider></v-divider></v-flex>

      <!-- user item list들 10개씩 출력-->
      <div v-for="user in SellLists"  >
        <user-trade-item
                :user ="user"
                :tradeType = "tradeType = 'SELL'"
        ></user-trade-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
      <!--Online Buy title-->
      <v-flex text-md-left mb-4 mt-4a bold>
        <h3>{{$str("Online_Buy")}}</h3>
      </v-flex>
      <!-- chart의 title들 -->
      <v-layout mb-3>
        <v-flex  md3 text-md-left color-darkgray>
          {{$str("Coin")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("Available")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("limits")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("price")}}
        </v-flex>
        <v-flex  md2 text-md-left color-darkgray>
          {{$str("paymentMethod")}}
        </v-flex>
        <v-flex  md1 text-md-right color-darkgray>
          {{$str("control")}}
        </v-flex>
      </v-layout>
      <v-flex><v-divider></v-divider></v-flex>

      <!-- user item list들 10개씩 출력-->
      <div v-for="user in BuyLists"  >
        <user-trade-item
                :user ="user"
                :tradeType = "tradeType = 'BUY'"
        ></user-trade-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
      <v-flex text-md-right mt-3 mb-6>
        {{$str("Do_not_want_to_trade_with_this_user?")}}
        <span class="color-blue" @click="showBlockModal = true"> {{$str("Block_this_user")}}</span>
      </v-flex>
    </div>

    <v-dialog v-model="showBlockModal">
      <v-layout row wrap>
        <v-flex pl-3 pr-3 mb-4>
          <h3 class="bold f-left">{{$str("Notice")}}</h3>
          <button class="f-right"><i class="material-icons " @click="showBlockModal = false">close</i></button>
        </v-flex>
        <v-flex pl-3 pr-3 mb-4>
          <h5 class="color-darkgray">{{$str("Block_user_explain")}}</h5>
        </v-flex>
        <v-flex pl-3 pr-3>
          <v-layout justify-end>
            <button class="btn-rounded-white text-white-hover" @click="showBlockModal = false">
              <h6 >{{$str("cancel")}}</h6>
            </button>
            <button class="btn-rounded-blue btn-blue-hover">
              <h6 >{{$str("confirm")}}</h6>
            </button>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-dialog>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import UserTradeItem from "./userTradeItem/UserTradeItem"
    import Avatar from '@/components/Avatar.vue';

    export default {
        name: "UserPage",
        components: {UserTradeItem,Avatar,},
        data: () =>({
            showBlockModal : false,
            tradeType : "BUY",
            merchant:
                {
                    email: 'Charles',
                    rank : 1,
                    isLogin : true,
                    color : '#8869CA',
                    security_deposit: 1,
                    tradeRate: 98,
                    totalTrades: 2667,
                    trades_inMonth: 641,
                    Avg_release: 3.13,
                    register_datetime : '2017-12-13 15:08:28',
                    verifiedEmail : true,
                    verifiedID : true,
                    verifiedPhone : true,
                    verifiedAdvanced : true,
                }
            ,
            BuyLists: [
                {
                    Coin: 'BTC',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '789',
                },
                {
                    Coin: 'ETH',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    bank_account : '',
                    wechat_id : '456',
                    alipay_id : '789',

                },
                // {
                //     Coin: 'USDT',
                //     volumeTotal: 119,
                //     limitMax: 66.0,
                //     price: 224,
                //     adType: 44.0,
                //     tradeRate: 99,
                //     memo: '',
                //     bank_account : '123',
                //     wechat_id : '456',
                //     alipay_id : '',
                //
                // },
                {
                    Coin: 'ALLB',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '',

                },
            ],
            SellLists: [
                {
                    Coin: 'BTC',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '789',

                },

            ]
        }),
        computed: {
            // dataInfo(){
            //     console.log(MainRepository.TradeView.getSelectPage());
            //     return MainRepository.TradeView.getSelectPage();
            // },
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        methods:{
        }
    }
</script>

<style scoped>
  .userWebList{

    position: relative;
    z-index: 0;
  }
  .userRank{
    max-width: 16px;
    height: 18px;
    margin-left: 16px;
  }
  .veri_icon{
    position: relative;
    display: inline-block;
  }
</style>