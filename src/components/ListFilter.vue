<template>
<div>
    <div style=" border: solid 1px #b2b2b2;">
      <v-layout row text-xs-left>
        <v-flex xs10>
          <div  class=" statusChip"  >{{country}}</div>
          <div  class=" statusChip"  >{{currency}}</div>
          <div  class=" statusChip" >{{paymentMethod}}</div>
          <div  class=" statusChip" v-if="amount!=0" v-model="isAmout"
                  @input="removeAmount" >{{amount}}</div>
        </v-flex>
        <v-flex xs2 pt-1 ><v-icon  @click.stop="isModal = true">search</v-icon></v-flex>
      </v-layout>
    </div>

   <v-layout>
    <v-flex xs12 md4 >
      <v-dialog v-model="isModal" width="370px">
        <v-card width="370px">
          <v-card-text>
            <v-layout row wrap>
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("country")}}</v-flex>
              <!--country select box-->
            <v-flex xs12 md8><SelectBox select-box-type="country"></SelectBox></v-flex>

            <!-- currency 셀렉터-->
            <v-flex xs12 md4 pr-2  text-md-right text-xs-left mb-2 style="color: #353535" >{{$str("currency")}}</v-flex>
            <v-flex xs12 md8>
              <SelectBox select-box-type="currency"></SelectBox>
            </v-flex>
              
            <!-- payment method 셀렉터-->
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("paymentMethod")}}</v-flex>
            <v-flex xs12 md8>
              <SelectBox select-box-type="payment"></SelectBox>
            </v-flex>
            <!-- amount 셀렉터 -->
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("amount")}}</v-flex>
            <v-flex xs12 md8>
              <v-text-field v-bind:label="$str('How_much_you_want_to_trade?')" v-model="amount" :type="'number'" ></v-text-field>
            </v-flex>
            </v-layout>
          </v-card-text>
          <!-- cancel, search 버튼-->
          <v-card-actions>
            <v-flex text-xs-right >
              <v-btn dark round color="secondary" @click.native="isModal = false" >{{$str("cancel")}}</v-btn>
              <v-btn dark color="primary" round @click="onSearch">{{$str("search")}}</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>

  </div>
</template>


<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  import SelectBox from '@/components/SelectBox.vue';
  import MainRepository from "../vuex/MainRepository";

  
  export default Vue.extend({
    name: 'listFilter',
    components: {
        SelectBox
    },
    data: () => ({
        isAmout : true,
        isModal: false,
        country: 'All countries',
        currency: 'CNY',
        paymentMethod: 'All Payments',
        amount : 500,
    }),
      methods : {
          onCurrencyChange (){

          },
          onPaymentMethodChange (){

          },
          onAmountChange (){

          },
          onSearch(){
              // search 누르면 뭐할지 여기에 기입.
              this.country = MainRepository.SelectBox.controller().getCountry();
              this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
              this.currency = MainRepository.SelectBox.controller().getCurrency();

              this.isModal = false; //modal 창 끄기.

              //리스트 불러오기
              // MainRepository.TradeView.get~~~~
          },
          removeAmount(){
              location.reload();      // 새로고침으로 해놨는데, vuex도입시 수정할것.
              this.amount = 0;
          }

      }
  });
</script>

<style>
  .statusChip{
    display : inline-block;
    background-color: #9294A6;
    margin-left: 8px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
  }
</style>