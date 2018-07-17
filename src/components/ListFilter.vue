<template>
<div>
    <v-layout class="filterStatusBar"row text-xs-center fill-height>
      <v-flex xs10>
        <div  class="statusChip ChipGray"  >{{country}}</div>
        <div class="statusChip ChipGray mt-4"  >{{currency}}</div>
        <div class="statusChip ChipGray"  >{{paymentMethod}}</div>
        <div class="statusChip ChipGray" v-if="amount!=0" v-model="isAmout"
                @input="removeAmount" >{{amount}}<v-icon small @click="removeAmount">close</v-icon></div>
      </v-flex>
      <v-flex xs2 pt-1><v-icon  @click.stop="isModal = true">search</v-icon></v-flex>
    </v-layout>

   <v-layout >
    <v-flex xs12 md4 >
      <div v-if="isModal" class="filterModal">
        <v-card width="370px">
          <v-card-text>
            <v-layout row wrap>
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("nationality")}}</v-flex>
            <v-flex xs12 md8><CountrySelect></CountrySelect></v-flex>

            <!-- currency 셀렉터-->
            <v-flex xs12 md4 pr-2  text-md-right text-xs-left mb-2 style="color: #353535" >{{$str("currency")}}</v-flex>
            <v-flex xs12 md8 selectbox-wrapper>
              <select v-model="currency" @change="onCurrencyChange" class="selectbox caption">
                <option v-for="item in currencyItems" v-bind:value="currencyItems.code">{{item.currency}}</option>
              </select>
              <v-icon class="icon-style">keyboard_arrow_down</v-icon>
            </v-flex>
              
            <!-- payment method 셀렉터-->
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("paymentMethod")}}</v-flex>
              <v-flex xs12 md8 selectbox-wrapper>
                <select v-model="paymentMethod" @change="onPaymentMethodChange" class="selectbox caption">
                  <option v-for="item in paymentMethodItems" v-bind:value="item.code">{{item.paymentMethod}}</option>
                </select>
                <v-icon class="icon-style">keyboard_arrow_down</v-icon>
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
      </div>
    </v-flex>
  </v-layout>

  </div>
</template>


<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  import CountrySelect from '@/components/CountrySelect.vue';

  
  export default Vue.extend({
    name: 'listFilter',
    components: {
        CountrySelect
    },
    data: () => ({
        isAmout : true,
        isModal: false,
        country: 'All Countries',
        currency: 'CNY',
        paymentMethod: 'Alipay',
        amount : 0,
        currencyItems: [
            {currency : 'CNY', code : 'CNY'},
            {currency : 'USD', code : 'USD'},
            {currency : 'SGD', code : 'SGD'},
            {currency : 'INR', code : 'INR'},
            {currency : 'VND', code : 'VND'},
            {currency : 'CAD', code : 'CAD'},
            {currency : 'AUD', code : 'AUD'},
            {currency : 'KRW', code : 'KRW'},
            {currency : 'CHF', code : 'CHF'},
            {currency : 'TWD', code : 'TWD'},
            {currency : 'RUB', code : 'RUB'},
            {currency : 'GBP', code : 'GBP'},
            {currency : 'HKD', code : 'HKD'},
            {currency : 'EUR', code : 'EUR'},
            {currency : 'NGN', code : 'NGN'},
            {currency : 'IDR', code : 'IDR'},
            {currency : 'PHP', code : 'PHP'},
            {currency : 'KHR', code : 'KHR'},
        ],
        paymentMethodItems: [
            {paymentMethod : 'All Payments', code : 'All'},
            {paymentMethod : 'Bank Account', code : 'BAC'},
            {paymentMethod : 'Alipay', code : 'Ali'},
            {paymentMethod : 'Wechat', code : 'WEC'},
        ]
    }),
      methods : {
          onCurrencyChange (){
              //currency vuex 추가
          },
          onPaymentMethodChange (){
              //paymnetMethod vuex 추가
          },
          onAmountChange (){
              //amount vuex 추가
          },
          onSearch(){

              // search 누르면 뭐할지 여기에 기입.
              this.isModal = false; //modal 창 끄기.
          },
          removeAmount(){
              location.reload();      // 새로고침으로 해놨는데, vuex도입시 수정할것.
              this.amount = 0;
          }

      }
  });
</script>

<style>
  .selectbox {
    width: 100%;
    height: 36px;
    border-radius: 2px;
    background-color: #ffffff;
    border: solid 1px #8d8d8d;
    margin-bottom: 26px;
    color: #9294a6;
    padding-left: 12px;
  }

  .icon-style {
    position: absolute;
    right: 8px;
    top: 5px;
  }
  .filterStatusBar{
    border: solid 1px #b2b2b2;
    min-height: 40px;
  }
  .statusChip{
    color: white;
    width: auto;
    display: inline-block;
    padding-right: 8px;
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 2px;
    margin: 4px;

  }
  .filterModal{
    width: 370px;
    z-index: 99;
  }
</style>