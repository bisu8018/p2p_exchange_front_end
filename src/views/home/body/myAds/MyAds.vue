<template>
  <div>
    <v-layout row wrap mt-5>
      <!--header-->
      <v-flex md3 xs12>{{$str("MyAds")}}</v-flex>
      <v-flex md5 xs12></v-flex>
      <!--search filter 추가할것-->
      <v-flex md4 xs12><list-filter></list-filter></v-flex>
    </v-layout>
    <!--main list view-->
    <div>
      <!--mobile 일때-->
      <div v-if="isMobile">
        <v-flex  v-for="adslist in adsLists" :key="`i${adslist}`"  xs12 style="height: 180px;" >
          <my-ads-list
                  :adslist="adslist"
          ></my-ads-list>
          <v-divider></v-divider>
        </v-flex>
      </div>

      <!-- Web 일때-->
      <div v-else>
        <!-- 표의 header들 -->
        <v-layout mb-3>
          <v-flex  md1 text-md-left>{{$str("No")}}</v-flex>
          <v-flex  md2 text-md-left>{{$str("AdsType")}}</v-flex>
          <v-flex  md1 text-md-left>{{$str("amount")}}</v-flex>
          <v-flex  md2 text-md-left>{{$str("limits")}}</v-flex>
          <v-flex  md1 text-md-left>{{$str("price")}}</v-flex>
          <v-flex  md2 text-md-left>{{$str("time")}}</v-flex>
          <v-flex  md3 text-md-right>{{$str("control")}}</v-flex>
        </v-layout>
        <v-divider></v-divider>

        <!-- user ad list들 10개씩 출력-->
        <v-flex v-for="(adslist,index) in adsLists" :key="index" md12 >
          <my-ads-list
                  :adslist="adslist"
          ></my-ads-list>
          <v-divider></v-divider>
        </v-flex>
      </div>

      <!-- pagination -->
      <Pagination></Pagination>

    </div>
  </div>
</template>

<script>
    import ListFilter from '@/components/ListFilter.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import Pagination from '@/components/Pagination.vue';
    import MyAdsList from './MyAdsListItem/MyAdsList';

    export default {
        name: "MyAds",
        components: {ListFilter, Pagination, MyAdsList,},
        data: () => ({
            adsLists: [
                {
                    no: '6517',
                    adType: 119,
                    amount: 66.0,
                    limits: 224,
                    price: 44.0,
                    time : '11:59:59',
                },
                {
                    no: '6517',
                    adType: 119,
                    amount: 66.0,
                    limits: 224,
                    price: 44.0,
                    time : '11:59:59',
                },
                {
                    no: '6517',
                    adType: 119,
                    amount: 66.0,
                    limits: 224,
                    price: 44.0,
                    time : '11:59:59',
                },
                {
                    no: '6517',
                    adType: 119,
                    amount: 66.0,
                    limits: 224,
                    price: 44.0,
                    time : '11:59:59',
                },
                {
                    no: '6517',
                    adType: 119,
                    amount: 66.0,
                    limits: 224,
                    price: 44.0,
                    time : '11:59:59',
                },
                {
                    no: '6517',
                    adType: 119,
                    amount: 66.0,
                    limits: 224,
                    price: 44.0,
                    time : '11:59:59',
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