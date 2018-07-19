<template>
  <div>
    <div v-if="isMobile">
      <!-- name-->
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>Order number</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.orderNum}}</v-flex>
      </v-layout>
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>Transaction Type</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.exType}}</v-flex>
      </v-layout>
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>Number of transactions</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.exNum}}</v-flex>
      </v-layout>
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>Total price</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.totalPrice}}</v-flex>
      </v-layout>
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>unit price</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.unitPrice}}</v-flex>
      </v-layout>
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>time</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.time}}</v-flex>
      </v-layout>
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>status</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.status}}</v-flex>
      </v-layout>
      <v-layout gridBox>
        <v-flex xs4 text-xs-left>Trading partners</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.partner}}</v-flex>
      </v-layout>


    </div>
    <div v-else>
      <v-layout pt-4 >
        <v-flex gridBox md1 text-md-left>{{adslist.orderNum}}</v-flex>
        <v-flex gridBox md2 text-md-left>{{adslist.exType}}</v-flex>
        <v-flex gridBox md1 text-md-left>{{adslist.exNum}}</v-flex>
        <v-flex gridBox md2 text-md-left>{{adslist.totalPrice}}</v-flex>
        <v-flex gridBox md1 text-md-left>{{adslist.unitPrice}}</v-flex>
        <v-flex gridBox md2 text-md-left>{{adslist.time}}</v-flex>
        <v-flex gridBox md3 text-md-right>{{adslist.partner}}</v-flex>

      </v-layout>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "MyAdsList",
        props : {
            adslist : {},
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