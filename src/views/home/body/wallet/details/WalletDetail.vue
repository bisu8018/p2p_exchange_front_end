<template>
<div>


  <v-layout row wrap mt-4a mb-3>
    <!--Detail header-->
    <v-flex md8 xs12 text-xs-left mb-4>
      <h3 class="bold">{{$str("Details")}}</h3>
    </v-flex>

    <!--search filter -->
    <v-flex md4 xs12 p-relative mb-2>
      <wallet-detaill-filter></wallet-detaill-filter>
    </v-flex>
  </v-layout>



  <!-- Web 일때-->
  <div v-if="!isMobile">
    <!-- 표의 header들은 Web일때만 보여짐 -->
    <v-layout mb-3 color-darkgray>
      <v-flex  md2 text-md-left>{{$str("Type")}}</v-flex>
      <v-flex  md2 text-md-left>{{$str("cryptoCurrency")}}</v-flex>
      <v-flex  md2 text-md-left>{{$str("time")}}</v-flex>
      <v-flex  md2 text-md-right>{{$str("amount")}}</v-flex>
      <v-flex  md2 text-md-right>{{$str("status")}}</v-flex>
      <v-flex  md2 text-md-right>{{$str("action")}}</v-flex>
    </v-layout>
    <v-flex><v-divider></v-divider></v-flex>
  </div>
  <v-progress-circular v-if="showProgress" indeterminate class="color-blue list_progress"/>



  <!-- detailList -->
  <div v-if="haveItems&& !showProgress">
    <div  v-for="detailList in detailLists" >
      <wallet-detail-list-item
              :detailList="detailList"
      ></wallet-detail-list-item>
      <v-flex><div class="divider"></div></v-flex>
    </div>
    <div class="mt-4">
      <Pagination
              :size="pageSize"
              :type="pageType"
      ></Pagination>
    </div>
  </div>



  <!-- 해당되는 item이 1개도 없을때-->
  <div v-else-if="!showProgress">
    <div class="sprite-img ic-no-ad-lg no-more-ads">
    </div>
    <div class="color-gray no-more-ads-text">
      {{$str("No more history")}}
    </div>
  </div>
</div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue';
    import ListFilter from '@/components/ListFilter.vue';
    import WalletDetailListItem from "./item/WalletDetailListItem"
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abUtils} from "../../../../../common/utils";
    import WalletDetaillFilter from "./item/filter/WalletDetailFilter.vue"

    export default {
        name: "WalletDetail",
        components: {
            Pagination,
            ListFilter,
            WalletDetailListItem,
            WalletDetaillFilter
        },
        data: () => ({
            pageSize: 8,
            pageType: 'wallet',
            showProgress : false,
            isAmout : true,
            walletInterval: {},
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            detailLists(){
                return MainRepository.Wallet.getWalletHistories();
            },
            haveItems(){
                return (MainRepository.Pagination.getTotalCount() >0)
            },
        },
        created(){
            MainRepository.Wallet.initHistory();
            this.showProgress = true;

            let urlParam = this.getUrlParam();
            //tokenlist에서 넘어올때
            if (urlParam !== '') {
                MainRepository.Wallet.updateHistoryPage({
                    tokenNo : urlParam[0] || '',
                    cryptocurrencyType : urlParam[1] || ''
                });
            }

            MainRepository.MarketPrice.load(() => {
                MainRepository.Wallet.loadHistory(() => {
                    this.showProgress = false;
                });
            });

            // 5초에 1번씩 불러옴
            this.walletInterval = setInterval(() => {
                MainRepository.MarketPrice.load(() => {
                    MainRepository.Wallet.loadHistory(() => {});
                });
            }, 5000);
        },
        beforeDestroy(){
            MainRepository.Wallet.initHistoryData();
            clearInterval(this.walletInterval);
        },
        methods:{
            getUrlParam() {
                let currentURL = window.location.href;
                let params = currentURL.split('?');
                params = params[1].split('&');      //params[0] = tokenNo,   params[1] = cryptocurrencyType

                if (params) {
                    return params;
                } else {
                    return '';
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
        }



    }
</script>

<style scoped>
  /* mobile 에서*/
  @media only screen and (max-width: 959px) {
    .cardModalMobile {
      width: 100%;
      left: 0%;
    }
    .no-more-ads{
      margin: 48px auto 16px auto;
    }

  }

  /* 웹에서*/
  @media only screen and (min-width: 960px) {
    .no-more-ads{
      margin: 120px auto 16px auto;
    }
    .no-more-ads-text{
      margin-bottom: 56px;
    }
  }
  .list_progress {
    margin-top: 80px;
  }
</style>