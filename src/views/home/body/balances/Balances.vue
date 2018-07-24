<template>
  <div>
    <v-layout row wrap mt-5>
      <!--header-->
      <v-flex md6 xs12 mb-4a text-xs-left title-2>{{$str("Balances")}}</v-flex>
      <!--search filter 추가할것-->
      <v-flex md6 xs12><list-filter></list-filter></v-flex>
    </v-layout>



    <!--BalanceList-->
    <div  v-for="tokenlist in tokenLists" >
      <balance-token-list
              :tokenlist="tokenlist"
      ></balance-token-list>
    </div>

    <v-layout row wrap mt-5>
      <!--Detail header-->
      <v-flex md8 xs12 text-xs-left title-2>{{$str("Details")}}</v-flex>

      <!--search filter 추가할것-->
      <v-flex md4 xs12><list-filter></list-filter></v-flex>
    </v-layout>


    <!-- Web 일때-->
    <div v-if="!isMobile">
      <!-- 표의 header들은 Web일때만 보여짐 -->
      <v-layout mb-3>
        <v-flex  md3 text-md-left>{{$str("Type")}}</v-flex>
        <v-flex  md3 text-md-left>{{$str("Coin")}}</v-flex>
        <v-flex  md3 text-md-left>{{$str("time")}}</v-flex>
        <v-flex  md3 text-md-right>{{$str("amount")}}</v-flex>
      </v-layout>
      <v-divider></v-divider>
    </div>

    <!--BalanceList-->
    <div  v-for="detailList in detailLists" >
      <balance-detail-list
              :detailList="detailList"
      ></balance-detail-list>
      <v-divider></v-divider>
    </div>

    <Pagination></Pagination>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue';
    import ListFilter from '@/components/ListFilter.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import BalanceTokenList from "./balanceList/BalanceTokenList"
    import BalanceDetailList from "./balanceList/BalanceDetailList"
    export default {
        name: "Balances",
        components: {
            Pagination,
            ListFilter,
            BalanceTokenList,
            BalanceDetailList
        },
        data: () => ({
            tokenLists: [
                {
                    logo: 'BTC',
                    name: 'BTC',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
                {
                    logo: 'ETH',
                    name: 'ETH',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
                {
                    logo: 'USDT',
                    name: 'USDT',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
                {
                    logo: 'ALLB',
                    name: 'ALLB',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
            ],
            detailLists: [
                {
                    type: 'Buy',
                    coin: 'BTC',
                    time: 66.0,
                    amount: 224,
                },
                {
                    type: 'Sell',
                    coin: 'BTC',
                    time: 66.0,
                    amount: 224,
                },
                {
                    type: 'Transfer Out',
                    coin: 'BTC',
                    time: 66.0,
                    amount: 224,
                },
            ],

        }),
        created() {

        },
        mounted() {

        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
        methods: {

        }


    }
</script>

<style scoped>

</style>