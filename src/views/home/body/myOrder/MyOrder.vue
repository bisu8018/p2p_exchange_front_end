<template>
    <div>
        <v-layout row wrap mt-5 class="web-margin-bottom">
            <!--header-->
            <v-flex mt-2 xs12 md6 class="text-xs-left h2 bold mb-4a">{{$str("MyOrder")}}</v-flex>
            <v-flex xs12 md6 mb-3>
                <my-order-filter></my-order-filter>
            </v-flex>
        </v-layout>
        <div v-if="!isMobile">
            <v-layout mb-2 color-darkgray row wrap>
                <v-flex md2 text-md-left>{{$str("orderNo")}}</v-flex>
                <v-flex md2 text-md-left>{{$str("orderType")}}</v-flex>
                <v-flex md2 text-md-left>{{$str("amount")}}</v-flex>
                <v-flex md2 text-md-left>{{$str("price")}}</v-flex>
                <v-flex md2 text-md-left>
                    <span class="ml-3">{{$str("time")}}</span>
                </v-flex>
                <v-flex md2>
                    <v-layout justify-space-between>
                        <span>{{$str("status")}}</span>
                        <span>{{$str("counterparty")}}</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-flex><div class="divider"></div></v-flex>
        </div>
        <v-progress-circular v-if="showProgress" indeterminate class="color-blue list_progress"/>
        <!--main list view-->
        <div v-if="haveItems&& !showProgress">
            <!-- user item list들 10개씩 출력-->
            <div v-for="orderlist in OrderLists" >
                <my-order-list-item
                        :orderlist="orderlist"
                ></my-order-list-item>
                <v-flex><div class="divider"></div></v-flex>
            </div>
            <!-- pagination -->
            <Pagination class="pagination-top-margin"
                        :size="pageSize"
                        :type="pageType"
            ></Pagination>
        </div>
        <!-- 해당되는 item이 1개도 없을때-->
        <div v-else-if="!showProgress">
            <div class="sprite-img ic-no-ad-lg no-more-ads">
            </div>
            <div class="color-gray no-more-ads-text">
                {{$str("No more orders")}}
            </div>
        </div>

    </div>
</template>

<script>
    import ListFilter from '@/components/ListFilter.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import Pagination from '@/components/Pagination.vue';
    import MyOrderListItem from './item/MyOrderListItem';
    import MyOrderFilter from './item/filter/MyOrderFilter';
    import {abUtils} from '@/common/utils';

    export default {
        name: "MyOrder",
        components: {ListFilter, Pagination, MyOrderListItem, MyOrderFilter},
        data: () => ({
            pageSize : 10,
            pageType : 'MyOrder',
            showProgress : false,
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            haveItems(){
                return (MainRepository.Pagination.getTotalCount() >0)
            },
            OrderLists() {
                return MainRepository.MyOrder.getPage();
            }
        },
        created() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }
            MainRepository.MyOrder.initPage();

            this.showProgress = true
            MainRepository.MyOrder.load(() => {
                this.showProgress = false;
            })
        },
        mounted() {

        },
        beforeDestroy(){
            MainRepository.MyOrder.initData()
        },

        methods:{

        },


    }
</script>

<style scoped>
    /*web 일때*/
    @media only screen and (min-width: 960px) {
        .no-more-ads{
            margin: 120px auto 16px auto;
        }
        .no-more-ads-text{
            margin-bottom: 56px;
        }
        .pagination-top-margin{
            margin-top : 48px;
        }
      .web-margin-bottom{
        margin-bottom: 16px;
      }
    }
    /*mobile 일때*/
    @media only screen and (max-width: 959px) {
        .no-more-ads{
            margin: 48px auto 16px auto;
        }
        .pagination-top-margin{
            margin-top : 32px;
        }
    }

    .list_progress {
        margin-top: 80px;
    }
</style>