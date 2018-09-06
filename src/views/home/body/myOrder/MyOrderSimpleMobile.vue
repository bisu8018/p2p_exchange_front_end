<template>
    <div class="MyOrderSimpleMobile_wrapper">

        <h3 class="medium">{{$str("Ongoing order")}}</h3>
        <v-divider />
        <div v-if="haveItems">
            <div v-for="item in orderList">
                <my-order-simple-item
                        :data="item"
                />
                <v-divider />
            </div>
        </div>
        <div v-else>
            <div class="sprite-img ic-no-ad-lg no-more-ads">
            </div>
            <div class="color-gray no-more-ads-text">
                {{$str("No more orders")}}
            </div>
            <v-divider />
        </div>
        <div @click="goMyOrder()" class="ta-right color-blue-active my-3 c-pointer">
            {{$str("View All")}}
        </div>
    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import MyOrder from "./MyOrder";
    import MyOrderSimpleItem from "./MyOrderListItem/MyOrderSimpleItem";
    export default {
        components: {
            MyOrderSimpleItem,
            MyOrder},
        name: "myOrderSimpleMobile",
        computed: {
            orderList() {
                return MainRepository.MyOrder.controller().getMyOrderAlarmItems();
            },
            haveItems(){
                return this.orderList.length >0;
            }
        },
        methods: {
            goMyOrder() {
                this.$router.push("/myOrder");
            },
        }
    }
</script>

<style scoped>
    .MyOrderSimpleMobile_wrapper {
        padding: 0 3px;
        text-align: left;
    }

    .MyOrderSimpleMobile_wrapper h3 {
        font-size: 22px;
        font-weight: bold;
        line-height: 1.0;
        letter-spacing: 0;
        margin: 48px 0 32px;
    }
    .no-more-ads{
        margin: 48px auto 16px auto;
    }
    .no-more-ads-text{
        text-align: center;
        margin-bottom: 56px;
    }
</style>