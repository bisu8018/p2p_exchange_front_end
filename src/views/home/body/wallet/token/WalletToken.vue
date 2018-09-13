<template>
  <div class=" " >
    <div v-if="(isdropdown.menuType) && isMobile"
         class="layout_dim" @click="showDropdown('closeAll')"></div>
    <!--Token toolBar-->
    <v-layout mt-4a row wrap fill-height align-center>
      <v-flex md6 xs10 order-md1 order-xs1 class="mb-24 cs-flex">
        <button @click="selectTokentype('Coin')" class="color-darkgray"
                v-bind:class="{'tokentype-active' : selectedTokenType === 'Coin'}"
        >{{$str("Coin")}}</button>

        <div class="selectDivider"></div>
        <button @click="selectTokentype('CustomToken')" class="color-darkgray"
                v-bind:class="{'tokentype-active' : selectedTokenType === 'CustomToken'}"
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
            <i class="material-icons color-darkgray" v-bind:class="{'increase-z-index' : isdropdown.menuType}">menu</i>
            <div class="dropdown-content dropdown-detail-menu" v-if="isdropdown.menuType">
              <div class=" btn-blue-hover" @click="goDetails()" >{{$str("Details")}}</div>
            </div>
          </span>
      </v-flex>
    </v-layout>
    <!--Tokenitems-->
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
  </div >
</template>

<script>
    import WalletTokenList from "./item/WalletTokenList"
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "WalletToken",
        components: {
            WalletTokenList,
        },
        data: () => ({
            selectedTokenType : 'Coin',
            isChecked : false,        //hide small에 을 check 한지 여부
            searchToken : '',
            isdropdown : {
                menuType: false
            }
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
                }
            },
            wallets() {
                return MainRepository.Wallet.getWallets();
            },

        },
        created() {

        },
        methods: {
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
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
            goDetails(){
                MainRepository.router().goWalletDetail();
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
  }

  /* mobile 에서*/
  @media only screen and (max-width: 959px) {
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

    .mb-24{
      margin-bottom: 24px;
    }

    .mb-16 {
      margin-bottom: 16px;
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