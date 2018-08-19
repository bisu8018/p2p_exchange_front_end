import {VuexTypes} from "@/vuex/config/VuexTypes";
import MyAdsFilter from "@/vuex/model/MyAdsFilter";
import TradeItem from "@/vuex/model/TradeItem";
import Order from "@/vuex/model/Order";


const mutations = {
    // -                   현재 상태                             -
    ////////////////My Ads/////////////
    // 페이지 필터
    [VuexTypes.SET_MYADSFILTER_DATA] (state: any, myAdsFilter: MyAdsFilter[]) {
        state.myAdsFilter = myAdsFilter;
    },

    // 페이지 아이템 리스트
    [VuexTypes.SET_MYADSLIST_DATA] (state: any, myAdsItems: TradeItem[]) {
        state.myAdsItems = myAdsItems;
    },

    ////////////////My Orders/////////////
    // 페이지 아이템 리스트
    [VuexTypes.SET_MYORDERSLIST_DATA] (state: any, myOrderItems: Order[]) {
        state.myOrderItems = myOrderItems;
    },

};


const actions = {
    // -                   현재 상태                             -

    // 페이지 필터
    [VuexTypes.SET_MYADSFILTER_DATA] (context: any, myAdsFilter: MyAdsFilter) {
        context.commit(VuexTypes.SET_MYADSFILTER_DATA, myAdsFilter)
    },

    // 페이지 아이템 리스트
    [VuexTypes.SET_MYADSLIST_DATA] (context: any, myAdsItems: TradeItem[]) {
        context.commit(VuexTypes.SET_MYADSLIST_DATA, myAdsItems)
    },

    ////////////////My Orders/////////////
    // 페이지 아이템 리스트
    [VuexTypes.SET_MYORDERSLIST_DATA] (context: any, myOrderItems: Order[]) {
        context.commit(VuexTypes.SET_MYORDERSLIST_DATA, myOrderItems)
    },

};

const getters = {
};

let myAdsFilter = new MyAdsFilter('');  //
let myAdsItems : TradeItem[] = [];
let myOrderItems : Order[] = [];

const state= {
    myOrderItems : myOrderItems,
    myAdsFilter: myAdsFilter,
    myAdsItems: myAdsItems,

}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}