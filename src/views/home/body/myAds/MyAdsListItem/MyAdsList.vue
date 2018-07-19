<template>
  <div>
    <!-- Mobile 일때-->
    <div v-if="isMobile">
      <!-- name-->
      <v-layout >
        <v-flex xs4 text-xs-left>No</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.no}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Ads Type</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.adType}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Amount</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.amount}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Limits</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.limits}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Price</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.price}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Time</v-flex>
        <v-flex xs8 text-xs-right>{{adslist.time}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left>Control</v-flex>
        <v-flex xs8 text-xs-right>
          <span class="mr-3">Edit</span>
          <span class="mr-3">Enable</span>
          <span class="mr-3">Delete</span>
          <span>Share</span>
        </v-flex>
      </v-layout>

    </div>

    <!-- Web 일때-->
    <div v-else>
      <v-layout pt-4 >
        <v-flex  md1 text-md-left>{{adslist.no}}</v-flex>
        <v-flex  md2 text-md-left>{{adslist.adType}}</v-flex>
        <v-flex  md1 text-md-left>{{adslist.amount}}</v-flex>
        <v-flex  md2 text-md-left>{{adslist.limits}}</v-flex>
        <v-flex  md1 text-md-left>{{adslist.price}}</v-flex>
        <v-flex  md2 text-md-left>{{adslist.time}}</v-flex>
        <v-flex  md3 text-md-right>
          <button class="mr-3">Edit</button>
          <button class="mr-3">Enable</button>
          <button class="mr-3">Delete</button>
          <button>Share</button>
        </v-flex>

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