<template>
<div>
    <v-card style=" border: solid 1px #b2b2b2;">
      <v-layout row text-xs-center>
        <v-flex xs10>
          <v-chip color="secondary" pl-2 pr-2 text-color="white" label small >{{country}}</v-chip>
          <v-chip color="secondary" pl-2 pr-2 text-color="white" label small>{{currency}}</v-chip>
          <v-chip color="secondary" text-color="white" label small>{{paymentMethod}}</v-chip>
          <v-chip color="secondary" v-if="amount!=0" v-model="isAmout" text-color="white"
                  @input="removeAmount" label close small>{{amount}}</v-chip>
        </v-flex>
        <v-flex xs2 pt-1 ><v-icon  @click.stop="isModal = true">search</v-icon></v-flex>
      </v-layout>
    </v-card>

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

  
  export default Vue.extend({
    name: 'listFilter',
    components: {
        SelectBox
    },
    data: () => ({
        isAmout : true,
        isModal: false,
        country: '',
        currency: '',
        paymentMethod: '',
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
</style>