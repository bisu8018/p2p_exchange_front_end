<template>
  <div class=" " >
    <div v-if="(isdropdown.menuType) && isMobile"
         class="layout_dim" @click="showDropdown('closeAll')"></div>
    <!--Token toolBar-->
    <v-layout mt-4a row wrap fill-height align-center>
      <v-flex md6 xs10 order-md1 order-xs1 class="mb-24 cs-flex">
        <button @click="selectTokentype('Coin')" class="color-darkgray"
                v-bind:class="{'tokentype-active' : selectedTokenType === 'General Coin'}"
        >{{$str("Coin")}}</button>

        <div class="selectDivider"></div>
        <button @click="selectTokentype('CustomToken')" class="color-darkgray"
                v-bind:class="{'tokentype-active' : selectedTokenType === 'Custom Token'}"
        >{{$str("Custom Token")}}</button>

        <div class="selectDivider"></div>
        <button @click="selectTokentype('Fiat')" class="color-darkgray"
                v-bind:class="{'tokentype-active' : selectedTokenType === 'Fiat'}"
        >{{$str("Fiat")}}</button>
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
            <i class="material-icons color-darkgray">menu</i>
            <div class="dropdown-content dropdown-detail-menu" v-if="isdropdown.menuType">
              <div class=" btn-blue-hover" @click="goDetails()" >{{$str("Details")}}</div>
            </div>
          </span>
      </v-flex>
    </v-layout>
    <!--Tokenitems-->
    <v-flex v-if="haveItems">
      <div class="cs-roundborder">
        <div  v-for="item in walletListData" >
          <!--좌우 padding 맞춰주기 위해 사용.-->
          <wallet-token-item
                  :item = "item"
          ></wallet-token-item>
          <v-divider></v-divider>
        </div>
      </div>
    </v-flex>
    <v-flex v-else>
      <div class="sprite-img ic-no-ad-lg no-more-ads">
      </div>
      <div class="color-gray no-more-ads-text">
        {{$str("No more item")}}
      </div>
    </v-flex>
    <!--wallet을 불러오기위한 dummy 태그-->
    <div v-if="wallets"></div>
  </div >
</template>

<script>
    import WalletTokenItem from "./item/WalletTokenitem"
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "WalletToken",
        components: {
            WalletTokenItem,
        },
        data: () => ({
            selectedTokenType : 'General Coin',
            isChecked : false,        //hide small에 을 check 한지 여부
            searchToken : '',
            isdropdown : {
                menuType: false
            },
            walletListData: []
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            haveItems(){
                return (this.walletListData.length !== 0)
            },
            selectedCurrency: {
                get() {
                    return MainRepository.Wallet.getStatus().currency;
                },
                set(value) {
                    MainRepository.Wallet.updateStatus({currency : value})
                    //this.selectedCurrencyData = value;
                }
            },
            wallets() {
                //search input에 해당하는 token만 보여주는 상태.
                this.walletListData = MainRepository.Wallet.controller().findWalletsByName(this.searchToken, this.selectedTokenType);
                if(this.isChecked){
                    this.walletListData = this.showHaveBalance(this.walletListData);
                }
            },

        },
        created() {
            MainRepository.Wallet.initStatus()
        },
        methods: {
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
            showHaveBalance(walletData){
                return MainRepository.Wallet.controller().getHaveBalance(walletData);
            },
            showDropdown(item){
                switch (item) {
                    case 'menuType':
                        this.isdropdown.menuType = !this.isdropdown.menuType;
                        break;
                    case 'closeAll':
                        this.isdropdown.menuType = false;
                }
            },
            selectTokentype(type){
                switch (type) {
                    case 'Coin':
                        this.selectedTokenType = 'General Coin';
                        break;

                    case 'CustomToken':
                        this.selectedTokenType = 'Custom Token'
                        break;

                    case 'Fiat':
                        this.$eventBus.$emit('showAlert', 9000);
                        //this.selectedTokenType = type
                        break;
                }
                this.searchToken
                MainRepository.Wallet.updateStatus({
                    cryptocurrencyType : this.selectedTokenType
                })

            },
            goDetails(){
                MainRepository.router().goWalletDetail('');
            },
        }
    }
</script>

<style scoped>

  /* 웹에서*/
  @media only screen and (min-width: 960px) {
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
    .dropdown-detail-menu{
      border: solid 1px #b2b2b2;
      right: 0px;
      left: auto !important;
      min-width: 80px;
    }
    .no-more-ads{
      margin: 120px auto 16px auto;
    }
    .no-more-ads-text{
      margin-bottom: 56px;
    }
  }

  /* mobile 에서*/
  @media only screen and (max-width: 959px) {
    .dropdown-content {
      position: fixed;
      color: black;
      min-width: 46px;
      min-height: 65px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
      z-index: 101;
      border-radius: 2px;
      text-align: center;
      background-color: white;
      bottom: 0px;
      right:0;
      left: 0;
    }
    .dropdown-content > div{
      /*height: 50px;*/
      padding-top: 22px;
      padding-bottom: 22px;
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

    .mb-24{
      margin-bottom: 24px;
    }

    .mb-16 {
      margin-bottom: 16px;
    }

    .no-more-ads{
      margin: 48px auto 16px auto;
    }

  }

  .cs-flex{
    display: flex;
  }

  .selectDivider{
    display: inline-flex;
    border: solid 1px #d1d1d1;
    height: 27px;
    width: 1px;
    margin-left: 16px;
    margin-right: 16px;
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
  .dropbtn {
    border: none;
    cursor: pointer;
  }

  .cs-roundborder{
    border-radius: 2px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    margin-top: 24px;
  }
</style>