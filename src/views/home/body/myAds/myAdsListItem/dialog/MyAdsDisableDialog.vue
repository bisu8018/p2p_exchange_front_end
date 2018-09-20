<template>
  <v-dialog v-model="show">
    <div class="cs-flex mb-4">
      <!--header-->
      <div class=" h4 bold text-xs-left">
        {{$str("Notice")}}
      </div>
      <v-spacer></v-spacer>
      <i class="material-icons color-black c-pointer" @click="onClose">close</i>
    </div>
    <div class="mb-2 text-xs-left">
      <v-layout align-center>
        <div class="sprite-img ic-warning img-width"></div>
        <h5 class="pl-2">
          {{$str("If you press disable, your Ad would be not appeared on Ads list. Are you sure to disable?")}}
        </h5>
      </v-layout>
    </div>
    <div class="text-xs-right">
      <button class="btn-rounded-white text-white-hover" @click="onClose" >
        <h6>{{$str("cancel")}}</h6>
      </button>
      <button class="btn-rounded-blue btn-blue-hover" @click="disableAd">
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
        name: "MyAdsDisableDialog",
        props :{
            adNo : {
                type: Number,
                default : -1
            },
        },
        data: () => ({
            confirm : false,
            show : false,
        }),
        created(){
            this.$eventBus.$on('showMyAdsDisableDialog', (adNo) => {
                if(this.adNo === adNo){
                    this.show = true;
                }
            });
        },
        methods: {
            onClose: function () {
                this.show = false;
            },
            disableAd(){
                let self = this;
                AdService.disableAD({
                    email : MainRepository.MyInfo.getUserInfo().email,
                    adNo : this.adNo
                },function () {
                    self.onClose();
                    MainRepository.MyAds.load(() => {});
                    Vue.prototype.$eventBus.$emit('showAlert', 2104);

                })
            }
        },
    }
</script>

<style scoped>
  .cs-flex {
    display: flex;
  }
  .img-width{
    width: 36px;
  }
</style>