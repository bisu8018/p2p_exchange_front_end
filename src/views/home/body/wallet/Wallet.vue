<template>
  <div>
    <!-- 상단 파란색 부분-->
    <div class="balance-wrapper" >
      <div  class="balance-width flex-padding-web">
        <div class="dropbtn select-wallet-wrapper" @click="showDropdown('walletType')">
          {{selectedWallet}}
          <i class="material-icons md-light md-12 ">keyboard_arrow_down</i>
            <div class="dropdown-content dropdown-wallet" v-if="isdropdown.walletType">
              <div class="select-wallet btn-blue-hover" @click.stop="clickWallet('OTC Wallet')" >OTC Wallet</div>
              <div class="select-wallet btn-blue-hover" @click.stop="clickWallet('Exchange Wallet')">Exchange Wallet</div>
            </div>
        </div>
        <h6 class="text-total">
          Total
        </h6>
        <v-layout mt-2 align-center justify-center fill-height @click="showDropdown('currencyType')">
          <h1>{{ toMoneyFormat($fixed(EstimatedCurrencyValue, selectedCurrency)) }}</h1>
          <h4 class="ml-2 p-relative dropbtn" >
              <span>{{ selectedCurrency}}</span>
              <i class="material-icons md-light md-12 ">keyboard_arrow_down</i>
              <div class="dropdown-content scroll-space" v-if="isdropdown.currencyType">
                <!-- 내 정보 list 버튼-->
                <div v-for="currency in currencyLists" class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer"
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
          <div class="toolTap-transfer" @click="showTransfer()">
            <div class="sprite-img2 ic-wallet-transfer toolTap-img"></div>
            <div class="mt-2">
              Transfer
            </div>
          </div>
        </v-layout>

      </div>
    </div>
    <!-- 상단 이하 부분-->
    <div class="balance-width flex-padding-mobile">
      <v-layout mt-4a row wrap fill-height align-center>
        <v-flex md6 xs10 order-md1 order-xs1 class="mb-24 cs-flex">
          <button @click="selectTokentype('Coin')" class="color-darkgray"
                  v-bind:class="{'tokentype-active' : selectedTokenType === 'Coin'}"
          >Coin</button>

          <div class="selectDivider"></div>
          <button @click="selectTokentype('CustomToken')" class="color-darkgray"
                  v-bind:class="{'tokentype-active' : selectedTokenType === 'CustomToken'}"
          >Custom Token</button>

          <div class="selectDivider"></div>
          <button @click="selectTokentype('Fiat')" class="color-darkgray"
                  v-bind:class="{'tokentype-active' : selectedTokenType === 'Fiat'}"
          >Fiat</button>
        </v-flex>
        <v-flex md2 xs12 order-md2 order-xs4>
          <div class=" vertical-center p-relative">
            <v-spacer></v-spacer>
            <input type="checkbox" v-model="isChecked" id="hideSmallCheckbox">
            <label for="hideSmallCheckbox"><span><i class="material-icons">done</i></span>
              <h5 class="d-inline-block">{{$str("Hide small balances")}}</h5>
            </label>
          </div>
        </v-flex>
        <v-flex md3 xs12 order-md3 order-xs3 class="mb-16">
          <div class="p-relative">
            <input type="text" v-model="searchToken" class="input" :placeholder="$str('search')">
            <i class="material-icons cs-search">search</i>
          </div>
        </v-flex>
        <v-flex md1 xs2 text-xs-right order-md4 order-xs2 class="mb-24">
          <span class="dropbtn p-relative" @click="showDropdown('menuType')">
            <i class="material-icons color-darkgray" >menu</i>
            <div class="dropdown-content dropdown-detail-menu" v-if="isdropdown.menuType">
              <div class="select-wallet btn-blue-hover" @click="goDetails()" >Details</div>
            </div>
          </span>
        </v-flex>
      </v-layout>
      <v-flex>
        <div class="cs-roundborder">
          <div  v-for="item in wallets" >
            <!--좌우 padding 맞춰주기 위해 사용.-->
              <wallet-token-list
                      :item = "item"
              ></wallet-token-list>
            <v-divider></v-divider>
          </div>
        </div>
      </v-flex>
    </div>
    <wallet-transfer-dialog/>
  </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import WalletTokenList from "./walletList/WalletTokenList"
    import WalletTransferDialog from "./dialog/WalletTransferDialog"
    import {abUtils} from "../../../../common/utils";
    import Common from "../../../../service/common/CommonService";

    export default {
        name: "Wallet",
        components: {
            WalletTokenList, WalletTransferDialog
        },
        data: () => ({
            isChecked : false,        //hide small에 을 check 한지 여부
            isdropdown : {
                walletType : false,
                currencyType: false,
                menuType: false,
            },
            amount : '',
            selectedCurrencyData : 'CNY',
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
                this.loadTotalEstimatedValue();
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
                MainRepository.Wallet.loadWallets(() => {});

            });

            this.walletInterval = setInterval(() => {
                MainRepository.MarketPrice.load(() => {
                    MainRepository.Wallet.loadWallets(() => {});
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
                        this.selectedTokenType = type
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
                    case 'menuType':
                        this.isdropdown.menuType = !this.isdropdown.menuType;
                        break;
                }
            },

            goDetails(){
                MainRepository.router().goWalletDetail();
            },
            showTransfer(){
                this.$eventBus.$emit('showTransferDialog','');
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
/*
    :hover.dropbtn .dropdown-content{
      display: block;
    }
*/
    .dropdown-wallet{
      border: solid 1px #b2b2b2;
    }
    .dropdown-detail-menu{
      border: solid 1px #b2b2b2;
      right: 0px;
      left: auto !important;
    }
  }

  /* mobile 에서*/
  @media only screen and (max-width: 959px) {

    .flex-padding-mobile{
      padding-left: 12px;
      padding-right: 12px;
    }
    .dropdown-content {
      position: absolute;
      color: black;
      min-width: 46px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
      z-index: 1;
      border-radius: 2px;
      text-align: center;
      background-color: white;
      left: -15px;
    }


    .select-wallet-wrapper{
      margin-left: 16px;
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

    .mb-24{
      margin-bottom: 24px;
    }

    .mb-16 {
      margin-bottom: 16px;
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

  .select-wallet-wrapper{
    padding-top: 16px;
    text-align: left;
    position: relative;
  }

  .select-wallet{
    padding: 8px;
    text-align: left;
  }

  .dropbtn {
    border: none;
    cursor: pointer;
  }

  .comp-select-currencybox-icon{
    position: absolute;
    right: -20px;
    top: 0px;

  }




  .selectDivider{
    border: solid 1px #d1d1d1;
    height: 56px;
    width: 2px;
    margin-left: 16px;
    margin-right: 16px;

  }



  .cs-roundborder{
    border-radius: 2px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    margin-top: 24px;
  }


  .cointype-select{
    color: #9294a6;
    text-align: left;
    align-items: center;
  }
  .selectDivider{
    display: inline-flex;
    border: solid 1px #d1d1d1;
    height: 27px;
    width: 1px;
  }
  .tokentype-active{
    color: #214ea1;
    font-weight: 700;
    border-bottom: 1px solid currentColor
  }
  .cs-search{
    color: #9294a6;
    position: absolute;
    right: 8px;
    top: 8px;
    cursor: pointer;
  }
  .cs-flex{
    display: flex;
  }
</style>

