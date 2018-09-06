<template>
  <v-dialog v-model="show" >
    <v-layout row wrap>
      <!--header-->
      <div class-="text-xs-left">
        <h3 class="bold">{{$str("Deposit")}} {{getCryptoName(cryptoCurrency) }}</h3>
      </div>
      <v-spacer></v-spacer>
      <div class="text-xs-right">
        <i class="material-icons color-black c-pointer" @click="onClose">close</i>
      </div>
      <v-flex xs12 color-darkgray text-xs-center mt-3 mb-4>
        {{getCryptoName(cryptoCurrency) }} {{$str("Deposit_Address")}}
      </v-flex>
      <v-flex xs12>
        <input type="text" id="copy-code" :value="walletAddress" class="wallet-address h6" disabled  >
      </v-flex>
      <v-flex xs12 mt-3>
        <h5 class="color-blue c-pointer" @click="onCopy()">
          {{$str("Copy")}}
        </h5>
      </v-flex>
      <v-flex xs12 mt-3 mb-3>
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
            {{$str("BalanceDepositExplainTest")}}
            {{$str("BalanceDepositExplain1-1")}}
            {{getCryptoName(cryptoCurrency) }}
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
            0.001 {{getCryptoName(cryptoCurrency) }}.
            {{$str("BalanceDepositExplain3-2")}}
            0.001 {{getCryptoName(cryptoCurrency) }}.
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
</template>

<script>
    export default {
        name: "BalanceDepositDialog",
        props :{
            cryptoCurrency : {
                type: String,
                default : ''
            },
            walletAddress : {
                type: String,
                default : ''
            },
        },
        data: () => ({
            confirm : false,
            qrCodeImgUrl: '',
            show: false,
        }),
        created(){
            this.$eventBus.$on('showDepositDialog', (cryptoCurrency) => {
                if(this.cryptoCurrency === cryptoCurrency){
                  this.show = true;
                }
            });
        },
        beforeMount(){
            this.qrCodeImgUrl = "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=" +this.walletAddress;
            //"http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl="+this.item.walletAddress;
        },
        methods: {
            onClose: function () {
                this.$emit('close');
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
            onCopy() {
                this.$clipboard(this.walletAddress)
            },
        },
    }
</script>

<style scoped>
  .wallet-address{
    width: 100%;
    text-align: center;
  }
  .horizontalDivider{
    width: 352px;
    height: 1px;
    background-color: #d1d1d1;
    margin-bottom: 24px;
  }

</style>