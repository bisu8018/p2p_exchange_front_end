<template>
  <div>
    <div v-if="isMobile">
      <!-- name-->
      <v-layout >
        <v-flex xs4 text-xs-left>Order number</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.orderNum}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Transaction Type</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.exType}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Number of transactions</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.exNum}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Total price</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.totalPrice}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>unit price</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.unitPrice}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>time</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.time}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>status</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.status}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Trading partners</v-flex>
        <v-flex xs8 text-xs-right>{{orderlist.partner}}</v-flex>
      </v-layout>


    </div>
    <div v-else>
      <v-layout userList pt-4 >
        <v-flex  md1 text-md-left>{{orderlist.orderNum}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.exType}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.exNum}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.totalPrice}}</v-flex>
        <v-flex  md1 text-md-left>{{orderlist.unitPrice}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.time}}</v-flex>
        <v-flex  md1 text-md-left>{{orderlist.status}}</v-flex>
        <v-flex  md1 text-md-right>{{orderlist.partner}}</v-flex>

      </v-layout>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "MyOrderList",
        props : {
            orderNum: '',
            exType : 0,
            exNum : 0,
            totalPrice : 0,
            unitPrice : 0,
            time: 0,
            status : '',
            partner : '',
            orderlist : {},
        },
        methods : {

        },
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
        }
    }
</script>

<style scoped>

</style>