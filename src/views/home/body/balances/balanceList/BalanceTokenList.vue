<template>
    <div class="tokenlistWraaper">
      <v-layout row wrap >
        <!--로고-->
        <v-flex md1 xs11 text-xs-left text-md-center >
          <div class="relative pb-2 "><img :src="logoimg"></div>
          <div class="coinselect-1 mb-4">{{tokenlist.name}}</div>
        </v-flex>
        <!--1. OTC Account 카드-->
        <v-flex md3 xs12  text-xs-left>
          <div class="webCard">
            <div class="coinselect-2 mb-3">{{$str("OTC_Account")}}</div>
            <v-layout justify-space-between mb-2>
              <span class="text-darkgray">{{$str("Available")}}: </span>
              <span>{{tokenlist.OtcAvailable}} {{tokenlist.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="text-darkgray">{{$str("Frozen")}}: </span>
              <span>{{tokenlist.OtcAvailable}} {{tokenlist.name}}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--2. Exchange Account-->
        <v-flex md3 xs12  text-xs-left >
          <div class="webCard">
            <div class="coinselect-2 mb-3">Exchange Account</div>
            <v-layout justify-space-between mb-2>
              <span class="text-darkgray">{{$str("Available")}}: </span>
              <span>{{tokenlist.ExAvailable}} {{tokenlist.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="text-darkgray">Frozen: </span>
              <span>{{tokenlist.ExFrozen}} {{tokenlist.name}}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--마지막 버튼-->
        <v-flex md3></v-flex>
        <v-flex md2 xs12 >
          <v-layout row wrap >
            <!--Transfer 버튼-->
            <v-flex xs5 md7 offset-md5 pl-0 >
               <button class="common-normal-bordered-button bold mb-3" @click="showTransferModal = true">{{$str("Transfer")}}</button>
            </v-flex>
            <!--mobile에서 버튼사이 공간을 주기위한 spacer-->
            <v-spacer></v-spacer>
            <!-- Deposit 버튼-->
            <v-flex xs5 md7 offset-md5 pl-0>
              <button class="common-normal-button bold" @click="showDepositModal = true">{{$str("Deposit")}}</button>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--dialog-->
      <v-dialog v-model="showTransferModal" max-width="384px">
        <v-layout row wrap>
          <!--header-->
          <v-flex xs6 text-xs-left price-1 >{{$str("Transfer")}}</v-flex>
          <v-flex xs6 text-xs-right>
            <button><i class="material-icons " @click="showTransferModal = false">close</i></button>
          </v-flex>
          <v-flex xs12 text-darkgray text-xs-left mt-3 mb-4>
            {{$str("Transfer_to_Exchange_account_to_withdraw")}}
          </v-flex>
          <v-flex xs12 text-xs-left>
            Coin
          </v-flex>
          <v-flex xs12  mt-2 mb-4>
            list
          </v-flex>
          <v-flex xs4 text-xs-left>From</v-flex>
          <v-flex xs8 text-xs-right text-darkgray> (OTC balance: 0.0000{{tokenlist.name}})</v-flex>
          <v-flex xs12 mt-2 mb-4>
            list
          </v-flex>
          <v-flex xs4 text-xs-left>to</v-flex>
          <v-flex xs8 text-xs-right text-darkgray>(Exchange balance: 0.0000{{tokenlist.name}})</v-flex>
          <v-flex xs12 mt-2 mb-4>
            list
          </v-flex>
          <v-flex xs4 text-xs-left>Volume</v-flex>
          <v-flex xs8 text-xs-right text-darkgray>(Exchange balance: 0.0000{{tokenlist.name}})</v-flex>
          <v-flex xs12 mt-2 mb-4>
            list
          </v-flex>
          <v-flex xs12 text-xs-right>
            <button class="common-rounded-flat-button common-text-hover" @click="showTransferModal = false" >
             {{$str("cancel")}} </button>
            <button class="common-rounded-button common-btn-hover" >
             {{$str("TransferNow")}} </button>
          </v-flex>
        </v-layout>
      </v-dialog>
      <v-dialog v-model="showDepositModal" max-width="384px">
        <v-layout row wrap>
          <!--header-->
          <v-flex xs6 text-xs-left price-1 >{{$str("Deposit")}} {{tokenlist.name}}</v-flex>
          <v-flex xs6 text-xs-right>
            <button><i class="material-icons " @click="showDepositModal = false">close</i></button>
          </v-flex>
          <v-flex xs12 text-darkgray text-xs-center mt-3 mb-4>
            {{tokenlist.name}} {{$str("Deposit_Address")}}
          </v-flex>
          <v-flex xs12>
            copy url
          </v-flex>
          <v-flex xs12  mt-2 mb-4>
            <button>Copy</button>
          </v-flex>
          <v-flex xs12 mt-2 mb-4>
            QR Code
          </v-flex>
          <v-flex xs12 mt-2 mb-4>
            {{$str("Or_scan_this_QR_code")}}
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12 mt-2 mb-4>
            설명쭉
          </v-flex>

        </v-layout>
      </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "BalanceTokenList",
        props : {
            tokenlist : {},
        },
        methods : {

        },
        data: () => ({
            logoimg : '',
            showTransferModal : false,
            showDepositModal : false,


        }),
        mounted(){
            switch (this.tokenlist.logo){
                case 'BTC':
                    this.logoimg = require('../../../../../assets/img/coin_btc.png');
                    break;
                case 'ETH':
                    this.logoimg = require('../../../../../assets/img/coin_eth.png');
                    break;
                case 'USDT':
                    this.logoimg = require('../../../../../assets/img/coin_usdt.png');
                    break;
                case 'ALLB':
                    this.logoimg = require('../../../../../assets/img/coin_allb.png');
            }
        },
    }
</script>

<style scoped>
  .tokenlistWraaper{
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    min-height: 160px;
    padding-top: 32px;
    padding-bottom: 16px;
  }
  /*mobile 에서 좌우 패딩주기*/
  @media only screen and (max-width: 959px) {
    .tokenlistWraaper{
      padding-left: 20px;
      padding-right: 41px;
    }
  }
  /*web 에서 항목의 오른쪽을 줄이기 위해
    size 가변형으로 줄이기*/
  @media only screen and (min-width: 960px) {
    .webCard{
      width: 75%;
    }
  }

</style>