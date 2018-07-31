<template>
  <div>
    <!-- mobile 일때 -->
    <div v-if="isMobile">
      <v-layout row wrap>
        <v-flex xs12 text-xs-left mt-5 mb-4>
          <avatar
                :name = merchant.email[0]
                :isLogin = merchant.isLogin
                :color = merchant.color class="f-left mr-3">
          </avatar>
          <h5 class="ml-3">
            {{merchant.email}}
          </h5>
          <!--판매자 rank-->
          <h6 class="ml-3 color-darkgray">Created at: {{merchant.register_datetime}}</h6>
        </v-flex>
        <v-flex xs12><v-divider></v-divider></v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mt-3 mb-2>Security deposit</v-flex>
        <v-flex xs4 text-xs-right mt-3 mb-2>1 BTC</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>Completion rate</v-flex>
        <v-flex xs4 text-xs-right mb-2>{{merchant.tradeRate}}% </v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>Trades</v-flex>
        <v-flex xs4 text-xs-right mb-2>2667 Times</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>Trades in 30days</v-flex>
        <v-flex xs4 text-xs-right mb-2>641 Times</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-3>Avg release</v-flex>
        <v-flex xs4 text-xs-right mb-3>3.13 Min</v-flex>
        <v-flex xs12><v-divider></v-divider></v-flex>

        <v-flex xs3 offset-xs2 text-xs-left>
          <v-layout mt-4>
          <h6>Email</h6>
          <h6 class="ic-success-sm sprite-img ml-1"></h6>
          </v-layout>
        </v-flex>
        <v-flex xs7 text-xs-right >
          <v-layout justify-end mt-4>
          <h6>ID Verification</h6>
          <h6 class="ic-success-sm sprite-img ml-1 "></h6>
          </v-layout>
        </v-flex>
        <v-flex xs3 offset-xs2 text-xs-left>
          <v-layout mt-3>
          <h6>Phone</h6>
          <h6 class="ic-success-sm sprite-img ml-1"></h6>
          </v-layout>
        </v-flex>
        <v-flex xs7 text-xs-right>
          <v-layout justify-end mt-3>
          <h6>Advanced Verification</h6>
          <h6 class="ic-success-sm sprite-img ml-1 "></h6>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-flex xs12 text-xs-left mt-5>
        <h3 class="bold">Online Sell</h3>
      </v-flex>
      <div  v-for="user in users" >
        <trade-list-item
                :user="user"
        ></trade-list-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
      <v-flex text-xs-left mt-5>
        <h3 class="bold">Online Buy</h3>
      </v-flex>
      <div  v-for="user in users">
        <trade-list-item
                :user="user"
        ></trade-list-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
    </div>

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
          <div>{{merchant.volumeTotal}}</div>
          <div class="color-darkgray"> Security deposit</div>
        </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >
          <div>{{merchant.tradeRate}} %</div>
          <div class="color-darkgray"> Completion rate</div>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.tradeRate}} Times</div>
          <div class="color-darkgray">Trades</div>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.tradeRate}} Times</div>
          <div class="color-darkgray">Trades in 30 days</div>
        </v-flex>
        <v-flex md1 text-md-right >
          <div>{{merchant.tradeRate}} Min</div>
          <div class="color-darkgray"> Avg release</div>
        </v-flex>
      </v-layout>
      <v-flex><v-divider></v-divider></v-flex>
      <!--2번째 줄-->
      <v-layout mt-3 mb-4a>
        <v-flex md3 text-md-left>
          <h6>Created at : {{merchant.register_datetime}}</h6>
        </v-flex>
        <v-flex md9>
          <v-layout justify-end>
            <h6>Email</h6>
            <h6 class="ic-success-sm sprite-img ml-1 mr-4"></h6>
            <h6>Phone</h6>
            <h6 class="ic-success-sm sprite-img ml-1 mr-4"></h6>
            <h6>ID Verification</h6>
            <h6 class="ic-success-sm sprite-img ml-1 mr-4"></h6>
            <h6>Advanced Verification</h6>
            <h6 class="ic-success-sm sprite-img ml-1"></h6>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--Online Sell title-->
      <v-flex text-md-left mb-4 bold>
        <h3>Online Sell</h3>
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
      <div v-for="user in users"  >
        <trade-list-item
                :user ="user"
        ></trade-list-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
      <!--Online Buy title-->
      <v-flex text-md-left mb-4 mt-4a bold>
        <h3>Online Buy</h3>
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
      <div v-for="user in users"  >
        <trade-list-item
                :user ="user"
        ></trade-list-item>
        <v-flex><v-divider></v-divider></v-flex>
      </div>
      <v-flex text-md-right mt-3 mb-6>
        Do not want to trade with this user?
        <span class="color-blue"> Block this user</span>
      </v-flex>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import TradeListItem from "../tradeListItem/TradeListItem.vue"
    import Avatar from '@/components/Avatar.vue';

    export default {
        name: "UserPage",
        components: {TradeListItem,Avatar,},
        data: () =>({
            merchant:
                {
                    email: 'Charles',
                    volumeTotal: 119,
                    register_datetime : '2017-12-13 15:08:28',
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                }
            ,
            users: [
                {
                    email: 'Charles',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                },
                {
                    email: 'Dean',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : false,
                    color : '#E05543',
                    rank : 2,
                },
                {
                    email: 'Jack',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : false,
                    color : '#E25422',
                    rank : 1,
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
</style>