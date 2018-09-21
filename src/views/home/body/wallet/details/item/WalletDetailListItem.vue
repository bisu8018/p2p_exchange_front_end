<template>
  <div>
    <!--mobile 일때-->
    <div v-if="isMobile">
      <!--type-->
      <v-layout mb-2 mt-4>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("Type")}} : </v-flex>
        <v-flex xs6 text-xs-right>{{$str(detailList.depositType)}}</v-flex>
      </v-layout>
      <!--coin-->
      <v-layout mb-2>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("cryptoCurrency")}} :</v-flex>
        <v-flex xs6 text-xs-right>{{tokenName}}</v-flex>
      </v-layout>
      <!-- time-->
      <v-layout mb-2>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("time")}} :</v-flex>
        <v-flex xs6 text-xs-right>{{transTime(detailList.registerDatetime)}}</v-flex>
      </v-layout>
      <!-- amount -->
      <v-layout mb-2>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("amount")}} :</v-flex>
        <v-flex xs6 text-xs-right>{{ $fixed(detailList.amount, tokenName) }} {{tokenName}}</v-flex>
      </v-layout>
      <!-- status -->
      <v-layout mb-2>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("status")}} :</v-flex>
        <v-flex xs6 text-xs-right>{{$str(detailList.status)}}</v-flex>
      </v-layout>
      <!-- action -->
      <v-layout mb-4>
        <v-flex xs4 text-xs-left h5 color-darkgray>{{$str("action")}} :</v-flex>
        <v-flex xs8 text-xs-right>

          <!--button v-if="detailList.status == 'Under examination'" class="btn-rounded-white mr-3" @click="">{{$str("cancel")}}</button-->
          <button v-if="showDetailBtn" class="btn-rounded-blue btn-blue-hover "
                  @click="drawer">{{$str("details")}}
          </button>
        </v-flex>
      </v-layout>
    </div>
    <!--web 일때-->
    <div v-else>
      <v-layout row wrap align-center fill-height class="webDetailWrapper">
        <v-flex md2 text-md-left>
          {{$str(detailList.depositType)}}
        </v-flex>
        <v-flex md2 text-md-left>
          {{tokenName}}
        </v-flex>
        <v-flex md2 text-md-left>
          {{transTime(detailList.registerDatetime)}}
        </v-flex>
        <v-flex md2 text-md-right>
          {{ $fixed(detailList.amount, tokenName) }} {{tokenName}}
        </v-flex>
        <v-flex md2 text-md-right>
          {{$str(detailList.status)}}
        </v-flex>
        <v-flex md2 text-md-right>
          <!--button v-if="detailList.status == 'Under examination'"
                  class="btn-rounded-white mr-3" @click="">{{$str("cancel")}}
          </button-->
          <button v-if="showDetailBtn" class="btn-rounded-blue btn-blue-hover "
                  @click="drawer">{{$str("details")}}
          </button>
        </v-flex>
      </v-layout>
    </div>
    <v-flex v-if="isdrawer" xs12 >
      <div class="detail-list-modal">
        <v-layout text-xs-left mb-2 >
          <v-flex md2 xs6 pl-4 >{{$str("Address")}} :</v-flex>
          <v-flex md10 xs6 word-break>{{detailList.addressTo}}</v-flex>
        </v-layout>
        <v-layout text-xs-left mb-2>
          <v-flex md2 xs6 pl-4>{{$str("TxID")}} :</v-flex>
          <v-flex md10 xs6 word-break> {{detailList.txHash}}</v-flex>
        </v-layout>
        <v-layout text-xs-left mb-2>
          <v-flex md2 xs6 pl-4>{{$str("fee")}} :</v-flex>
          <!-- {{detailList.fee}} -->
          <v-flex md10 xs6>0</v-flex>

        </v-layout>
        <v-layout text-xs-left>
          <v-flex md2 xs6 pl-4>{{$str("Processing Time")}} :</v-flex>
          <v-flex md10 xs6> {{transTime(detailList.registerDatetime)}}</v-flex>
        </v-layout>
      </div>
    </v-flex>
  </div>
</template>

<script>
    import MainRepository from "../../../../../../vuex/MainRepository";
    import {abUtils} from '@/common/utils';
    import CustomToken from "@/vuex/model/CustomToken";
    export default {
        name: "WalletDetailList",
        props : {
            detailList : {},
        },
        data: () => ({
            isdrawer : false,

        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            showDetailBtn(){
                return (this.detailList.depositType == 'Deposit'|| this.detailList.depositType == 'Withdrawal')
            },
            isGeneralCoin(){
                return  (this.detailList.tokenName === "")
            },
            tokenName(){
                if(this.isGeneralCoin) {
                    return this.detailList.cryptocurrency
                }else{
                    return this.detailList.tokenName;
                }
            },
        },
        created(){
            //customtoken 일때
            if(!this.isGeneralCoin) {
                //소수점 계산 fixed를 위해 가능 소숫점 자릿수 setting 작업
                MainRepository.CustomToken.setSelectedCustomToken(
                    new CustomToken({
                        decimalCount : this.detailList.decimalCount
                    })
                )
            }
        },
        methods : {
            transTime(time){
                return abUtils.toTimeFormat(time);
            },
            drawer(){
                this.isdrawer = !this.isdrawer
            }
        },
    }
</script>

<style scoped>
  .webDetailWrapper{
    min-height: 68px;
  }
  .detail-list-modal{
    border-radius: 2px;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    padding: 24px 24px 24px 0px;
  }
  .cs-flex{
    display: flex;
  }
  .word-break{
    word-break: break-all;
  }
</style>