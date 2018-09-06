<template>
  <v-dialog v-model="show">
    <div>
      <div class="cs-flex mb-3">
        <!--header-->
        <div class=" h4 bold text-xs-left">
          {{getCryptoName(cryptoCurrency) }} {{$str("withdraw")}}
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
          <span class="crypto-text">{{getCryptoName(cryptoCurrency) }}</span>
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
          <span class="crypto-text">{{getCryptoName(cryptoCurrency) }}</span>
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
          <span class="crypto-text">{{getCryptoName(cryptoCurrency) }}</span>
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
        {{$str("Minimum withdrawal amount")}}: {{minAmount}} {{getCryptoName(cryptoCurrency) }}
      </h6>
      <h6 v-if="getCryptoName(cryptoCurrency)  === 'ETH'" class="color-darkgray text-xs-left mb-3">
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
        name: "BalanceWithdrawalDialog",
        props :{
            cryptoCurrency : {
                type: String,
                default : ''
            },
        },
        data: () => ({
            show : false,
            confirm : false,
            qrCodeImgUrl: '',
            minAmount : '',
            amount : '',
            fee : 0,
            address : '',

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
            this.$eventBus.$on('showWithdrawDialog', (cryptoCurrency) => {
                if(this.cryptoCurrency === cryptoCurrency){
                    this.show = true;
                }
            });
        },
        mounted(){
            switch (this.cryptoCurrency) {
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
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            goSMSVerification(){
                MainRepository.Balance.setWithdraw({
                    addressTo : this.address,
                    amount : this.amount,
                    cryptoCurrency : this.cryptoCurrency,
                    fee : this.fee,
                    ownerMemberNo : MainRepository.MyInfo.getUserInfo().memberNo,
                    receiveAmount : this.receiveAmount
                })
                this.$router.push("/smsVerification");
            },
            getCryptoName(cryptoCurrency) {
                switch (cryptoCurrency) {
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