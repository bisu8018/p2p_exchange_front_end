<template>
  <v-dialog v-model="show" >
    <v-layout row wrap>
      <!--header-->
      <div class-="text-xs-left">
        <h3 class="bold">{{$str("Deposit")}} {{tokenName}}</h3>
      </div>
      <v-spacer></v-spacer>
      <div class="text-xs-right">
        <i class="material-icons color-black c-pointer" @click="onClose">close</i>
      </div>
      <v-flex xs12 color-darkgray text-xs-center mt-3 mb-4>
        {{tokenName}} {{$str("Deposit_Address")}}
      </v-flex>
      <v-flex xs12>
        <input type="text" id="copy-code" :value="walletAddress" class="wallet-address h6" disabled  >
      </v-flex>
      <v-flex xs12 mt-3>
        <h5 class="color-blue-active" @click="onCopy()">
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
            {{tokenName}}
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
            0.001 {{tokenName}}.
            {{$str("BalanceDepositExplain3-2")}}
            0.001 {{tokenName}}.
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
        name: "WalletDepositDialog",
        props :{
            tokenName : {
                type: String,
                default : ''
            },
            walletAddress : {
                type: String,
                default : ''
            },
        },
        data: () => ({
            show: false,
        }),
        computed:{
            qrCodeImgUrl(){
                return"https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=" +this.walletAddress
            }
        },
        created(){
            this.$eventBus.$on('showDepositDialog', (tokenName) => {
                if(this.tokenName === tokenName){
                  this.show = true;
                }
            });
        },
        methods: {
            onClose: function () {
                this.show = false;
            },
            onCopy() {
                this.$clipboard(this.walletAddress)
                this.$eventBus.$emit('showAlert', 2001);
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