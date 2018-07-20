<template>
  <div>
    <v-layout row wrap mt-5>
      <!--header-->
      <v-flex md3 xs12>{{$str("MyOrder")}}</v-flex>
      <v-flex md5 xs12></v-flex>
      <!--search filter 추가할것-->
      <v-flex md4 xs12><list-filter></list-filter></v-flex>
    </v-layout>

    <!-- Web 일때-->
    <div v-if="!isMobile">
      <!-- 표의 header들은 Web일때만 보여짐-->
      <v-layout mb-3>
        <v-flex  md1 text-md-left>{{$str("OrderNumber")}}</v-flex>
        <v-flex  md2 text-md-left>{{$str("TransactionType")}}</v-flex>
        <v-flex  md2 text-md-left>{{$str("NumberOfTransactions")}}</v-flex>
        <v-flex  md2 text-md-left>{{$str("TotalPrice")}}</v-flex>
        <v-flex  md1 text-md-left>{{$str("unitPrice")}}</v-flex>
        <v-flex  md2 text-md-left>{{$str("time")}}</v-flex>
        <v-flex  md1 text-md-left>{{$str("status")}} </v-flex>
        <v-flex  md1 text-md-right>{{$str("TradingPartners")}}</v-flex>
      </v-layout>
      <v-divider></v-divider>
    </div>
    <!--main list view-->
    <!-- user item list들 10개씩 출력-->
    <div v-for="(orderlist,index) in orderLists" :key="index">
      <my-order-list
              :orderlist="orderlist"
      ></my-order-list>
      <v-divider></v-divider>
    </div>
    <!-- pagination -->
    <Pagination></Pagination>

  </div>
</template>

<script>
    import ListFilter from '@/components/ListFilter.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import Pagination from '@/components/Pagination.vue';
    import MyOrderList from './MyOrderListItem/MyOrderList';
    export default {
        name: "MyOrder",
        components: {ListFilter, Pagination, MyOrderList,},
        data: () => ({
            orderLists: [
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time : '11:59:59',
                    status : 'assign',
                    partner : 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time : '11:59:59',
                    status : 'assign',
                    partner : 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time : '11:59:59',
                    status : 'assign',
                    partner : 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time : '11:59:59',
                    status : 'assign',
                    partner : 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time : '11:59:59',
                    status : 'assign',
                    partner : 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time : '11:59:59',
                    status : 'assign',
                    partner : 'haohao',
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