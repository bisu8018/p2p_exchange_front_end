<template>
  <div >
    <!-- mobile에서 select box 선택을 위한 dim box-->
    <div v-if="(isdropdown.walletType || isdropdown.currencyType ) && isMobile"
         class="layout_dim" @click="showDropdown('closeAll')"></div>
    <!-- 상단 파란색 부분-->
    <div class="balance-wrapper" >
      <div  class="balance-width flex-padding-web">
        <div class="dropbtn select-wallet-wrapper" @click="showDropdown('walletType')" v-bind:class="{'increase-z-index' : isdropdown.walletType}">
          {{selectedWallet}}
          <i class="material-icons md-light md-12 ">keyboard_arrow_down</i>
            <div class="dropdown-content dropdown-wallet" v-if="isdropdown.walletType">
              <div class=" btn-blue-hover" @click.stop="clickWallet('OTC Wallet')" >OTC Wallet</div>
              <div class=" btn-blue-hover" @click.stop="clickWallet('Exchange Wallet')">Exchange Wallet</div>
            </div>
        </div>
        <h6 class="text-total">
          Total
        </h6>
        <v-layout mt-2 align-center justify-center fill-height @click="showDropdown('currencyType')">
          <h1>{{ toMoneyFormat($fixed(EstimatedCurrencyValue, selectedCurrency)) }}</h1>
          <h4 class="ml-2 p-relative dropbtn" >
              <span v-bind:class="{'increase-z-index' : isdropdown.currencyType}">
                {{ selectedCurrency}}
              </span>
              <i class="material-icons md-light md-12 ">keyboard_arrow_down</i>
              <div class="dropdown-content scroll-space" v-if="isdropdown.currencyType">
                <!-- 내 정보 list 버튼-->
                <div v-for="currency in currencyLists" class=" btn-blue-hover"
                     @click.stop="clickedCurrency(currency.name)">
                  {{currency.name}}
                </div>
              </div>
          </h4>
        </v-layout>
        <v-layout class="toolTap-wrapper">
          <div v-if="isMobile" class="toolTap-wrapper-mobile">
            <div class="toolTap-scan" @click="onScan()">
              <div class="sprite-img2 ic-wallet-scanning toolTap-img"></div>
              <h5 class="mt-2">Scan</h5>
            </div>
            <div class="toolTap-payment" @click="onPayment()">
              <div class="sprite-img2 ic-barcode toolTap-img"></div>
              <h5 class="mt-2">Payment</h5>
            </div>
          </div>
          <div class="toolTap-transfer" @click="onTransfer()">
            <div class="sprite-img2 ic-wallet-transfer toolTap-img"></div>
            <div class="mt-2">
              Transfer
            </div>
          </div>
        </v-layout>
      </div>
    </div>
    <!-- 상단 이하 부분-->
    <!-- 중첩된 router-->
    <div class="balance-width flex-padding-mobile" >
      <router-view></router-view>
    </div>
    <wallet-transfer-dialog/>
  </div>
</template>

