<template>
    <div class="tokenlistWraaper">
      <v-layout row wrap  >
        <!--로고-->
        <v-flex md1 xs11 text-xs-left text-md-center >
          <div class="relative"><img :src="logoimg"></div>
          <div class="coinselect-1 mb-4">{{tokenlist.name}}</div>
        </v-flex>
        <!--1. OTC Account 카드-->
        <v-flex md3 xs12  text-xs-left>
          <div class="webCard">
            <div class="coinselect-2 mb-2">OTC Account</div>
            <v-layout justify-space-between mb-1>
              <span class="text-darkgray">Available: </span>
              <span>{{tokenlist.OtcAvailable}} {{tokenlist.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-3>
              <span class="text-darkgray">Frozen: </span>
              <span>{{tokenlist.OtcAvailable}} {{tokenlist.name}}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--2. Exchange Account-->
        <v-flex md3 xs12  text-xs-left >
          <div class="webCard">
            <div class="coinselect-2 mb-2">Exchange Account</div>
            <v-layout justify-space-between mb-1>
              <span class="text-darkgray">Available: </span>
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
            <v-flex xs5 md7 offset-md5 mb-4 pl-0 >
               <button class="common-normal-bordered-button">{{$str("Transfer")}}</button>
            </v-flex>
            <v-spacer></v-spacer>
            <!-- Deposit 버튼-->
            <v-flex xs5 md7 offset-md5 pl-0>
              <button class="common-normal-button">{{$str("Deposit")}}</button>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
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
    padding-bottom: 32px;
  }
  /*mobile 에서 좌우 패딩주기*/
  @media only screen and (max-width: 959px) {
    .tokenlistWraaper{
      padding-left: 24px;
      padding-right: 45px;
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