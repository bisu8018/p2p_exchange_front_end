<template>
    <div>
        <v-layout row wrap mt-5 mb-4a>
            <!--header-->
            <v-flex md2 xs12 class="text-xs-left h2 bold mb-4a">{{$str("MyAds")}}</v-flex>
            <v-spacer></v-spacer>
            <v-flex md10 xs12>
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

            <!-- Web 일때-->
            <div v-else>
                <!-- header -->
                 <v-layout mb-2 color-darkgray>
                  <v-flex md2 text-md-left>{{$str("orderNo")}}</v-flex>
                  <v-flex md1 text-md-left>{{$str("adsType")}}</v-flex>
                  <v-flex md1 text-md-left>{{$str("amount")}}</v-flex>
                  <v-flex md2 text-md-left>{{$str("limits")}}</v-flex>
                  <v-flex md1 text-md-left>{{$str("price")}}</v-flex>
                  <v-flex md2 text-md-left>{{$str("time")}}</v-flex>
                  <v-flex md3 text-md-right>{{$str("control")}}</v-flex>
                </v-layout>
                <v-flex><v-divider></v-divider></v-flex>
                <!-- user ad list들 10개씩 출력-->
                <div v-for="(adslist,index) in adsLists" >
                  <my-ads-list
                          :adslist="adslist"
                  ></my-ads-list>
                  <v-flex><v-divider></v-divider></v-flex>
                </div>
                <!-- pagination -->
                <!--<Pagination></Pagination>-->
             </div>
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
                    token: 'ETH',
                    amount: 6,
                    minLimit: 124,
                    maxLimit: 224,
                    price: 44.0,
                    time: '11:59:59',
                    currency: 'CNY',
                    adsType: 'sell'

                },
                {
                    no: '6518',
                    token: 'ETH',
                    amount: 2,
                    minLimit: 124,
                    maxLimit: 224,
                    price: 44.0,
                    time: '11:59:59',
                    currency: 'CNY',
                    adsType: 'buy'
                },
                {
                    no: '6519',
                    token: 'BTC',
                    amount: 0.1,
                    minLimit: 124,
                    maxLimit: 224,
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