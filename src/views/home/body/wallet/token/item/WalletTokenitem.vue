<template>
    <div class="tokenlistWraaper">
      <div class="token-item-wrapper" @click="changeDrawer()">
        <!--logo img-->
        <div v-if="isGeneralCoin" :class="tokenImg"></div>
        <img v-else class="symbol" :src="item.symbolImgUrl">
        <h4 class="bold ml-2">{{ tokenName }}</h4>
        <v-spacer/>
        <span class=" flex-position">
          <span class="bold">{{ toMoneyFormat($fixed(item.availableAmount, item.cryptocurrency))}} {{tokenName}}</span>
          <span v-if="isGeneralCoin" class="color-darkgray ml-2">
            ≈ {{toMoneyFormat($fixed(estimatedValue, currency))}} {{currency}}
            <i v-if="drawer" class="material-icons  md-12 ">keyboard_arrow_up</i>
            <i v-else class="material-icons  md-12 ">keyboard_arrow_down</i>
          </span>
        </span>
      </div>
      <v-layout row wrap v-if="drawer" class="detail-wrapper">
        <!--1. OTC Account -->
        <v-flex md4 xs12  text-xs-left>
          <div class="webCard">
            <h4 class="mb-3 medium">{{$str("OTC_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{ toMoneyFormat($fixed(item.availableAmount, item.cryptocurrency))}} {{tokenName}}</span>
            </v-layout>
            <v-layout justify-space-between >
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{ toMoneyFormat($fixed(item.frozenAmount, item.cryptocurrency))}} {{tokenName}}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--2. Exchange Account-->
        <v-flex md3 xs12  text-xs-left >
          <div class="webCard">
            <h4 class="mb-3 medium margin-top-24">{{$str("Exchange_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{ toMoneyFormat($fixed('0000', item.cryptocurrency))}} {{tokenName}}</span>
            </v-layout>
            <v-layout justify-space-between >
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{ toMoneyFormat($fixed('0000', item.cryptocurrency))}} {{tokenName}}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--마지막 버튼-->
        <v-flex md5 xs12 >
          <v-layout row wrap justify-space-between>
            <!--Deposit 버튼-->
            <div class="right-button">
              <button class="btn-blue btn-blue-hover tool-btn " @click="showDeposit">{{$str("Deposit")}}</button>
            </div>
            <!-- Withdraw 버튼-->
            <div class="right-button">
              <button class="btn-white tool-btn " @click="showWithdrawal">{{$str("withdraw")}}</button>
            </div>
            <!--Transfer-->
            <div class="right-button">
              <button class="btn-blue btn-blue-hover tool-btn " @click="showTransfer">{{$str("Transfer")}}</button>
            </div>
            <!--Details-->
            <div class="right-button">
              <button class="btn-white btn-blue-hover tool-btn" @click="showDetails">{{$str("Details")}}</button>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--Deposit modal-->
      <wallet-deposit-dialog
              :tokenName = tokenName
              :walletAddress = item.walletAddress
      />
      <!--withdraw modal-->
      <wallet-withdrawal-dialog
              :tokenName = tokenName
              :availableAmount = item.availableAmount
      />

    </div>
</template>

<script>
    import MainRepository from '../../../../../../vuex/MainRepository';
    import Wallet from '../../../../../../vuex/model/Wallet'
    import {abUtils} from "../../../../../../common/utils";
    import WalletDepositDialog from '../../walletList/dialog/WalletDepositDialog'
    import WalletWithdrawalDialog from '../../walletList/dialog/WalletWithdrawalDialog'

    export default {
        name: "WalletTokenList",
        props : {
            item : { type: Wallet },
        },
        components:{
            WalletDepositDialog, WalletWithdrawalDialog
        },
        data: () => ({
            istoken :[
                {isBTC : false},
                {isETH : false},
                {isALLB : false},
            ],
            estimatedCurrencyValue : false,
            price : '',
        }),
        computed :{
            currency(){
                return MainRepository.Wallet.getStatus().currency
            },
            estimatedValue(){
                this.price = MainRepository.MarketPrice.controller().find(this.item.cryptocurrency, this.currency).price
                return this.item.availableAmount * this.price;
            },
            isGeneralCoin(){
              return  (MainRepository.Wallet.getStatus().cryptocurrencyType === 'General Coin')
            },
            drawer() {
                return (MainRepository.TradeView.getDrawer() == this.item.tokenNo);
            },
            tokenImg() {
                switch (this.item.cryptocurrency) {
                    case 'bitcoin':
                    case 'BTC':
                        return 'sprite-img ic-btc-sm';

                    case 'ethereum':
                    case 'ETH':
                        return 'sprite-img ic-eth-sm';

                    case 'allb':
                    case 'ALLB':
                        return 'sprite-img ic-allb-sm';
                }
            },
            tokenName(){
                if(this.isGeneralCoin) {
                    return this.getCryptoName(this.item.cryptocurrency)
                }else{
                    return this.item.tokenName;
                }
            }

        },
        mounted(){

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
            showDeposit(){
                this.$eventBus.$emit('showDepositDialog', this.tokenName);
            },
            showWithdrawal(){
                this.$eventBus.$emit('showWithdrawDialog', this.tokenName);
            },
            changeDrawer(){
                MainRepository.TradeView.setchangeDrawer(this.item.tokenNo);
            },
            showTransfer(){
                MainRepository.Wallet.updateStatus({
                    cryptocurrency : this.tokenName,
                })
                this.$eventBus.$emit('showTransferDialog');
            },
            showDetails(){
                MainRepository.router().goWalletDetail(this.tokenName);
            },

        }
    }
</script>

<style scoped>
  .tokenlistWraaper{
    background-color: #ffffff;
    min-height: 76px;
  }
  /*mobile 에서 좌우 패딩주기*/
  @media only screen and (max-width: 959px) {
    .webCard{
      padding-right: 12px;
      padding-left: 12px;
    }
    .right-button{
      width: 50%;
      padding-right: 12px;
      padding-left: 12px;
      padding-top: 24px;
    }
    .margin-top-24{
      margin-top: 24px;
    }
    .detail-wrapper{
      border-top: 1px solid #d1d1d1;
      background-color: #f8f8f8;
      padding-top: 24px;
      padding-bottom: 24px;
      padding-left: 12px;
      padding-right: 12px;
    }

    .flex-position{
      display: flex;
      flex-direction: column;
    }
  }
  /*web 에서 항목의 오른쪽을 줄이기 위해
    size 가변형으로 줄이기*/
  @media only screen and (min-width: 960px) {
    .webCard{
      width: 75%;
    }
    .right-button {
      width: 25%;
      margin-top : 30px;
      padding-right: 12px;
      padding-left: 12px;
    }
    .tool-btn{

    }
    .detail-wrapper{
      border-top: 1px solid #d1d1d1;
      background-color: #f8f8f8;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 24px;
      padding-bottom: 24px;
    }


  }

  .symbol{
    width: 24px;
    height: 24px;
    border-radius: 100px;
  }

  .token-item-wrapper{
    display: flex;
    align-items: center;
    padding: 26px 16px 26px 16px;
    cursor: pointer;
  }

  .token-item-wrapper:hover{
    background-color: #F8F8FA;
  }


  .cs-flex{
    display: flex;
    align-items: center;
  }
</style>
