<template>
  <v-dialog v-model="show">
    <div class="cs-flex mb-3">
      <!--header-->
      <div class=" h4 bold text-xs-left">
        {{$str("Transfer")}}
      </div>
      <v-spacer></v-spacer>
      <i class="material-icons color-black c-pointer" @click="onClose">close</i>
    </div>
    <div class="color-darkgray text-xs-left mt-3 mb-4">
      {{$str("Transfer to")}} {{$str(ToValue)}} {{$str("to withdraw")}}
    </div>
    <!-- 1. Cryptocurrency type 창-->
    <div class="text-xs-left">
      {{$str("Cryptocurrrency Type")}}
    </div>
    <div class="mt-2 mb-4 p-relative">
      <select class="comp-selectbox h6" v-model="cryptocurrencyType">
        <option value="General Coin">{{ $str("General Coin") }}</option>
        <option value="Custom Token">{{ $str("Custom Token") }}</option>
      </select>
      <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
    </div>

    <!-- 2. cryptocurrency -->
    <div class="cs-flex">
      <div class="text-xs-left">{{$str("Cryptocurrrency")}}</div>
    </div>
    <div class="mt-2 mb-4 p-relative">
      <select class="comp-selectbox h6" v-model="cryptocurrency">
        <option v-for="cryptocurencyItem in cryptocurrencyList" v-bind:value="cryptocurencyItem.name">
          {{cryptocurencyItem.name}}
        </option>
      </select>
      <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
    </div>
    <!-- 3. From 창-->
    <div class="cs-flex">
      <div class="text-xs-left">{{$str("From")}}</div>
      <v-spacer></v-spacer>
      <div class="text-xs-right color-darkgray" >
        <h6>({{$str(FromValue)}}: 0.0000 {{cryptocurrency}})</h6>
      </div>
    </div>

    <div class="mt-2 mb-4 p-relative">
      <select class="comp-selectbox h6" v-model="FromValue">
        <option value="OTC Account" >{{ $str("OTC Account") }}</option>
        <option value="Exchange Account" >{{ $str("Exchange Account") }}</option>
      </select>
      <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
    </div>

      <!-- 4. To 창-->
      <div class="cs-flex">
        <div class="text-xs-left">{{$str("To")}}</div>
        <v-spacer></v-spacer>
        <div class="text-xs-right color-darkgray" >
          <h6>({{$str(ToValue)}}: 0.0000 {{cryptocurrency}})</h6>
        </div>
      </div>

      <div class="mt-2 mb-4 p-relative">
        <select class="comp-selectbox h6" v-model="ToValue">
          <option value="OTC Account" >{{ $str("OTC Account") }}</option>
          <option value="Exchange Account" >{{ $str("Exchange Account") }}</option>
        </select>
        <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
      </div>


    <div class="cs-flex">
      <div class="text-xs-left">{{$str("volume")}}</div>
      <v-spacer></v-spacer>
      <div class="text-xs-right color-darkgray" >
        <h6>({{$str("Available")}}: 0.0000 - 0.001000)</h6>
      </div>
    </div>
    <div class="mt-2 mb-4">
      <div class="p-relative">
        <input name="receiveAmount" type="text" class="input color-darkgray"
               autocomplete="off" disabled>
        <span class="cs-click-send allCurrencyBtn" @click="fillAll()"
              v-if="clickToAll">{{$str("All")}}</span>
      </div>
    </div>
    <div class="text-xs-right">
      <button class="btn-rounded-white text-white-hover" @click="onClose" >
        <h6>{{$str("cancel")}}</h6>
      </button>
      <button class="btn-rounded-blue btn-blue-hover" @click="onTransfer">
        <h6>{{$str("Transfer Now")}}</h6>
      </button>
    </div>
  </v-dialog>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import WalletTransfer from "../../../../../vuex/model/WalletTransfer";

    export default {
        name: "WalletTransferDialog",
        data: () => ({
            show : false,
            cryptocurrencyType : '',
            cryptocurrency : '',
            FromData : '',
            ToData : '',
            Volume : '',
            clickToAll: true,
            cryptocurrencyList : [
                {name : 'BTC', fullname: 'bitcoin'},
                {name : 'ETH', fullname: 'ethereum'},
                {name : 'AllB', fullname: 'allb'},
            ],

        }),
        computed:{
            ToValue :{
                get(){
                    return this.ToData;
                },
                set(value){
                    this.ToData = value;
                    this.onTo()
                },
            },
            FromValue :{
                get(){
                    return this.FromData;
                },
                set(value){
                    this.FromData = value;
                    this.onFrom()
                },
            },
        },
        created(){
            this.$eventBus.$on('showTransferDialog', () => {
                this.cryptocurrencyType = MainRepository.Wallet.getTransfer().cryptocurrencyType;
                this.cryptocurrency = MainRepository.Wallet.getTransfer().cryptocurrency;
                this.FromValue = MainRepository.Wallet.getTransfer().From;
                this.ToValue = MainRepository.Wallet.getTransfer().To;
                this.Volume = MainRepository.Wallet.getTransfer().Volume;
                this.show = true;
            });
        },
        beforeDestroy(){
          this.initData();
        },
        methods: {
            initData(){
                this.cryptocurrencyType = '';
                this.cryptocurrency = '';
                this.From = '';
                this.To = '';
                this.Volume = '';
            },
            onClose: function () {
                this.show = false;
            },
            fillAll(){
              //가능한 잔고 전부 뿌려줌

            },
            onTransfer(){
              //post axios call
                this.$eventBus.$emit('showAlert', 9000);
            },
            onFrom(){
                if(this.FromData ==='OTC Account'){
                    this.ToData = 'Exchange Account'
                }
                else{
                    this.ToData = 'OTC Account'
                }
            },
            onTo(){
                if(this.ToData ==='OTC Account'){
                    this.FromData = 'Exchange Account'
                }
                else{
                    this.FromData = 'OTC Account'
                }
            },
        },
    }
</script>

<style scoped>

</style>
