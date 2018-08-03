<template>
    <div>
        <!-- 상단의 list filter -->
        <trade-center-filter></trade-center-filter>
        <!--본 list들-->
        <div>
            <!-- mobile 일때 -->
            <div v-if="isMobile">
                <div  v-for="user in users"  >
                    <trade-list-item
                            :user="user"
                    ></trade-list-item>
                    <v-flex><v-divider></v-divider></v-flex>
                </div>
            </div>
            <!-- Web 일때 -->
            <div v-else>

                <!-- chart의 title들 -->
                <v-layout mb-3>
                    <v-flex  md3 text-md-left color-darkgray>
                        {{$str("Merchant(Volume | Trade rate)")}}
                    </v-flex>
                    <v-flex  md2 text-md-left color-darkgray>
                        {{$str("Available")}}
                    </v-flex>
                    <v-flex  md2 text-md-left color-darkgray>
                        {{$str("limits")}}
                    </v-flex>
                    <v-flex  md2 text-md-left color-darkgray>
                        {{$str("price")}}
                    </v-flex>
                    <v-flex  md2 text-md-left color-darkgray>
                        {{$str("paymentMethod")}}
                    </v-flex>
                    <v-flex  md1 text-md-right color-darkgray>
                        {{$str("control")}}
                    </v-flex>
                </v-layout>
                <v-flex><v-divider></v-divider></v-flex>

                <!-- user item list들 10개씩 출력-->
                <div v-for="user in users"  >
                    <trade-list-item
                            :user ="user"
                    ></trade-list-item>
                    <v-flex><v-divider></v-divider></v-flex>
                </div>
            </div>
            <!-- pagination -->
            <Pagination
                    :size="pageSize"
                    :type="type"
            ></Pagination>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import TradeListItem from "./tradeListItem/TradeListItem.vue"
    import TradeCenterFilter from './tradeListItem/TradeCenterFilter.vue';
    import Pagination from '@/components/Pagination.vue';


    export default Vue.extend({
        name: 'TradeCenter',
        props: ['message'],             // generalTrade와 blockTrade를 구분하기 위해
        components: {Pagination, TradeListItem, TradeCenterFilter},
        data: () => ({
            pageSize : 10,              //한 page에 몇개씩 item을 보여줄건가.
            type : "tradecenter",       //pagination을 위해.
            users: [
                {
                    email: 'Charles',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '',
                },
                {
                    email: 'Dean',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : false,
                    color : '#E05543',
                    rank : 2,
                    bank_account : '123',
                    wechat_id : '',
                    alipay_id : '789',
                },
                {
                    email: 'Jack',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : false,
                    color : '#E25422',
                    rank : 1,
                    bank_account : '',
                    wechat_id : '456',
                    alipay_id : '789',
                },
                {
                    email: 'Jiny',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#2799C9',
                    rank : 2,
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '789',
                },
                {
                    email: 'Jun',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#B0D63E',
                    rank : 3,
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '789',
                },
                {
                    email: 'Kay',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#394B50',
                    rank : 1,
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '789',
                },
                {
                    email: 'Kevin',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#BF4F79',
                    rank : 2,
                    bank_account : '123',
                    wechat_id : '',
                    alipay_id : '',
                },
                {
                    email: 'Max',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 3,
                    bank_account : '',
                    wechat_id : '',
                    alipay_id : '789',
                },
                {
                    email: 'BK',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                    bank_account : '123',
                    wechat_id : '',
                    alipay_id : '',
                },
                {
                    email: 'Ryan',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                    bank_account : '123',
                    wechat_id : '456',
                    alipay_id : '',
                },
                {
                    email: 'Tom',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                    bank_account : '123',
                    wechat_id : '',
                    alipay_id : '789',
                },
                {
                    email: 'AB',
                    volume: 119,
                    minLimit: 56.0,
                    maxLimit: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 2,
                    bank_account : '',
                    wechat_id : '456',
                    alipay_id : '789',
                },
            ],
        }),
        created() {
            if(this.message == "general"){
                MainRepository.TradeView.setSelectPage();
            }else {
                MainRepository.TradeView.setSelectPage();
            }
        },
        computed: {
            dataInfo(){
                console.log(MainRepository.TradeView.getSelectPage());
                return MainRepository.TradeView.getSelectPage();
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        methods: {

        }
    });
</script>

<style scoped>

</style>