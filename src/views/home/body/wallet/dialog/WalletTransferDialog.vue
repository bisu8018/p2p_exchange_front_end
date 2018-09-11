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
      {{$str("Transfer to Exchange account to withdraw")}}
    </div>
    <!-- 1. Cryptocurrency type 창-->
    <div class="text-xs-left">
      {{$str("Cryptocurrrency Type")}}
    </div>
    <div class="mt-2 mb-4 p-relative">
      <select class="comp-selectbox h6" v-model="cryptoType">
        <option value="General Coin">{{ $str("General Coin") }}</option>
        <option value="Custom Token">{{ $str("Custom Token") }}</option>
      </select>
      <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
    </div>
    <div v-if="cryptoType !== ''">
      <!-- 2. cryptocurrency -->
      <div class="cs-flex">
        <div class="text-xs-left">{{$str("Cryptocurrrency")}}</div>
      </div>
      <div class="mt-2 mb-4 p-relative">
        <select class="comp-selectbox h6" v-model="cryptoCurrency">
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
          <h6>({{selectedFrom}}: 0.0000 {{selectedCryptocurrency}})</h6>
        </div>
      </div>

      <div class="mt-2 mb-4 p-relative">
        <select class="comp-selectbox h6" v-model="selectedFrom">
          <option value="OTC Account">{{ $str("OTC Account") }}</option>
          <option value="Exchange Account">{{ $str("Exchange Account") }}</option>
        </select>
        <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
      </div>

        <!-- 4. To 창-->
        <div class="cs-flex">
          <div class="text-xs-left">{{$str("To")}}</div>
          <v-spacer></v-spacer>
          <div class="text-xs-right color-darkgray" >
            <h6>({{selectedTo}}: 0.0000 {{selectedCryptocurrency}})</h6>
          </div>
        </div>

        <div class="mt-2 mb-4 p-relative">
          <select class="comp-selectbox h6" v-model="selectedTo">
            <option value="OTC Account">{{ $str("OTC Account") }}</option>
            <option value="Exchange Account">{{ $str("Exchange Account") }}</option>
          </select>
          <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
        </div>


      <div class="cs-flex">
        <div class="text-xs-left">{{$str("volume")}}</div>
        <v-spacer></v-spacer>
        <div class="text-xs-right color-darkgray" >
          <h6>({{$str("exchange balance")}}: 0.0000 - 0.001000)</h6>
        </div>
      </div>
      <div class="mt-2 mb-4">
        <div class="p-relative">
          <input name="receiveAmount" type="text" class="input color-darkgray"
                 autocomplete="off" disabled>
          <span class="cs-click-send allCurrencyBtn" @mousedown="fillAll()"
                v-if="clickToAll">{{$str("All")}}</span>
        </div>
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
    <div v-if="selectedCryptocurrency !==''|| selectedFrom!=''||selectedTo  !=''"></div>
  </v-dialog>
</template>

<script>
    export default {
        name: "WalletTransferDialog",
        data: () => ({
            show : false,
            cryptoType : '',
            selectedCryptocurrency : '',
            selectedFrom : 'OTC Account',
            selectedTo : 'Exchange Account',
            clickToAll: true,
            cryptocurrencyList : [
                {name : 'BTC', fullname: 'bitcoin'},
                {name : 'ETH', fullname: 'ethereum'},
                {name : 'AllB', fullname: 'allb'},
            ],
        }),
        computed:{
            cryptoCurrency :
                {
                get(){
                    return this.selectedCryptocurrency;
                },
                set(value){
                    switch (value){
                        case 'bitcoin':
                            this.selectedCryptocurrency = 'BTC';
                            break;
                        case 'ethereum':
                            this.selectedCryptocurrency = 'ETH';
                            break;
                        case 'allb':
                            this.selectedCryptocurrency = 'AllB';
                            break;
                    }

                    //this.selectedCryptocurrency = value;
                }
            },
            selectedFrom :{

            }
        },
        created(){
            this.$eventBus.$on('showTransferDialog', (_obj) => {
                if(_obj !== ''){
                  this.cryptoType = _obj.cryptoType
                  this.cryptoCurrency = _obj.selectedCryptocurrency
                }
                else{
                    this.initData();
                }
                this.show = true;
            });
        },
        methods: {
            initData(){
                this.cryptoType = '';
                this.selectedCryptocurrency = '';
                this.selectedFrom = '';
                this.selectedTo = '';
            },
            onClose: function () {
                this.show = false;
            },
            fillAll(){
              this.clickToAll = false;
            },
            onTransfer(){

            },
        },
    }
</script>

<style scoped>

</style>
