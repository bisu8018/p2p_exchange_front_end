<template>
<div>
    <v-card style=" border: solid 1px #b2b2b2;">
      <v-layout row text-xs-center>
        <v-flex xs10>
          <v-chip color="secondary" text-color="white" label small >{{$str("country")}}</v-chip>
          <v-chip color="secondary" text-color="white" label small>{{$str("currency")}}</v-chip>
          <v-chip color="secondary" text-color="white" label small>{{$str("payment")}}</v-chip>
          <v-chip color="secondary" v-model="isAmout"text-color="white" label close small>{{amount}}</v-chip>
        </v-flex>
        <v-flex xs2 pt-1 ><v-icon  @click.stop="isModal = true">search</v-icon></v-flex>
      </v-layout>
    </v-card>

   <v-layout >
    <v-flex xs12 md4 >
      <v-dialog v-model="isModal" width="370px">
        <v-card width="370px">
          <v-card-text>
            <v-layout row wrap>
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("country")}}</v-flex>
            <v-flex xs12 md8><CountrySelect></CountrySelect></v-flex>

            <!-- currency 셀렉터-->
            <v-flex xs12 md4 pr-2  text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("currency")}}</v-flex>
            <v-flex xs12 md8>
              <v-select
                      v-model="selectCurrency"
                      :items="currencyItems"
                      item-text="currency"
                      item-value="code"
                      label="Select"
                      solo
                      change="onCurrencyChange"
              ></v-select>
            </v-flex>
              
            <!-- payment method 셀렉터-->
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("paymentMethod")}}</v-flex>
            <v-flex xs12 md8>
              <v-select
                      v-model="selectPaymentMethod"
                      :items="paymentMethodItems"
                      item-text="paymentMethod"
                      item-value="code"
                      label="Select"
                      solo
                      change="onPaymentMethodChange"
              ></v-select>
            </v-flex>
            <!-- amount 셀렉터 -->
            <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("amount")}}</v-flex>
            <v-flex xs12 md8>
              <v-text-field v-bind:label="$str('How_much_you_want_to_trade?')" v-model="passwordConfirm" :type="'text'" solo></v-text-field>
            </v-flex>
            </v-layout>
          </v-card-text>
          <!-- cancel, search 버튼-->
          <v-card-actions>
            <v-flex text-xs-right >
              <v-btn dark round color="secondary" @click.native="isModal = false" >{{$str("cancel")}}</v-btn>
              <v-btn dark color="primary" round @click="onCheck">{{$str("search")}}</v-btn>
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
  import CountrySelect from '@/components/CountrySelect.vue';

  
  export default Vue.extend({
    name: 'listFilter',
    components: {
        CountrySelect
    },
    data: () => ({
        isAmout : true,
        isModal: false,
        country: '',
        currency: '',
        paymentMethod: '',
        amount : 500,
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
            {paymentMethod : 'AllPayments', code : 'All'},
            {paymentMethod : 'Bank Account', code : 'BAC'},
            {paymentMethod : 'Alipay', code : 'Ali'},
            {paymentMethod : 'Wechat', code : 'WEC'},
        ]
    }),
      methods : {
          onCurrencyChange (){
              //this.currency = this.selectCurrency.code;
          },
          onPaymentMethodChange (){
              //this.paymentMethod = this.selectPaymentMethod.code;
          },
          onAmountChange (){
              //this.amount = this.a
          },

      }
  });
</script>
<style>
</style>