<script>
    import WalletToken from "./token/WalletToken"
    import MainRepository from "../../../../vuex/MainRepository";
    import WalletTokenList from "./token/item/WalletTokenList"
    import WalletTransferDialog from "./dialog/WalletTransferDialog"
    import {abUtils} from "../../../../common/utils";
    import Common from "../../../../service/common/CommonService";

    export default {
        name: "Wallet",
        components: {
            WalletTokenList, WalletTransferDialog, WalletToken
        },
        data: () => ({
            isChecked : false,        //hide small에 을 check 한지 여부
            isdropdown : {
                walletType : false,
                currencyType: false,
            },
            showDetail: false,
            amount : '',
            //selectedCurrencyData : 'CNY',
            selectedWallet : 'OTC Wallet',
            selectedTokenType : 'Coin',
            searchToken : '',
            currencyLists : [
                {name : 'CNY'},
                {name : 'USD'},
                {name : 'SGD'},
                {name : 'INR'},
                {name : 'CAD'},
                {name : 'KRW'},
                {name : 'CHF'},
                {name : 'TWD'},
                {name : 'RUB'},
                {name : 'GBP'},
                {name : 'HKD'},
                {name : 'EUR'},
                {name : 'NGN'},
                {name : 'IDR'},
                {name : 'PHP'},
                {name : 'KHR'},
            ],
            EstimatedCryptocurrencyValue : '',
            EstimatedCurrencyValue : '',
            walletInterval: {},

        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            selectedCurrency: {
                get() {
                    return MainRepository.Wallet.getCurrency();
                },
                set(value) {
                    MainRepository.Wallet.setCurrency(value)
                    //this.selectedCurrencyData = value;
                    this.loadTotalEstimatedValue();
                }
            },
            wallets() {
                return MainRepository.Wallet.getWallets();
            },

        },
        created() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }

            // 최초 1회
            MainRepository.MarketPrice.load(() => {
                MainRepository.Wallet.loadWallets(() => {       //wallet 정보 load
                    this.loadTotalEstimatedValue();           //wallet load후 내 총 잔고 계산
                });

            });
            this.walletInterval = setInterval(() => {
                MainRepository.MarketPrice.load(() => {
                    MainRepository.Wallet.loadWallets(() => {
                        this.loadTotalEstimatedValue();
                    });
                    MainRepository.Wallet.loadHistory(() => {});       //History도 5초에 1번씩 불러오게 추가.
                });
            }, 5000);


        },
        mounted() {

        },
        beforeDestroy(){
          clearInterval(this.walletInterval);
        },
        methods: {
            loadTotalEstimatedValue() {
                let totalValue = MainRepository.Wallet.controller().getTotalEstimatedValue(this.selectedCurrency);
                this.EstimatedCryptocurrencyValue = totalValue.btc;
                if (totalValue.currency === 0) {
                    this.EstimatedCurrencyValue = '';
                } else {
                    this.EstimatedCurrencyValue = totalValue.currency;
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
            onScan(){
                this.$eventBus.$emit('showAlert', 9000);
            },
            onPayment(){
                this.$eventBus.$emit('showAlert', 9000);
            },
            onTransfer(){
                MainRepository.Wallet.updateTransfer({
                    cryptocurrencyType : this.selectedTokenType,
                    cryptocurrency : '',
                })
                this.$eventBus.$emit('showTransferDialog');
            },
            selectTokentype(type){
                switch (type) {
                    case 'Coin':
                        this.selectedTokenType = type;
                        break;

                    case 'CustomToken':
                        this.selectedTokenType = type
                        break;

                    case 'Fiat':
                        this.$eventBus.$emit('showAlert', 9000);
                        //this.selectedTokenType = type
                        break;
                }
                MainRepository.Wallet.updateTransfer({
                    cryptocurrencyType : this.selectedTokenType
                })
                //여기서 axios call 하는 service 추가 필요.
            },


            clickedCurrency(item){
                MainRepository.Wallet.setCurrency(item);
                this.showDropdown('currencyType');

            },
            clickWallet(item){
                this.selectedWallet = item;
                //Exchange wallet 백단 작업완료시 page의 모든 값 reset하는 작업 필요
                MainRepository.Wallet.updateTransfer({
                    From : item
                })
                this.showDropdown('walletType');
            },
            showDropdown(item){
                switch (item) {
                    case 'walletType':
                        this.isdropdown.walletType = !this.isdropdown.walletType;
                        break;
                    case 'currencyType':
                        this.isdropdown.currencyType = !this.isdropdown.currencyType;
                        break;
                    case 'closeAll':
                        this.isdropdown.walletType = false;
                        this.isdropdown.currencyType = false;
                }
            },

            goDetails(){
                MainRepository.router().goWalletDetail();
            },

        }


    }
</script>

<style scoped>
  /* 웹에서*/
  @media only screen and (min-width: 960px) {
    .flex-padding-web{
      padding-left: 12px;
      padding-right: 12px;
    }
    .scroll-space {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      position: relative;
      max-height: 336px;
    }
    .toolTap-wrapper{
      margin-top: 32px;
    }
    .toolTap-transfer{
      text-align: right;
      cursor: pointer;
      margin-left: auto;
      margin-bottom: 32px;
    }

    .toolTap-img{
      margin: auto;
    }

    .select-wallet-wrapper{
      padding-top: 16px;
      text-align: left;
      position: relative;
    }

    .dropdown-content {

      position: absolute;
      color: black;
      min-width: 46px;
      max-height: 204px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
      z-index: 1;
      border-radius: 2px;
      text-align: center;
      background-color: white;
      left: -15px;
    }
    .dropdown-content > div{
      cursor: pointer;
      padding-right: 16px;
      padding-left: 8px;
      padding-top: 8px;
      padding-bottom: 8px;
      font-size: 12px;
      text-align: center;
    }

    .dropdown-wallet{
      border: solid 1px #b2b2b2;
    }
  }

  /* mobile 에서*/
  @media only screen and (max-width: 959px) {

    .flex-padding-mobile{
      padding-left: 12px;
      padding-right: 12px;
    }
    .dropdown-content {
      position: fixed;
      color: black;
      min-width: 46px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
      z-index: 1;
      border-radius: 2px;
      text-align: center;
      background-color: white;
      bottom: 65px;
      right:0;
      left: 0;
    }
    .dropdown-content > div{
      height: 50px;
      padding-top: 16px;
      padding-bottom: 16px;
    }

    .scroll-space {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      max-height: 300px;
    }
    /*z-index 올려*/
    .increase-z-index{
      z-index: 2;
      position: relative;
      color: #ffffff;
    }
    .layout_dim {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.45);
      opacity: 0.5;
      z-index: 1;
    }

    .select-wallet-wrapper{
      padding-top: 16px;
      margin-left: 16px;
      text-align: left;
      bottom: 0;

    }

    .toolTap-wrapper{
      background-color: #214ea1;
      margin-top: 68px;
      padding-top: 16px;
      padding-bottom: 16px;
    }

    .toolTap-wrapper-mobile{
      width: 65%;
      display: flex;
    }

    .toolTap-scan{
      width: 53%;
      text-align: center;
      cursor: pointer;
    }

    .toolTap-payment{
      width: 47%;
      text-align: center;
      cursor: pointer;
    }

    .toolTap-transfer{
      width: 35%;
      text-align: center;
      cursor: pointer;
    }
    .toolTap-img{
      margin: auto;
    }

  }


  .balance-wrapper{
    background-color: #316ee4;
    color : #ffffff;
  }
  .balance-width{
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .text-total{
    margin-top : 32px;
    opacity: 0.5;
    text-align: center;
    line-height: 1.17;
  }



  .dropbtn {
    border: none;
    cursor: pointer;
  }












</style>

