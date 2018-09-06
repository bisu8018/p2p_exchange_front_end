<template>
    <div class="tokenlistWraaper">
      <v-layout row wrap >
        <!--로고-->
        <v-flex md1 xs11 text-xs-left text-md-center >
          <!--logo img-->
          <div class="pb-2 d-inline-block">
            <div :class="tokenImg"></div>
          </div>
          <div class=" mb-4">
            <h4 class="bold">{{ getCryptoName(item.cryptoCurrency) }}</h4>
          </div>
        </v-flex>
        <!--1. OTC Account 카드-->
        <v-flex md4 xs12  text-xs-left>
          <div class="webCard">
            <h4 class="mb-3 medium">{{$str("OTC_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{ toMoneyFormat($fixed(item.availableAmount, item.cryptoCurrency))}} {{getCryptoName(item.cryptoCurrency)  }}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{ toMoneyFormat($fixed(item.frozenAmount, item.cryptoCurrency))}} {{getCryptoName(item.cryptoCurrency) }}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--2. Exchange Account 날라감-->
        <v-flex md4 xs12  text-xs-left >
          <!--div class="webCard">
            <h4 class="mb-3 medium">{{$str("Exchange_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{item.ExAvailable}} {{item.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{item.ExFrozen}} {{item.name}}</span>
            </v-layout>
          </div-->
        </v-flex>
        <!--마지막 버튼-->
        <v-flex md3 xs12 >
          <v-layout row wrap justify-space-between>
            <!--Transfer 버튼-->
            <div class="right-button">
              <button class="btn-blue btn-blue-hover bold c-pointer" @click="showDepositDialog = true">{{$str("Deposit")}}</button>
            </div>
            <!--mobile에서 버튼사이 공간을 주기위한 spacer-->
            <!-- Deposit 버튼-->
            <div class="right-button">
              <button class="btn-white  bold c-pointer" @click="showWithdrawDialog = true">{{$str("withdraw")}}</button>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--Deposit modal-->
      <balance-deposit-dialog
              v-if="showDepositDialog"
              :show = showDepositDialog
              :cryptoCurrency = item.cryptoCurrency
              :walletAddress = item.walletAddress
              v-on:close="closeDeposit"
      />
      <!--withdraw modal-->
      <balance-withdrawal-dialog
              v-if="showWithdrawDialog"
              :show = showWithdrawDialog
              :cryptoCurrency = item.cryptoCurrency
              v-on:close="closeWithdrawal"
      />

    </div>
</template>

<script>
    import MainRepository from '../../../../../vuex/MainRepository';
    import Balance from '../../../../../vuex/model/Balance'
    import {abUtils} from "../../../../../common/utils";
    import BalanceDepositDialog from './dialog/BalanceDepositDialog'
    import BalanceWithdrawalDialog from './dialog/BalanceWithdrawalDialog'

    export default {
        name: "BalanceTokenList",
        props : {
            item : { type: Balance },
        },
        components:{
            BalanceDepositDialog, BalanceWithdrawalDialog
        },
        data: () => ({
            istoken :[
                {isBTC : false},
                {isETH : false},
                {isALLB : false},
            ],
            showWithdrawDialog : false,
            showDepositDialog : false,
            tokenImg : '',
        }),

        mounted(){
            switch (this.item.cryptoCurrency) {
                case 'bitcoin':
                case 'BTC':
                    this.tokenImg = 'sprite-img ic-btc-lg';
                    break;
                case 'ethereum':
                case 'ETH':
                    this.tokenImg = 'sprite-img ic-eth-lg';
                    break;
                case 'allb':
                case 'ALLB':
                    this.tokenImg = 'sprite-img ic-allb-lg';
                    break;
            }
        },
        methods: {
            getCryptoName(curerncy) {
                switch (curerncy) {
                    case 'bitcoin':
                    case 'BTC':
                        return 'BTC';
                    case 'ethereum':
                    case 'ETH':
                        return 'ETH';
                    case 'allb':
                    case 'ALLB':
                        return 'ALLB';
                }
            },
            onCopy() {
                this.$clipboard(this.item.walletAddress)
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
            closeDeposit(){
                this.showDepositDialog = false
            },
            closeWithdrawal(){
                this.showWithdrawDialog = false
            },
        }
    }
</script>

<style scoped>
  .tokenlistWraaper{
    background-color: #ffffff;
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

  .right-button{
    width: 45%;
    margin-bottom: 16px;
  }
  @media only screen and (min-width: 960px) {
    .right-button {
      margin-top : 30px;
    }
  }
</style>