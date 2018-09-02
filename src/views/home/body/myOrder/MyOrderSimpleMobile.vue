<template>
    <div class="MyOrderSimpleMobile_wrapper">
        <div  v-bind:class="{'FixedBox' : isFixed}">
            <h3 >{{$str("Ongoing order")}}</h3>
            <i class="material-icons cancel-btn" v-if="isFixed" @click="onClose">close</i>
        </div>

        <v-divider />

        <div v-for="item in orderList">
            <my-order-simple-item
                    :data="item"
            />
            <v-divider />
        </div>

        <div @click="goMyOrder()" class="ta-right color-blue text-white-hover my-3 c-pointer">
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
            isFixed(){
                return MainRepository.MyOrder.controller().getMyOrderModalFixed();
            },
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
    .cancel-btn{
        float: right;
        margin-right: 20px;
        color: white;
    }
    .FixedBox{
        background-color: #002970;
        height: 100%;
        color: white;
    }
    .FixedBox h3{
        margin: 0px;
        font-size: 14px;
        font-weight: 400;
        padding: 22px 0px 22px 24px;
    }
</style>