<template>
    <div>
        <v-layout row wrap mt-5 mb-4a>
            <!--header-->
            <div class="text-xs-left h2 bold mb-4a">{{$str("MyOrder")}}</div>
            <v-spacer></v-spacer>
            <v-flex md10 xs12>
                <my-order-filter class="myOrderFilter"></my-order-filter>
            </v-flex>
        </v-layout>
        <!--main list view-->
        <div v-if="orderLists.length > 0">
            <!--mobile 일때-->
            <span v-if="isMobile">
                <v-flex v-for="orderlist in orderLists" xs12 mb-4>
                    <my-order-list :orderlist="orderlist"></my-order-list>
                    <v-divider></v-divider>
                </v-flex>
            </span>
            <span v-else>
            <!-- Web 일때-->
                <!-- 표의 header들 -->
                <v-layout mb-2 color-darkgray>
                    <v-flex md1 text-md-left>{{$str("orderNo")}}</v-flex>
                    <v-flex md2 text-md-left>{{$str("orderType")}}</v-flex>
                    <v-flex md1 text-md-left>{{$str("volumeText")}}</v-flex>
                    <v-flex md2 text-md-left>{{$str("TotalPrice")}}</v-flex>
                    <v-flex md1 text-md-left>{{$str("price")}}</v-flex>
                    <v-flex md3 text-md-left>{{$str("time")}}</v-flex>
                    <v-flex md1 text-md-left>{{$str("status")}}</v-flex>
                    <v-flex md1 text-md-right>{{$str("counterparty")}}</v-flex>
                </v-layout>
                <v-divider></v-divider>
                <!-- user item list들 10개씩 출력-->
                <v-flex v-for="(orderlist) in orderLists" >
                    <my-order-list
                            :orderlist="orderlist"
                    ></my-order-list>
                    <v-divider></v-divider>
                </v-flex>
                <!-- pagination -->
                <!--<Pagination></Pagination>-->
            </span>
        </div>
        <div v-else>
            <div class="mb-2"><img src="@/assets/img/no_data.png"></div>
            <div class="color-gray bold">{{$str("noOrders")}}</div>
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
                    exType: 'ETH',
                    exNum: 66.0,
                    totalPrice: 224,
                    price: 44.0,
                    time: '11:59:59',
                    status: 'Complete',
                    partner: 'haohao',
                    currency: 'CNY',
                    tradeType : 'sell'
                },
                {
                    orderNum: '6517',
                    exType: 'ETH',
                    exNum: 66.0,
                    totalPrice: 224,
                    price: 44.0,
                    time: '11:59:59',
                    status: 'Complete',
                    partner: 'haohao',
                    currency: 'CNY',
                    tradeType : 'sell'
                },
                {
                    orderNum: '6517',
                    exType: 'ETH',
                    exNum: 66.0,
                    totalPrice: 224,
                    price: 44.0,
                    time: '11:59:59',
                    status: 'Complete',
                    partner: 'haohao',
                    currency: 'CNY',
                    tradeType : 'buy'
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

    }
</script>

<style scoped>
</style>