<template>
  <div>

    <!-- mobile 일때 -->
    <div v-if="isMobile">
      <v-flex  v-for="user in dataInfo" :key="`i${user}`"  xs12 style="height: 180px;" >
        <trade-list-item
                v-bind:name="user.email"
                v-bind:volumeTotal="user.volumeTotal"
                v-bind:limitMax="user.limitMax"
                v-bind:price="user.price"
                v-bind:dealMode="user.adType"
        ></trade-list-item>
        <v-divider></v-divider>
      </v-flex>
    </div>
    <!-- Web 일때 -->
    <div v-else>

      <!-- chart의 title들 -->
      <!-- md 이상에서만 binding-->
      <div class="gridBox mb-3" style=" display: flex;">
        <v-flex md3 text-md-left>Merchant(Volume | Trade rate)</v-flex>
        <v-flex md2 text-md-left>Volume</v-flex>
        <v-flex md2 text-md-left>Limits</v-flex>
        <v-flex md2 text-md-left>Price </v-flex>
        <v-flex md2 text-md-left>Payment Method </v-flex>
        <v-flex md1 text-md-right>Control</v-flex>

      </div>
      <v-divider></v-divider>

      <!-- user item list들 10개씩 출력-->
      <v-flex v-for="(user,index) in dataInfo" :key="index" md12 >
        <trade-list-item
                v-bind:name="user.email"
                v-bind:volumeTotal="user.volumeTotal"
                v-bind:limitMax="user.limitMax"
                v-bind:price="user.price"
                v-bind:dealMode="user.adType"
        ></trade-list-item>
        <v-divider></v-divider>
      </v-flex>
    </div>
    <!-- pagination -->
    <Pagination></Pagination>

  </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import TradeListItem from "./tradeListItem/TradeListItem"
    import Pagination from '@/components/Pagination.vue';

    export default Vue.extend({
        name: 'TradeCenterView',
        components:{TradeListItem, Pagination},
        data: () => ({

            page : 1,
            headers: [
                {
                    text: 'Merchant(Volume | Trade rate)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Volume', value: 'volume' },
                { text: 'Limits', value: 'limits' },
                { text: 'Price', value: 'price' },
                { text: 'Payment Method', value: 'paymentMethod' },
                { text: 'Control', align: 'right', value: 'control' }
            ],
            // users: [
            //     {
            //         name: 'Charles',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Dean',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Jack',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Jiny',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Jun',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Kay',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Kevin',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Max',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'BK',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Ryan',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'Tom',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            //     {
            //         name: 'AB',
            //         volumeTotal: 119,
            //         limitMax: 66.0,
            //         price: 224,
            //         dealMode: 44.0,
            //     },
            // ],
        }),
        created() {
            console.log("Created");
            MainRepository.TradeView.setSelectPage(0);
            console.log(MainRepository.TradeView.setSelectPage(0));
        },
        mounted() {

        },
        computed: {
            dataInfo(){
                console.log(MainRepository.TradeView.getSelectPage());
                return MainRepository.TradeView.getSelectPage();
            },
        },
        methods: {
        },

    });
</script>

<style scoped>
  .userList{
    display: flex;
    height: 90px;
  }
  .ctlButton{
      border-radius: 86px;
      color: white;
      height: 36px;
      width: 86px;
    }

</style>