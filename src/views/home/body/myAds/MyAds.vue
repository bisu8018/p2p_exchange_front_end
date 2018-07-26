<template>
    <div>
        <v-layout row wrap mt-5 mb-4a>
            <!--header-->
            <div class="text-xs-left h2 bold mb-4a">{{$str("MyAds")}}</div>
            <v-spacer></v-spacer>
            <v-flex md6 xs12>
                <my-ads-filter class="myOrderFilter"></my-ads-filter>
            </v-flex>
        </v-layout>
        <!--main list view-->
        <div v-if="adsLists.length > 0">
            <!--mobile 일때-->
            <span v-if="isMobile">
                <v-flex v-for="adslist in adsLists" xs12 mb-4>
                    <my-ads-list :adslist="adslist"></my-ads-list>
                </v-flex>
            </span>
            <span v-else>
            <!-- Web 일때-->
                <!-- 표의 header들 -->
                <v-layout mb-3>
                  <v-flex md1 text-md-left>{{$str("No")}}</v-flex>
                  <v-flex md2 text-md-left>{{$str("adsType")}}</v-flex>
                  <v-flex md1 text-md-left>{{$str("amount")}}</v-flex>
                  <v-flex md2 text-md-left>{{$str("limits")}}</v-flex>
                  <v-flex md1 text-md-left>{{$str("price")}}</v-flex>
                  <v-flex md2 text-md-left>{{$str("time")}}</v-flex>
                  <v-flex md3 text-md-right>{{$str("control")}}</v-flex>
                </v-layout>
                <v-divider></v-divider>
                <!-- user ad list들 10개씩 출력-->
                <v-flex v-for="(adslist,index) in adsLists" md12>
                  <my-ads-list
                          :adslist="adslist"
                  ></my-ads-list>
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
    import MainRepository from "../../../../vuex/MainRepository";
    import Pagination from '@/components/Pagination.vue';
    import MyAdsList from './myAdsListItem/MyAdsList';
    import MyAdsFilter from './myAdsListItem/MyAdsFilter';

    export default {
        name: "MyAds",
        components: {Pagination, MyAdsList, MyAdsFilter},
        data: () => ({
            adsLists: [
                {
                    no: '6517',
                    adType: 'ETH',
                    amount: 6,
                    limits: 224,
                    price: 44.0,
                    time: '11:59:59',
                    currency: 'CNY',
                    adsType: 'sell'

                },
                {
                    no: '6518',
                    adType: 'ETH',
                    amount: 2,
                    limits: 1000,
                    price: 44.0,
                    time: '11:59:59',
                    currency: 'CNY',
                    adsType: 'buy'
                },
                {
                    no: '6519',
                    adType: 'BTC',
                    amount: 0.1,
                    limits: 100,
                    price: 44.0,
                    time: '11:59:59',
                    currency: 'CNY',
                    adsType: 'sell'
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