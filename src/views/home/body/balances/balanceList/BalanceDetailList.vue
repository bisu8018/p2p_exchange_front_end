<template>
  <div>
    <!--mobile 일때-->
    <div v-if="isMobile">
      <!--type-->
      <v-layout mb-2 mt-4>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("Type")}} : </v-flex>
        <v-flex xs6 text-xs-left>{{detailList.type}}</v-flex>
      </v-layout>
      <!--coin-->
      <v-layout mb-2>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("Coin")}}:</v-flex>
        <v-flex xs6 text-xs-left>{{detailList.coin}}</v-flex>
      </v-layout>
      <!-- time-->
      <v-layout mb-2>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("time")}}:</v-flex>
        <v-flex xs6 text-xs-left>{{detailList.time}}</v-flex>
      </v-layout>
      <!-- ammount -->
      <v-layout mb-4>
        <v-flex xs6 text-xs-left h5 color-darkgray>{{$str("amount")}}:</v-flex>
        <v-flex xs6 text-xs-left>{{detailList.amount}} {{detailList.coin}}</v-flex>
      </v-layout>
    </div>
    <!--web 일때-->
    <div v-else>
      <v-layout row wrap align-center fill-height class="webDetailWrapper">
        <v-flex md3 xs12 text-md-left>
          {{detailList.type}}
        </v-flex>
        <v-flex md3 xs12 text-md-left>
          {{detailList.coin}}
        </v-flex>
        <v-flex md3 xs12 text-md-left>
          {{detailList.time}}
        </v-flex>
        <v-flex md3 xs12 text-md-right>
          {{detailList.amount}} {{detailList.coin}}
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "BalanceDetailList",
        props : {
            detailList : {},
        },
        methods : {

        },
        data: () => ({

        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
    }
</script>

<style scoped>
.webDetailWrapper{
  min-height: 68px;
}
</style>