<template>
  <v-dialog v-model="show" persistent>
    <div class="cs-flex mb-4">
      <!--header-->
      <div class=" h4 bold text-xs-left">
        {{$str("enable")}} {{cryptocurrency}}
      </div>
      <v-spacer></v-spacer>
      <i class="material-icons color-black c-pointer" @click="onClose">close</i>
    </div>
    <div class="mb-2 text-xs-left">
      {{$str("enable")}}
    </div>
    <div class="p-relative mb-4">
      <input name="amount" v-model="amount" type="text" class="input"
             autocomplete="off" :placeholder="$str('Enter the number you want to trade')">
      <button class="crypto-text">{{cryptocurrency}}</button>
    </div>
    <div class="text-xs-right">
      <button class="btn-rounded-white text-white-hover" @click="onClose" >
        <h6>{{$str("cancel")}}</h6>
      </button>
      <button class="btn-rounded-blue btn-blue-hover" @click="setEnable">
        <h6>{{$str("confirm")}}</h6>
      </button>
    </div>
  </v-dialog>
</template>

<script>
    import AdService from "../../../../../../service/ad/AdService";
    import MainRepository from "../../../../../../vuex/MainRepository";
    import Vue from 'vue';
    export default {
        name: "EnableDialog",
        props :{
            cryptocurrency:{
                type: String,
                default : ''
            },
            adNo : {
                type: Number,
                default : -1
            },
        },
        data: () => ({
            confirm : false,
            amount : '',
            show : false,
        }),
        created(){
            this.$eventBus.$on('showMyAdsEnableDialog', (adNo) => {
                if(this.adNo === adNo){
                    this.show = true;
                }
            });
        },
        methods: {
            onClose: function () {
                this.show = false;
            },
            setEnable(){
                let self = this;
                if(this.amount >0){
                  AdService.enableAD({
                      email : MainRepository.MyInfo.getUserInfo().email,
                      adNo : this.adNo,
                      availableAmount : this.amount
                  },function () {
                      //disable 성공 알람 띄우기.
                      self.onClose();
                      MainRepository.MyAds.load(() => {});
                      Vue.prototype.$eventBus.$emit('showAlert', 2105);

                  })
                }
            },
        },

    }
</script>

<style scoped>
  .cs-flex {
    display: flex;
  }
  .crypto-text {
    font-size: 12px;
    position: absolute;
    right: 11px;
    top: 10px;
    cursor: pointer;
  }
</style>