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
        <div class="sprite-img ic-warning"></div>
        <h5 class="ml-2">{{$str("Are you sure to delete this ad?")}}</h5>
      </v-layout>
    </div>
    <div class="text-xs-right">
      <button class="btn-rounded-white text-white-hover" @click="onClose" >
        <h6>{{$str("cancel")}}</h6>
      </button>
      <button class="btn-rounded-blue btn-blue-hover" @click="deleteAd">
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
        name: "DeleteDialog",
        props :{
            show : {
                type: Boolean,
                default : false
            },
            adNo : {
                type: Number,
                default : -1
            },
        },
        data: () => ({
            confirm : false,
        }),
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            deleteAd(){

                let self = this;
                AdService.deleteAD({
                    email : MainRepository.MyInfo.getUserInfo().email,
                    adNo : this.adNo
                },function (result) {
                    self.onClose();
                    Vue.prototype.$eventBus.$emit('showAlert', 2106);
                })
            }
        },

    }
</script>

<style scoped>
  .cs-flex {
    display: flex;
  }
</style>