<template>
    <div class="tokenlistWraaper">
      <v-layout row wrap >
        <!--로고-->
        <v-flex md1 xs11 text-xs-left text-md-center >
          <div class="pb-2 "><img :src="logoimg"></div>
          <div class=" mb-4">
            <h4 class="bold">{{tokenlist.name}}</h4>
          </div>
        </v-flex>
        <!--1. OTC Account 카드-->
        <v-flex md3 xs12  text-xs-left>
          <div class="webCard">
            <h4 class="mb-3 medium">{{$str("OTC_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{tokenlist.OtcAvailable}} {{tokenlist.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{tokenlist.OtcAvailable}} {{tokenlist.name}}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--2. Exchange Account-->
        <v-flex md3 xs12  text-xs-left >
          <div class="webCard">
            <h4 class="mb-3 medium">{{$str("Exchange_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{tokenlist.ExAvailable}} {{tokenlist.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="color-darkgray">Frozen: </span>
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
               <button class="btn-white text-white-hover bold mb-3" @click="showTransferModal = true">{{$str("Transfer")}}</button>
            </v-flex>
            <!--mobile에서 버튼사이 공간을 주기위한 spacer-->
            <v-spacer></v-spacer>
            <!-- Deposit 버튼-->
            <v-flex xs5 md7 offset-md5 pl-0>
              <button class="btn-blue btn-blue-hover bold" @click="showDepositModal = true">{{$str("Deposit")}}</button>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--Transfer modal-->
      <v-dialog v-model="showTransferModal">
        <v-layout row wrap>
          <!--header-->
          <v-flex xs6 text-xs-left >
            <h3>{{$str("Transfer")}}</h3>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <button><i class="material-icons " @click="showTransferModal = false">close</i></button>
          </v-flex>
          <v-flex xs12 color-darkgray text-xs-left mt-3 mb-4>
            {{$str("Transfer_to_Exchange_account_to_withdraw")}}
          </v-flex>
          <v-flex xs12 text-xs-left>
            Coin
          </v-flex>
          <!-- 1. Coin select 창-->
          <v-flex xs12  mt-2 mb-4 >
            <div class="p-relative">
              <select v-model="selectedToken" class="comp-selectbox">
                <option v-for="token in tokens" v-bind:value="token.name" >
                  <h6>{{token.name}}</h6>
                </option>
              </select>
              <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
            </div>
          </v-flex>
          <v-flex xs4 text-xs-left>From</v-flex>
          <v-flex xs8 text-xs-right color-darkgray>
            <h6>(OTC balance: 0.0000{{tokenlist.name}})</h6>
          </v-flex>
          <!-- 2. From select 창-->
          <v-flex xs12 mt-2 mb-4>
            <div class="p-relative">
              <select v-model="selectedFrom"  class="comp-selectbox">
                <option v-for="from in froms" v-bind:value="from.name" >{{from.name}}</option>
              </select>
              <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
            </div>
          </v-flex>
          <v-flex xs4 text-xs-left>to</v-flex>
          <v-flex xs8 text-xs-right color-darkgray >
            <h6>(Exchange balance: 0.0000{{tokenlist.name}})</h6>
          </v-flex>
          <!-- 3. To select 창-->
          <v-flex xs12 mt-2 mb-4>
            <div class="p-relative">
              <select v-model="selectedTo"  class="comp-selectbox">
                <option v-for="to in tos" v-bind:value="to.name" >{{to.name}}</option>
              </select>
              <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
            </div>
          </v-flex>
          <v-flex xs4 text-xs-left>Volume</v-flex>
          <v-flex xs8 text-xs-right color-darkgray>
            <h6>(Exchange balance: 0.0000{{tokenlist.name}})</h6>
          </v-flex>
          <!-- 4. Volume select 창-->
          <v-flex xs12 mt-2 mb-4>
            <div class="p-relative">
              <input name="VolumeAccount" v-model="volume" type="text" class="input"
                     placeholder="Exchange Account" autocomplete="off" >
              <button class="click-All-text" @click="">{{$str("All")}}</button>
            </div>
          </v-flex>
          <v-flex xs12 text-xs-right>
            <button class="btn-rounded-white text-white-hover" @click="showTransferModal = false" >
              <h6>{{$str("cancel")}}</h6>
            </button>
            <button class="btn-rounded-blue btn-blue-hover" >
              <h6>{{$str("TransferNow")}}</h6>
            </button>
          </v-flex>
        </v-layout>
      </v-dialog>
      <!--Deposit modal-->
      <v-dialog v-model="showDepositModal">
        <v-layout row wrap>
          <!--header-->
          <v-flex xs6 text-xs-left>
            <h3>{{$str("Deposit")}} {{tokenlist.name}}</h3>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <button><i class="material-icons " @click="showDepositModal = false">close</i></button>
          </v-flex>
          <v-flex xs12 color-darkgray text-xs-center mt-3 mb-4>
            {{tokenlist.name}} {{$str("Deposit_Address")}}
          </v-flex>
          <v-flex xs12>
            {{copyCode}}
          </v-flex>
          <v-flex xs12  mt-3 mb-4>
            <button>
              <h5 class="color-blue" @click.stop.prevent="onCopy()">
                Copy
              </h5>
            </button>
            <input type="hidden" :value="copyCode" id="copy-code" >
          </v-flex>
          <v-flex xs12 mt-2 mb-4>
            <img src="../../../../../assets/img/qr_code.png">
          </v-flex>
          <v-flex xs12 mt-2 mb-4 color-darkgray>
            {{$str("Or_scan_this_QR_code")}}
          </v-flex>
          <div class="horizontalDivider">
          </div>
          <v-flex xs12 mt-2 mb-4 text-xs-left color-darkgray >
            <div class="mb-3">
              <h6>
                {{$str("BalanceDepositExplain1-1")}}
                {{tokenlist.name}}
                {{$str("BalanceDepositExplain1-2")}}
              </h6>
            </div>
            <div class="mb-3">
              <h6>
                {{$str("BalanceDepositExplain2")}}
              </h6>
            </div>
            <div class="mb-3">
              <h6>
                {{$str("BalanceDepositExplain3-1")}}
                0.001 {{tokenlist.name}}.
                {{$str("BalanceDepositExplain3-2")}}
                0.001 {{tokenlist.name}}.
              </h6>
            </div>
            <div class="mb-3">
              <h6>
              {{$str("BalanceDepositExplain4")}}
              </h6>
            </div>
            <div>
              <h6>
              {{$str("BalanceDepositExplain5")}}
              </h6>
            </div>
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
        data: () => ({
            logoimg : '',
            showTransferModal : false,
            showDepositModal : false,
            selectedToken: 'BTC',
            selectedFrom: 'OTC Account',
            selectedTo: 'Exchange Account',
            volume: '',
            tokens : [
                {name : 'BTC'},
                {name : 'ETH'},
                {name : 'USDT'},
                {name : 'ALLB'},
            ],
            froms : [
                {name : 'OTC Account'},
                {name : 'Exchange Account'},
            ],
            tos : [
                {name : 'OTC Account'},
                {name : 'Exchange Account'},
            ],
            copyCode : '123456789abcdef',

        }),
        methods : {
            onCopy() {
                let testingCodeToCopy = document.querySelector('#copy-code')

                testingCodeToCopy.setAttribute('type', 'text')
                testingCodeToCopy.select()
                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    alert('Testing code was copied ' + msg);
                } catch (err) {
                    alert('Oops, unable to copy');
                }

                /* unselect the range */
                testingCodeToCopy.setAttribute('type', 'hidden')
                window.getSelection().removeAllRanges()

                // let copyTemp = (document.querySelector('#userURL'));
                // let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);
                //
                // if (!isiOSDevice) {
                //     copyTemp.setAttribute('type', 'text');
                //     copyTemp.select();
                // }
                // document.execCommand('copy');
            },


        },
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
  /* signUp의 click-send-text와 동일*/
  .click-All-text {
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #214ea1;
    position: absolute;
    right: 11px;
    top: 10px;
    cursor: pointer;
  }
  .horizontalDivider{
    width: 352px;
    height: 1px;
    background-color: #d1d1d1;
    margin-bottom: 24px;
  }
  .getOut {
    position: absolute;
    left: -1000px;
  }
</style>