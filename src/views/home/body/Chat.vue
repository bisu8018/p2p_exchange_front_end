<template>
    <div class="chat-wrapper">
        <v-layout  class="header-box" align-center>
            <i class="material-icons cancel-btn " @click="clickCancel">close</i>
            <v-spacer></v-spacer>
            <h5>AllB {{$str("Chat")}}</h5>
            <v-spacer></v-spacer>
            <i class="material-icons cancel-btn " @click="clickCancel">close</i>
        </v-layout>
        <v-divider />

        <div class="scroll-space">

        </div>
        <div @click="goMyOrder()" class="css-view-all text-white-hover py-3 pr-3">
            {{$str("View All")}}
        </div>
    </div>
</template>

<script>
    import MainRepository from "../../../vuex/MainRepository";
    import MyOrderSimpleItem from "./myOrder/MyOrderListItem/MyOrderSimpleItem";
    export default {
        name: "Chat",
        components: {
            MyOrderSimpleItem
        },
        computed: {
        },
        methods: {
            clickCancel(){
                MainRepository.MyOrder.controller().setMyOrderModalFixed(false);
            },
        }

    }
</script>

<style scoped>
    .chat-wrapper {
        position: relative;
        background-color: #ffffff;
        height: 100%;
        text-align: left;
        width: 100%;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    }

    .cancel-btn{
        margin-right: 20px;
        color: white;
        cursor: pointer;
    }
    .header-box{
        display: flex;
        background-color: #002970;
        height: 64px;
        padding: 22px 0px 22px 24px;
        color: white;
        border-left: #334B99 1px solid;
    }
    .scroll-space {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        position: relative;
        background-color: #ffffff;
        height: calc(100% - 53px);
    }
    .css-view-all{
        text-align: right;
        color: #214ea1;
        cursor: pointer;
        background-color: #ffffff;
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: solid 1px #d1d1d1;
    }
</style>