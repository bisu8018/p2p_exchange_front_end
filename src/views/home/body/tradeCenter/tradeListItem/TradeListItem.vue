<template>
  <div>

    <!-- mobile 일때-->
    <div v-if="isMobile">
      <div>
        <!-- name-->
        <v-layout>
          <v-flex xs2 ><td>
            <v-avatar color="" :size="34">
              <span class=" ">{{user.email[0]}}</span>
            </v-avatar></td></v-flex>
          <v-flex xs10 text-xs-left>
            {{user.email}} ( {{user.volumeTotal}} | 99%)
            <img src="../../../../../assets/img/rank_crown.png">
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
        <v-layout>
          <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left>Price :</v-flex>
            <v-flex xs6 text-xs-right> {{user.price}} {{currency}} </v-flex>
        </v-layout>
        <!-- Payment Methods -->
        <v-layout>
          <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left>
              <img src="../../../../../assets/img/method_alipay.png">
              <img src="../../../../../assets/img/method_bankaccount.png">
              <img src="../../../../../assets/img/method_wechatpay.png">
            </v-flex>
            <!--거래 버튼-->
            <v-flex xs6 text-xs-right>
              <button class="Button" @click="drawer = !drawer">
                {{$str("buy")}} BTC</button>
            </v-flex>
        </v-layout>
      </div>

      <!--거래를 위한 mobile modal-->
      <div v-if="drawer" class="mobileModal">
        <!-- name-->
        <v-layout>
          <v-flex xs2><td class="text-xs-left">
            <v-avatar color=""   :size="34">
              <span class="">{{user.email[0]}}</span>
            </v-avatar></td>
          </v-flex>
          <v-flex xs6 text-xs-left>{{user.email}} ( {{user.volumeTotal}} | 99%)</v-flex>
          <v-flex xs4 text-xs-left><img src="../../../../../assets/img/rank_crown.png"></v-flex>
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
          <v-flex xs7>Payment window is 20 minutes</v-flex>
          <v-flex xs4 text-xs-right><button class="Button" @click="">{{$str("confirm")}}</button></v-flex>
        </v-layout>
      </div>

    </div>


    <!--Web 일때-->
    <div v-else>
      <v-layout userList pt-4 >
        <!--ㅡmerchant-->
        <v-flex  md3 text-md-left >
          <td>
            <v-avatar color=""   :size="30">
              <span class="">{{user.email[0]}}</span>
            </v-avatar> {{user.email}} ( {{user.volumeTotal}} | {{user.tradeRate}}%)
            <!--판매자 rank-->
            <img class="ml-2" src="../../../../../assets/img/rank_crown.png">
          </td>
        </v-flex>
        <!--available-->
        <v-flex md2 text-md-left >{{user.volumeTotal}} {{token}} </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >{{user.limitMax}} {{currency}} </v-flex>
        <!--price-->
        <v-flex md2 text-md-left >{{user.price}} {{token}} </v-flex>
        <!-- payment method-->
        <v-flex md2 text-md-left >
          <img src="../../../../../assets/img/method_alipay.png">
          <img src="../../../../../assets/img/method_bankaccount.png">
          <img src="../../../../../assets/img/method_wechatpay.png">
        </v-flex>
        <!-- but 혹은 sell button -->
        <v-flex md1 text-md-right >
          <button class="Button" @click="drawer = !drawer">
            {{tradeType}} {{token}} </button>
        </v-flex>
      </v-layout>

      <!--Buy 를 위한 modal-->
      <div v-if="drawer" class="">

        <v-layout row wrap>
          <v-flex md3 text-md-left >
            <!--avarta-->
            <span>
              <v-avatar color=""  :size="30">
                <!--merchant email의 첫글자-->
              {{user.email[0]}}
              </v-avatar>
            </span>
            <!-- merchant 정보-->
            <span >
              <span class="mr-2">
                {{user.email}} ( {{user.volumeTotal}} | {{user.tradeRate}}%)
              </span>
              <img src="../../../../../assets/img/rank_crown.png">
              <div>{{$str("volume")}} : {{user.volumeTotal}} {{token}}</div>
            </span>
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
            <button class="">{{$str("confirm")}} </button>
            <button class="" @click="drawer = !drawer">{{$str("cancel")}} </button>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md4 >
            <img src="../../../../../assets/img/method_alipay.png"> {{$str("alipayText")}}
            <img src="../../../../../assets/img/method_bankaccount.png"> {{$str("bankAccountText")}}
            <img src="../../../../../assets/img/method_wechatpay.png">{{$str("wechatPayText")}}
          </v-flex>
          <v-flex md4></v-flex>
          <v-flex md4>
            <span class="TextDarkgray">{{$str("Payment_window_is_15minutes")}}</span>
          </v-flex>
        </v-layout>
        <!-- 판매자가 남긴 요구 메모가 있을시-->
        <v-layout>
          <v-flex v-if="user.memo !== '' " text-md-left>
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

        }),
        props : {

            user: {},





        },
        methods : {

        },
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
        }
    }
</script>

<style scoped>
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

</style>