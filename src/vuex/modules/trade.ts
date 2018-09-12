import {VuexTypes} from "@/vuex/config/VuexTypes";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeItem from "@/vuex/model/TradeItem";
import CustomToken from "@/vuex/model/CustomToken";


const mutations = {
    // -                   현재 상태                             -
    // 페이지 필터
    [VuexTypes.SET_SELECTTRADEFILTER_DATA] (state: any, tradeFilter: TradeFilter[]) {
        state.tradeFilter = tradeFilter;
    },
    // 바뀐부분만 update
    [VuexTypes.UPDATE_SELECTTRADEVIEW_DATA] (state: any, data: object) {
        state.tradeFilter.update(data);
    },
    // 페이지 아이템 리스트
    [VuexTypes.SET_TRADEITEMS_DATA] (state: any, tradeItems: TradeItem[]) {
        state.tradeItems = tradeItems;
    },
    //drawer로 하나씩만 보여주기 위한 data
    [VuexTypes.SET_DRAWER_DATA] (state: any, drawerID: number) {
        state.drawerID = drawerID;
    },
    // Custom Token List
    [VuexTypes.SET_CUSTOMTRADETOKEN_LIST] (state: any, customTokenList: CustomToken[]) {
        state.customTokenList = customTokenList;
    },


};


const actions = {
    // -                   현재 상태                             -

    // 페이지 필터
    [VuexTypes.SET_SELECTTRADEFILTER_DATA] (context: any, tradeFilter: TradeFilter) {
        context.commit(VuexTypes.SET_SELECTTRADEFILTER_DATA, tradeFilter)
    },
    // 페이지 필터 바뀐부분만 update
    [VuexTypes.UPDATE_SELECTTRADEVIEW_DATA] (context: any, data: object) {
        context.commit(VuexTypes.UPDATE_SELECTTRADEVIEW_DATA, data)
    },
    // 페이지 아이템 리스트
    [VuexTypes.SET_TRADEITEMS_DATA] (context: any, tradeItems: TradeItem[]) {
        context.commit(VuexTypes.SET_TRADEITEMS_DATA, tradeItems)
    },
    //drawer를 하나씩만 보여주기 위한 data
    [VuexTypes.SET_DRAWER_DATA] (context: any, drawerID: number) {
        context.commit(VuexTypes.SET_DRAWER_DATA, drawerID)
    },
    //custom Token 리스트
    [VuexTypes.SET_CUSTOMTRADETOKEN_LIST] (context: any, customTokenList: CustomToken[]) {
        context.commit(VuexTypes.SET_CUSTOMTRADETOKEN_LIST, customTokenList)
    },

};

const getters = {
};

let tradeFilter = new TradeFilter('');  // array형 으로 초기화
let tradeItems : TradeItem[] = [];
let drawerID : Number = 0;
let customTokenList : CustomToken[] = [];

const state= {

    tradeFilter: tradeFilter,
    tradeItems: tradeItems,
    drawerID : drawerID,
    customTokenList : customTokenList,

}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}