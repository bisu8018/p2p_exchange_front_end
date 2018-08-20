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

      <div v-if="!isMobile">
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
      </div>
        <!--main list view-->
        <div v-if="haveItems">
            <div>
                <!-- user ad list들 10개씩 출력-->
                <div v-for="adslist in AdsLists" >
                  <my-ads-list
                          :adslist="adslist"
                  ></my-ads-list>
                  <v-flex><v-divider></v-divider></v-flex>
                </div>
                <!-- pagination -->
              <Pagination class="pagination-top-margin"
                      :size="pageSize"
                      :type="pageType"
              ></Pagination>
             </div>
        </div>
        <!-- 해당되는 item이 1개도 없을때-->
        <div v-else>
          <div class="sprite-img ic-no-ad-lg no-more-ads">
          </div>
          <div class="color-gray no-more-ads-text">
            {{$str("No more ads")}}
          </div>
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
            pageSize : 10,
            pageType : "myAds",
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            haveItems(){
                //return (MainRepository.Pagination.getTotalCount() >0)
                return true;
            },
            AdsLists() {
                return MainRepository.MyAds.getPage();
            }

        },
        methods: {},
        created() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.Login.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }
            MainRepository.MyAds.initPage();


        },
        beforeDestroy(){
            MainRepository.MyAds.initData()
        }



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
</style>