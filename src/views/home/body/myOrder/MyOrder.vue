<template>
    <div>
        <v-layout row wrap mt-5 mb-5>
            <!--header-->
            <v-flex md6 xs12 text-xs-left class="title-2 mb-4a">{{$str("MyOrder")}}</v-flex>
            <v-flex md6 xs12>
                <my-order-filter class="myOrderFilter"></my-order-filter>
            </v-flex>
        </v-layout>
        <!--main list view-->
        <div>
            <!--mobile 일때-->
            <div v-if="isMobile">
                <v-flex v-for="orderlist in orderLists" :key="`i${user}`" xs12>
                    <my-order-list :orderlist="orderlist" ></my-order-list>
                    <v-divider></v-divider>
                </v-flex>
            </div>

            <!-- Web 일때-->
            <div v-else>
                <!-- 표의 header들 -->
                <v-layout mb-3>
                    <v-flex md1 text-md-left>{{$str("OrderNumber")}}</v-flex>
                    <v-flex md2 text-md-left>{{$str("TransactionType")}}</v-flex>
                    <v-flex md2 text-md-left>{{$str("NumberOfTransactions")}}</v-flex>
                    <v-flex md2 text-md-left>{{$str("TotalPrice")}}</v-flex>
                    <v-flex md1 text-md-left>{{$str("unitPrice")}}</v-flex>
                    <v-flex md2 text-md-left>{{$str("time")}}</v-flex>
                    <v-flex md1 text-md-left>{{$str("status")}}</v-flex>
                    <v-flex md1 text-md-right>{{$str("TradingPartners")}}</v-flex>
                </v-layout>
                <v-divider></v-divider>
                <!-- user item list들 10개씩 출력-->
                <v-flex v-for="(orderlist,index) in orderLists" :key="index" md12>
                    <my-order-list
                            :orderlist="orderlist"
                    ></my-order-list>
                    <v-divider></v-divider>
                </v-flex>
            </div>
            <!-- pagination -->
            <!--<Pagination></Pagination>-->
        </div>
    </div>
</template>

<script>
    import ListFilter from '@/components/ListFilter.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import Pagination from '@/components/Pagination.vue';
    import MyOrderList from './MyOrderListItem/MyOrderList';
    import MyOrderFilter from './MyOrderListItem/MyOrderFilter';

    export default {
        name: "MyOrder",
        components: {ListFilter, Pagination, MyOrderList, MyOrderFilter},
        data: () => ({
            orderLists: [
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time: '11:59:59',
                    status: 'assign',
                    partner: 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time: '11:59:59',
                    status: 'assign',
                    partner: 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time: '11:59:59',
                    status: 'assign',
                    partner: 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time: '11:59:59',
                    status: 'assign',
                    partner: 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time: '11:59:59',
                    status: 'assign',
                    partner: 'haohao',
                },
                {
                    orderNum: '6517',
                    exType: 119,
                    exNum: 66.0,
                    totalPrice: 224,
                    unitPrice: 44.0,
                    time: '11:59:59',
                    status: 'assign',
                    partner: 'haohao',
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
        methods: {}

    }
</script>

<style scoped>
</style>