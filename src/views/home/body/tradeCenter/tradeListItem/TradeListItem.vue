<template>
  <div>

    <!-- mobile 일때-->
    <div v-if="isMobile">
      <div>
        <!-- name-->
        <v-layout gridBox>
          <v-flex xs2 ><td class="text-xs-left">
            <v-avatar color="teal"  :size="34">
              <span class="white--text headline">{{uesr.email[0]}}</span>
            </v-avatar></td></v-flex>
          <v-flex xs6 text-xs-left>{{uesr.email}} ( {{user.volumeTotal}} | 99%)</v-flex>
          <v-flex xs4 text-xs-left><img src="../../../../../assets/img/rank_crown.png"></v-flex>
        </v-layout>
        <!-- Volume -->
        <v-layout gridBox>
            <v-flex xs3  offset-xs2 text-xs-left>Volume :</v-flex>
            <v-flex xs5 offset-xs1 text-xs-right> {{user.volumeTotal}} BTC </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout gridBox>
            <v-flex xs3  offset-xs2 text-xs-left>Limits :</v-flex>
            <v-flex xs5 offset-xs1 text-xs-right> {{user.limitMax}} CNY </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout gridBox>
            <v-flex xs3  offset-xs2 text-xs-left>Price :</v-flex>
            <v-flex xs5 offset-xs1 text-xs-right> {{user.price}} CNY </v-flex>
        </v-layout>
        <!-- Payment Methods -->
        <v-layout gridBox>
            <v-flex xs2 text-xs-right><img src="../../../../../assets/img/method_alipay.png"> </v-flex>
            <v-flex xs1 text-xs-right> <img src="../../../../../assets/img/method_bankaccount.png"> </v-flex>
            <v-flex xs1 text-xs-right><img src="../../../../../assets/img/method_wechatpay.png"></v-flex>
            <v-flex xs8 text-xs-right><button class="ctlButton Button btnHover" @click="drawer = !drawer">{{$str("buy")}} BTC</button></v-flex>
        </v-layout>
      </div>

      <!--거래를 위한 mobile modal-->
      <div v-if="drawer" class="mobileModal">
        <!-- name-->
        <v-layout gridBox>
          <v-flex xs2 ><td class="text-xs-left">
            <v-avatar color="teal"  :size="34">
              <span class="white--text headline">{{user.email[0]}}</span>
            </v-avatar></td></v-flex>
          <v-flex xs6 text-xs-left>{{user.email}} ( {{user.volumeTotal}} | 99%)</v-flex>
          <v-flex xs4 text-xs-left><img src="../../../../../assets/img/rank_crown.png"></v-flex>
        </v-layout>
        <!-- Volume -->
        <v-layout gridBox>
          <v-flex xs3  offset-xs2 text-xs-left>Volume :</v-flex>
          <v-flex xs5 offset-xs1 text-xs-right> {{user.volumeTotal}} AllB </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout gridBox>
          <v-flex xs3  offset-xs2 text-xs-left>Limits :</v-flex>
          <v-flex xs5 offset-xs1 text-xs-right> {{user.limitMax}} SGD </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout gridBox>
          <v-flex xs3  offset-xs2 text-xs-left>Price :</v-flex>
          <v-flex xs5 offset-xs1 text-xs-right> {{user.price}} SGD </v-flex>
        </v-layout>
        <!-- payment methods -->
        <v-layout gridBox>
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
          <v-flex xs4 text-xs-right><button class="confirmButton Button btnHover" @click="">{{$str("confirm")}}</button></v-flex>
        </v-layout>
      </div>

    </div>


    <!--Web 일때-->
    <div v-else>
      <v-layout userList pt-4 >
        <v-flex  md3 text-md-left gridBox>
          <td>
            <v-avatar color="teal"  :size="30">
              <span class=" headline">{{user.email[0]}}</span>
            </v-avatar> {{user.email}} ( {{user.volumeTotal}} | 99%)
            <!--판매자 rank-->
            <img class="ml-2" src="../../../../../assets/img/rank_crown.png">
          </td>
        </v-flex>

        <v-flex md2 text-md-left gridBox>{{user.volumeTotal}} BTC </v-flex>
        <v-flex md2 text-md-left gridBox>{{user.limitMax}} CNY </v-flex>
        <v-flex md2 text-md-left gridBox>{{user.price}} CNY </v-flex>
        <!-- payment method-->
        <v-flex md2 text-md-left gridBox>
          <img src="../../../../../assets/img/method_alipay.png">
          <img src="../../../../../assets/img/method_bankaccount.png">
          <img src="../../../../../assets/img/method_wechatpay.png">
        </v-flex>
        <!-- but 혹은 sell button -->
        <v-flex md1 text-md-right gridBox>
          <button class="ctlButton Button btnHover" @click="drawer = !drawer">
            {{$str("buy")}} BTC</button>
        </v-flex>
      </v-layout>

      <!--Buy 를 위한 modal-->
      <div v-if="drawer" class="userModal">

        <v-layout row wrap>
          <v-flex md1 text-md-left>
            <span><v-avatar color="teal"  :size="30">
            <span class=" headline">{{user.email[0]}}</span>
            </v-avatar></span>
          </v-flex>
          <v-flex md2 text-md-left>
              <span>
                {{user.email}} ( {{user.volumeTotal}} | 99%)
                <img src="../../../../../assets/img/rank_crown.png">
              </span>
            <div>Volume: {{user.volumeTotal}} AllB</div>
          </v-flex>
          <v-flex md2>
            <div>
              {{user.volumeTotal}} SGD
            </div>
            <div>
              {{user.volumeTotal}} SGD
            </div>
          </v-flex>

          <v-flex md4 text-md-left>

            <input type="number" class="userInput" name="toValue" v-model="toValue"
                   :placeholder="toPlaceholder">

            <span><-></span>
            <input type="number" class="userInput" name="fromValue" v-model="fromValue"
                   :placeholder="fromPlaceholder">
          </v-flex>
          <v-flex md3 text-md-right>
            <button class="confirmButton Button btnHover" >{{$str("confirm")}} </button>
            <button class="cancelButton  btnHover" >{{$str("cancel")}} </button>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md1></v-flex>
          <v-flex md4>
            <img src="../../../../../assets/img/method_alipay.png"> Alipay
            <img src="../../../../../assets/img/method_bankaccount.png"> Bank Account
            <img src="../../../../../assets/img/method_wechatpay.png"> Wechatpay
          </v-flex>
          <v-flex md5>
            <input type="number" class="userInput" name="fromValue" v-model="fromValue"
                   :placeholder="fromPlaceholder">
          </v-flex>
          <v-flex md2>
            <span class="TextDarkgray">Payment window is 20minutes</span>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "ListUser",
        data: () => ({
            drawer: false,
            toPlaceholder: 'CNY',
            fromPlaceholder: 'AllB',
            pwPlaceholder: 'Trade Password',
            toValue : '',
            fromValue : '',
            tradePassword : '',

        }),
        props : {
            name: {
                type: String,
                default: '',
            },
            volumeTotal : 0,
            limitMax : 0,
            price : 0,
            dealMode : 0,
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
  .userList{
    height: 90px;
  }
  .userModal{
    display: block;
    height: 90px;
    border : solid 1px #c8c8c8;
  }
  .mobileModal{

    border : solid 1px #c8c8c8;

  }
  .ctlButton{
    border-radius: 86px;
    color: white;
    height: 36px;
    width: 86px;
  }
  .confirmButton{
    border-radius: 86px;
    color: white;
    height: 36px;
    width: 86px;
  }
  .cancelButton{
    border-radius: 86px;
    border : solid 1px #c8c8c8;
    color: #9294A6;
    height: 36px;
    width: 86px;
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

</style>