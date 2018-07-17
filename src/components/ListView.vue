<template>
    <div>
        <!-- Web 일때 -->
        <div v-if="$vuetify.breakpoint.mdAndUp">

            <!-- chart의 title들 -->
            <!-- md 이상에서만 binding-->
            <div class="div-gutter mb-3" style=" display: flex;">
                <v-flex md3 text-md-left>Merchant(Volume | Trade rate)</v-flex>
                <v-flex md2 text-md-left>Volume</v-flex>
                <v-flex md2 text-md-left>Limits</v-flex>
                <v-flex md2 text-md-left>Price </v-flex>
                <v-flex md2 text-md-left>Payment Method </v-flex>
                <v-flex md1 text-md-right>Control</v-flex>

            </div>
            <v-divider></v-divider>

            <!-- user item list들 10개씩 출력-->
            <v-flex v-for="(user,index) in users" :key="index" md12 >
                <list-user
                        v-bind:name="user.name"
                        v-bind:volumeTotal="user.volumeTotal"
                        v-bind:limitMax="user.limitMax"
                        v-bind:price="user.price"
                        v-bind:dealMode="user.dealMode"
                ></list-user>
                <v-divider></v-divider>
            </v-flex>
        </div>


        <!-- mobile 일때 -->
        <v-flex v-else v-for="user in users" :key="`i${user}`" xs12 style="height: 180px;" >
            <list-user
                    v-bind:name="user.name"
                    v-bind:volumeTotal="user.volumeTotal"
                    v-bind:limitMax="user.limitMax"
                    v-bind:price="user.price"
                    v-bind:dealMode="user.dealMode"
            ></list-user>
            <v-divider></v-divider>
        </v-flex>
        <!-- pagination -->
        <v-pagination v-model="page" :length="pages" ></v-pagination>

    </div>


</template>

<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../vuex/MainRepository";
    import ListUser from "./ListUser.vue"

    export default Vue.extend({
        name: 'listView',
        components:{ListUser},
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
            users: [
                {
                    name: 'Charles',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Dean',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Jack',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Jiny',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Jun',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Kay',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Kevin',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Max',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'BK',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Ryan',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Tom',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'AB',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    dealMode: 44.0,
                },
            ],


        }),
        created() {
            console.log("Created");
            MainRepository.TradeView.setTradeView();
            console.log(MainRepository.TradeView.setTradeView());
        },
        mounted() {

        },
        computed: {
            dataInfo(){
                 console.log(MainRepository.TradeView.getTradeView());
                 return MainRepository.TradeView.getTradeView();
            },
            pages () {
                //return 전체페이지수는 몇개인지.
                let usersnum = this.users.length;
                return Math.ceil(usersnum / 10);
            },
        },
        methods: {

            // dataTradeInfo() {
            //     MainRepository.TradeView.setTradeView();
            // },
            // testTradeInfo() {
            //     return MainRepository.TradeView.getTradeView();
            // }
        },

    });
</script>
<style>
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
