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
            <h4 class="bold">{{ getCryptoName(item.cryptoCurrency) }}</h4>
          </div>
        </v-flex>
        <!--1. OTC Account 카드-->
        <v-flex md4 xs12  text-xs-left>
          <div class="webCard">
            <h4 class="mb-3 medium">{{$str("OTC_Account")}}</h4>
            <v-layout justify-space-between mb-2>
              <span class="color-darkgray">{{$str("Available")}}: </span>
              <span>{{ $fixed(item.availableAmount, item.cryptoCurrency)}} {{getCryptoName(item.cryptoCurrency)  }}</span>
            </v-layout>
            <v-layout justify-space-between mb-4>
              <span class="color-darkgray">{{$str("Frozen")}}: </span>
              <span>{{ $fixed(item.frozenAmount, item.cryptoCurrency)}} {{getCryptoName(item.cryptoCurrency) }}</span>
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
            <h3 class="bold">{{$str("Deposit")}} {{getCryptoName(item.cryptoCurrency) }}</h3>
          </div>
          <v-spacer></v-spacer>
          <div class="text-xs-right">
            <i class="material-icons color-black c-pointer" @click="showDepositModal = false">close</i>
          </div>
          <v-flex xs12 color-darkgray text-xs-center mt-3 mb-4>
            {{getCryptoName(item.cryptoCurrency) }} {{$str("Deposit_Address")}}
          </v-flex>
          <v-flex xs12>
            <input type="text" id="copy-code" :value="item.walletAddress" class="wallet-address" disabled  >
          </v-flex>
          <v-flex xs12 mt-3>
            <h5 class="color-blue c-pointer" @click="onCopy()">
              {{$str("Copy")}}
            </h5>
          </v-flex>
          <v-flex xs12>
            <img :src="qrCodeImgUrl"/>
          </v-flex>
          <v-flex xs12 mb-4 color-darkgray>
            {{$str("Or_scan_this_QR_code")}}
          </v-flex>
          <div class="horizontalDivider">
          </div>
          <div class="mt-2 mb-4 text-xs-left color-darkgray">
            <div class="mb-3">
              <h6>
                {{$str("BalanceDepositExplain1-1")}}
                {{getCryptoName(item.cryptoCurrency) }}
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
                0.001 {{getCryptoName(item.cryptoCurrency) }}.
                {{$str("BalanceDepositExplain3-2")}}
                0.001 {{getCryptoName(item.cryptoCurrency) }}.
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
              {{getCryptoName(item.cryptoCurrency) }} {{$str("withdraw")}}
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
              <button class="crypto-text">{{getCryptoName(item.cryptoCurrency) }}</button>
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
              <button class="crypto-text">{{getCryptoName(item.cryptoCurrency) }}</button>
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
              <button class="crypto-text">{{getCryptoName(item.cryptoCurrency) }}</button>
            </div>
          </div>
          <div class="text-xs-right">
            <button class="btn-rounded-white text-white-hover" @click="showWithdrawModal = false" >
              <h6>{{$str("cancel")}}</h6>
            </button>
            <button class="btn-rounded-blue btn-blue-hover" @click="goSMSVerification">
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
            {{$str("Minimum withdrawal amount")}}: {{minAmount}} {{getCryptoName(item.cryptoCurrency) }}
          </h6>
          <h6 v-if="getCryptoName(item.cryptoCurrency)  === 'ETH'" class="color-darkgray text-xs-left mb-3">
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
    import Balance from '../../../../../vuex/model/Balance'

    export default {
        name: "BalanceTokenList",
        props : {
            item : { type: Balance },
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
            fee : 0,
            address : '',
            amount : '',
            minAmount : '',
            qrCodeImgUrl: '',
        }),
        computed:{
            receiveAmount(){
                if(this.amount < this.fee){
                    return 0;
                }
                return (this.amount - this.fee);
            },
        },

        created(){
            switch (this.item.cryptoCurrency) {
                case 'bitcoin':
                case 'BTC':
                    this.fee = 0.001
                    this.minAmount = 0.01
                    break;

                case 'ethereum':
                case 'ETH':
                    this.fee = 0.05
                    this.minAmount = 0.05
                    break;

                case 'allb':
                case 'ALLB':
                    this.fee = 0
                    this.minAmount = 0
                    break;
            }
        },
        mounted(){
            switch (this.item.cryptoCurrency) {
                case 'bitcoin':
                case 'BTC':
                    this.tokenImg = 'ic-btc-lg';
                    break;
                case 'ethereum':
                case 'ETH':
                    this.tokenImg = 'ic-eth-lg';
                    break;
                case 'allb':
                case 'ALLB':
                    this.tokenImg = 'ic-allb-lg';
                    break;
            }
            this.qrCodeImgUrl = "http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl="+this.item.walletAddress;
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
            goSMSVerification(){
                MainRepository.Balance.setWithdraw({
                    addressTo : this.address,
                    amount : this.amount,
                    cryptoCurrency : this.item.cryptoCurrency,
                    fee : this.fee,
                    ownerMemberNo : MainRepository.MyInfo.getUserInfo().memberNo,
                    receiveAmount : this.receiveAmount
                })
                this.$router.push("/smsVerification");
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
  .wallet-address{
    width: 100%;
    text-align: center;
  }
</style>