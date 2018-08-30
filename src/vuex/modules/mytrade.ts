import {VuexTypes} from "@/vuex/config/VuexTypes";
import MyTradeFilter from "@/vuex/model/MyTradeFilter";
import TradeItem from "@/vuex/model/TradeItem";
import Order from "@/vuex/model/Order";


const mutations = {
    // -                   현재 상태                             -
    ////////////////My Ads/////////////
    // 페이지 아이템 리스트
    [VuexTypes.SET_MYADSLIST_DATA] (state: any, myAdsItems: TradeItem[]) {
        state.myAdsItems = myAdsItems;
    },
    // 페이지 필터
    [VuexTypes.SET_MYADSFILTER_DATA] (state: any, myAdsFilter: any) {
        state.myAdsFilter = myAdsFilter;
    },
    [VuexTypes.UPDATE_MYADSFILTER_DATA] (state: any, data: any) {
        state.myAdsFilter.update(data);
    },

    ////////////////My Orders/////////////
    // 페이지 아이템 리스트
    [VuexTypes.SET_MYORDERSLIST_DATA] (state: any, myOrderItems: Order[]) {
        state.myOrderItems = myOrderItems;
    },
    //페이지 필터
    [VuexTypes.SET_MYORDERFILTER_DATA] (state: any, myOrderFilter: any) {
        state.myOrderFilter = myOrderFilter;
    },
    [VuexTypes.UPDATE_MYORDERFILTER_DATA] (state: any, data: any) {
        state.myOrderFilter.update(data);
    },
    // 페이지 아이템 리스트
    [VuexTypes.SET_MY_ORDER_AlARM_LIST] (state: any, myOrderItems: Order[]) {
        state.myOrderAlarmItems = myOrderItems;
    },

};


const actions = {
    // -                   현재 상태                             -
    ////////////////My Ads/////////////
    // 페이지 아이템 리스트
    [VuexTypes.SET_MYADSLIST_DATA] (context: any, myAdsItems: TradeItem[]) {
        context.commit(VuexTypes.SET_MYADSLIST_DATA, myAdsItems)
    },
    // 페이지 필터
    [VuexTypes.SET_MYADSFILTER_DATA] (context: any, myAdsFilter: MyTradeFilter) {
        context.commit(VuexTypes.SET_MYADSFILTER_DATA, myAdsFilter)
    },
    [VuexTypes.UPDATE_MYADSFILTER_DATA] (context: any, data: object) {
        context.commit(VuexTypes.UPDATE_MYADSFILTER_DATA, data)
    },
    

    ////////////////My Orders/////////////
    // 페이지 아이템 리스트
    [VuexTypes.SET_MYORDERSLIST_DATA] (context: any, myOrderItems: Order[]) {
        context.commit(VuexTypes.SET_MYORDERSLIST_DATA, myOrderItems)
    },
    [VuexTypes.SET_MYORDERFILTER_DATA] (context: any, myOrderFilter: MyTradeFilter) {
        context.commit(VuexTypes.SET_MYORDERFILTER_DATA, myOrderFilter)
    },
    [VuexTypes.UPDATE_MYORDERFILTER_DATA] (context: any, data: object) {
        context.commit(VuexTypes.UPDATE_MYORDERFILTER_DATA, data)
    },
    [VuexTypes.SET_MY_ORDER_AlARM_LIST] (context: any, myOrderItems: Order[]) {
        context.commit(VuexTypes.SET_MY_ORDER_AlARM_LIST, myOrderItems)
    },

};

const getters = {
};

let myOrderFilter = new MyTradeFilter('');
let myAdsFilter = new MyTradeFilter('');  
let myAdsItems : TradeItem[] = [];
let myOrderItems : Order[] = [];
let myOrderAlarmItems : Order[] = [];


const state= {
    myOrderItems : myOrderItems,
    myOrderFilter: myOrderFilter,
    myAdsItems: myAdsItems,
    myAdsFilter: myAdsFilter,
    myOrderAlarmItems: myOrderAlarmItems,
}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}