<template>
  <v-dialog v-model="show">
    <div>
      <div class="cs-flex mb-3">
        <!--header-->
        <div class=" h4 bold text-xs-left">
          {{tokenName}} {{$str("withdraw")}}
        </div>
        <v-spacer></v-spacer>
        <i class="material-icons color-black c-pointer" @click="onClose">close</i>
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
                 v-bind:class="{'warning-border' : warning_address}"
                 @blur="onCheckAddress" autocomplete="off" >
          <div class="warning-text-wrapper">
            <p class="d-none" v-bind:class="{'warning-text' : warning_address}">
              {{text_warning_address}}</p>
          </div>
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
                 v-bind:class="{'warning-border' : warning_amount}"
                 @blur="onCheckAmount" autocomplete="off" >
          <span class="crypto-text">{{tokenName}}</span>
          <div class="warning-text-wrapper">
            <p class="d-none" v-bind:class="{'warning-text' : warning_amount}">
              {{text_warning_amount}}</p>
          </div>
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
          <span class="crypto-text">{{tokenName}}</span>
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
          <span class="crypto-text">{{tokenName}}</span>
        </div>
      </div>
      <div class="text-xs-right">
        <button class="btn-rounded-white text-white-hover" @click="onClose" >
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
        {{$str("Minimum withdrawal amount")}}: {{minAmount}} {{tokenName}}
      </h6>
      <h6 v-if="getCryptoName(tokenName)  === 'ETH'" class="color-darkgray text-xs-left mb-3">
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
</template>

<script>
    import MainRepository from '../../../../../../vuex/MainRepository';
    export default {
        name: "WalletWithdrawalDialog",
        props :{
            tokenName : {
                type: String,
                default : ''
            },
        },
        data: () => ({
            show : false,
            confirm : false,
            qrCodeImgUrl: '',
            amount : '',
            address : '',

            text_warning_address: "",
            text_warning_amount: "",
            warning_address: false,
            warning_amount: false,

        }),
        computed:{
            receiveAmount(){
                if(this.amount < this.fee){
                    return 0;
                }
                return (this.amount - this.fee);
            },
            fee(){
                switch (this.tokenName) {
                    case 'bitcoin':
                    case 'BTC':
                        return 0.001

                    case 'ethereum':
                    case 'ETH':
                        return  0.05

                    case 'allb':
                    case 'ALLB':
                        return 0
                    default: return 0
                }
            },
            minAmount(){
                switch (this.tokenName) {
                    case 'bitcoin':
                    case 'BTC':
                        return 0.01

                    case 'ethereum':
                    case 'ETH':
                        return  0.05

                    case 'allb':
                    case 'ALLB':
                        return 0
                    default: return 0
                }
            }
        },
        created(){
            this.$eventBus.$on('showWithdrawDialog', (tokenName) => {
                if(this.tokenName === tokenName){
                    this.show = true;
                }
            });
        },
        methods: {
            initData(){
                this.minAmount = ''
                this.amount = ''
                this.fee = 0
                this.address = ''
            },
            onClose: function () {
                this.initData();
                this.show = false;
            },
            onCheckAddress(){
                if (this.address === "") {
                    this.warning_address = true;
                    this.text_warning_address = this.$str("Please_enter_a_vaild_number");
                    return false;
                }
                this.warning_address = false;
                return true;
            },
            onCheckAmount(){
                if (this.amount === "") {
                    this.warning_amount = true;
                    this.text_warning_amount = this.$str("Please_enter_a_vaild_number");
                    return false;
                }
                if (this.amount <= 0) {
                    this.warning_amount = true;
                    this.text_warning_amount = this.$str("Please enter more than 0");
                    return false;
                }
                this.warning_amount = false;
                return true;
            },
            goSMSVerification(){
                if(this.onCheckAddress() && this.onCheckAmount()){
                  MainRepository.Wallet.setWithdraw({
                      addressTo : this.address,
                      amount : this.amount,
                      cryptocurrency : this.getCryptoName(this.tokenName),
                      fee : this.fee,
                      ownerMemberNo : MainRepository.MyInfo.getUserInfo().memberNo,
                      receiveAmount : this.receiveAmount
                  })
                  this.$router.push("/smsVerification");
                }
            },
            getCryptoName(cryptocurrency) {
                switch (cryptocurrency) {
                    case 'bitcoin':
                    case 'BTC':
                        return 'bitcoin';
                    case 'ethereum':
                    case 'ETH':
                        return 'ethereum';
                    case 'allb':
                    case 'ALLB':
                        return 'allb';

                    default:
                        return cryptocurrency;
                }
            },
        },
    }
</script>

<style scoped>
  /* signUp의 click-send-text와 동일*/
  .crypto-text {
    font-size: 12px;
    position: absolute;
    right: 11px;
    top: 10px;
  }
  .cs-flex{
    display: flex;
  }
</style>