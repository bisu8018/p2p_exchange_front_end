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
        <v-flex xs2>
          <v-btn flat @click.stop="isModal = true" icon color="secondary"><v-icon>search</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-card>
   <v-layout>
    <v-flex xs12 md4>
      <v-dialog v-model="isModal">
        <v-card >
          <v-card-text>
            <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("country")}}</v-flex>
            <CountrySelect></CountrySelect>
            <!-- currency 셀렉터-->
            <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("currency")}}</v-flex>
            <v-flex>
              <v-select
                      v-model="select"
                      :items="items"
                      item-text="currency"
                      item-value="code"
                      label="Select"
                      solo
                      change="onChange"
              ></v-select>
            </v-flex>
            <!-- payment method 셀렉터-->
            <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("payment method")}}</v-flex>
            <v-flex>
              <v-select
                      v-model="select"
                      :items="items"
                      item-text="payment_method"
                      item-value="code"
                      label="Select"
                      solo
                      change="onChange"
              ></v-select>
            </v-flex>
            <!-- amount 셀렉터 -->
            <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("amount")}}</v-flex>
            <v-flex>
              <v-text-field v-bind:label="$str('How much you want to drade?')" v-model="passwordConfirm" :type="'password'" solo></v-text-field>
            </v-flex>
          </v-card-text>
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
  import { abUtils } from '@/common/utils';
  
  export default Vue.extend({
    name: 'listFilter',
    components: {
        CountrySelect
    },
    data: () => ({
       items: [
          { title: 'china' ,name: 'login'},
          { title: 'Sign Up', name: 'signup'},
          { title: 'Trade Center', name: 'tradeCenter'},
          { title: 'Post AD', name: 'postAd'}
        ],
        amount : 500,
        isAmout : true,
        isModal: false,
    }),
      methods : {


      }
  });
</script>
<style>
</style>