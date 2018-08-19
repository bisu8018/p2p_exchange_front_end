<template>
    <div class="tokenlistWraaper">
      <v-layout row wrap >
        <!--로고-->
        <v-flex md1 xs11 text-xs-left text-md-center >
          <!--logo img-->
          <div class="pb-2 d-inline-block">
            <div class=" sprite-img " :class="tokenImg"></div>
          </div>
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
              <span>{{getBalance}} {{tokenlist.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{tokenlist.OtcFrozen}} {{tokenlist.name}}</span>
            </v-layout>
          </div>
        </v-flex>
        <!--2. Exchange Account 날라감-->
        <v-flex md5 xs12  text-xs-left >
          <!--div class="webCard">
            <h4 class="mb-3 medium">{{$str("Exchange_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{tokenlist.ExAvailable}} {{tokenlist.name}}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{tokenlist.ExFrozen}} {{tokenlist.name}}</span>
            </v-layout>
          </div-->
        </v-flex>
        <!--마지막 버튼-->
        <v-flex md3 xs12 >
          <v-layout row wrap justify-space-between>
            <!--Transfer 버튼-->
            <div class="right-button">
              <button class="btn-blue btn-blue-hover bold c-pointer" @click="showDepositModal = true">{{$str("Deposit")}}</button>
            </div>
            <!--mobile에서 버튼사이 공간을 주기위한 spacer-->
            <!-- Deposit 버튼-->
            <div class="right-button">
              <button class="btn-white  bold c-pointer" @click="showWithdrawModal = true">{{$str("withdraw")}}</button>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--Deposit modal-->
      <v-dialog v-model="showDepositModal">
        <v-layout row wrap>
          <!--header-->
          <div class-="text-xs-left">
            <h3 class="bold">{{$str("Deposit")}} {{tokenlist.name}}</h3>
          </div>
          <v-spacer></v-spacer>
          <div class="text-xs-right">
            <i class="material-icons color-black c-pointer" @click="showDepositModal = false">close</i>
          </div>
          <v-flex xs12 color-darkgray text-xs-center mt-3 mb-4>
            {{tokenlist.name}} {{$str("Deposit_Address")}}
          </v-flex>
          <v-flex xs12>
            {{copyCode}}
          </v-flex>
          <v-flex xs12 mt-3 mb-4>
            <h5 class="color-blue" @click.stop.prevent="onCopy()">
              {{$str("Copy")}}
            </h5>
            <input type="hidden" :value="copyCode" id="copy-code" >
          </v-flex>
          <v-flex xs12 mt-2 mb-4>
            <div class="sprite-img ic-qr"></div>
          </v-flex>
          <v-flex xs12 mt-2 mb-4 color-darkgray>
            {{$str("Or_scan_this_QR_code")}}
          </v-flex>
          <div class="horizontalDivider">
          </div>
          <div class="mt-2 mb-4 text-xs-left color-darkgray">
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
          </div>
        </v-layout>
      </v-dialog>
      <!--withdraw modal-->
      <v-dialog v-model="showWithdrawModal">
        <div>
          <div class="cs-flex mb-3">
            <!--header-->
            <div class=" h4 bold text-xs-left">
              {{tokenlist.name}} {{$str("withdraw")}}
            </div>
            <v-spacer></v-spacer>
            <i class="material-icons color-black c-pointer" @click="showWithdrawModal = false">close</i>
          </div>
          <div class="color-darkgray text-xs-left mt-3 mb-4">
            {{$str("Withdraw to another wallet")}}
          </div>
          <!-- 1. Address select 창-->
          <div class="text-xs-left">
            {{$str("Address")}}
          </div>
          <div class="mt-2 mb-4">
            <div class="p-relative">
              <input name="address" v-model="address" type="text" class="input"
                     autocomplete="off" >
            </div>
          </div>
          <!-- 2. Amount select 창-->
          <div class="cs-flex">
            <div class="text-xs-left">{{$str("amount")}}</div>
            <v-spacer></v-spacer>
            <div class="text-xs-right color-darkgray">
              <h6>({{$str("Available")}}: 0.0000 {{$str("limit")}} : 0.100000</h6>
            </div>
          </div>
          <div class="mt-2 mb-4">
            <div class="p-relative">
              <input name="amount" v-model="amount" type="text" class="input"
                     autocomplete="off" >
              <button class="crypto-text">{{tokenlist.name}}</button>
            </div>
          </div>
          <!-- 3. Fee 창-->
          <div class="cs-flex">
            <div class="text-xs-left">{{$str("fee")}}</div>
            <v-spacer></v-spacer>
            <div class="text-xs-right color-darkgray" >
              <h6>({{$str("Range")}}: 0.0000 - 0.001000)</h6>
            </div>
          </div>

          <div class="mt-2 mb-4">
            <div class="p-relative">
              <input name="fee" v-model="fee" type="text" class="input"
                     autocomplete="off" disabled>
              <button class="crypto-text">{{tokenlist.name}}</button>
            </div>
          </div>
          <div class="cs-flex">
            <div class="text-xs-left">{{$str("Receive Amount")}}</div>
          </div>
          <!-- 4. Receive Amount창-->
          <div class="mt-2 mb-4">
            <div class="p-relative">
              <input name="receiveAmount" v-model="receiveAmount" type="text" class="input color-darkgray"
                     autocomplete="off" disabled>
              <button class="crypto-text">{{tokenlist.name}}</button>
            </div>
          </div>
          <div class="text-xs-right">
            <button class="btn-rounded-white text-white-hover" @click="showWithdrawModal = false" >
              <h6>{{$str("cancel")}}</h6>
            </button>
            <button class="btn-rounded-blue btn-blue-hover" >
              <h6>{{$str("withdraw")}}</h6>
            </button>
          </div>
          <div class="mt-4 mb-4">
            <v-divider></v-divider>
          </div>
          <h6 class="color-darkgray text-xs-left mb-3">
            {{$str("tips")}}
          </h6>
          <h6 class="color-darkgray text-xs-left mb-3">
            {{$str("Minimum withdrawal amount")}}: {{minAmount}} {{tokenlist.name}}
          </h6>
          <h6 v-if="tokenlist.name === 'ETH'" class="color-darkgray text-xs-left mb-3">
            {{$str("withdrawtipsETH1")}}<br>
            {{$str("withdrawtipsETH2")}}<br>
            {{$str("withdrawtipsETH3")}}
          </h6>
          <h6 class="color-darkgray text-xs-left mb-3">
            {{$str("withdrawTips1")}}
          </h6>
          <h6 class="color-darkgray text-xs-left mb-3">
            {{$str("withdrawTips2")}}
          </h6>
        </div>
      </v-dialog>

    </div>
</template>

<script>
    import MainRepository from '../../../../../vuex/MainRepository';
    export default {
        name: "BalanceTokenList",
        props : {
            tokenlist : {},
        },
        data: () => ({
            istoken :[
                {isBTC : false},
                {isETH : false},
                {isALLB : false},
            ],
            showWithdrawModal : false,
            showDepositModal : false,
            tokenImg : '',
            copyCode : '123456789abcdef',
            fee : 0,
            address : '',
            amount : '',
            minAmount : '',
        }),
        computed:{
            receiveAmount(){
                if(this.amount < this.fee){
                    return 0;
                }
                return this.amount - this.fee;
            },
            getBalance() {
                if ((this.tokenlist.name === 'ETH'&& MainRepository.Balance.getBalance()) ||
                    (this.tokenlist.name === 'BTC' && MainRepository.Balance.getBalance()) ||
                    (this.tokenlist.name === 'ALLB' && MainRepository.Balance.getBalance())) {
                    this.tokenlist.otc = MainRepository.Balance.getBalance()[this.tokenlist.name].availableAmount;
                    return MainRepository.Balance.getBalance()[this.tokenlist.name].availableAmount;
                } else {
                    this.balance = 0;
                    return 0;
                }
            }
        },
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
        created(){
            console.log(MainRepository.Balance.getBalance());
            switch (this.tokenlist.name) {
                case 'BTC':
                    this.fee = 0.001
                    this.minAmount = 0.01
                    break;

                case 'ETH':
                    this.fee = 0.05
                    this.minAmount = 0.05
                    break;

                case 'ALLB':
                    this.fee = 0
                    this.minAmount = 0
                    break;
            }
        },
        mounted(){
            switch (this.tokenlist.name) {
                case 'BTC':
                    this.tokenImg = 'ic-btc-lg';
                    break;
                case 'ETH':
                    this.tokenImg = 'ic-eth-lg';
                    break;
                case 'ALLB':
                    this.tokenImg = 'ic-allb-lg';
                    break;
            }
        },
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
  /* signUp의 click-send-text와 동일*/
  .crypto-text {
    font-size: 12px;
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
  .cs-flex{
    display: flex;
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