<template>
  <div class="MyOrderSimpleMobile_wrapper">
    <v-layout  class="header-box" align-center>
      <h5>{{$str("Ongoing order")}}</h5>
      <v-spacer></v-spacer>
      <i class="material-icons cancel-btn " @click="clickCancel">close</i>
    </v-layout>

    <v-divider />
  <div class="scroll-space">
      <div v-for="item in orderList">
        <my-order-simple-item
                :data="item"
        />
        <v-divider />
      </div>
  </div>
    <div @click="goMyOrder()" class="css-view-all text-white-hover py-3 ">
      {{$str("View All")}}
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../vuex/MainRepository";
    import MyOrderSimpleItem from "./myOrder/MyOrderListItem/MyOrderSimpleItem";
    export default {
        name: "MyOrderFixed",
        components: {
            MyOrderSimpleItem
        },
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
            clickCancel(){
                MainRepository.MyOrder.controller().setMyOrderModalFixed(false);
            },
        }

    }
</script>

<style scoped>
  .MyOrderSimpleMobile_wrapper {
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