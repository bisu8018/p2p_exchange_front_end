import {VuexTypes} from "@/vuex/config/VuexTypes";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeItem from "@/vuex/model/TradeItem";


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

    // // AMOUNT(LIMIT_MIN) 타입
    // [VuexTypes.SET_LIMITMIN_DATA] (context: any, limitMin: number) {
    //     state.limitMin = limitMin;
    // }
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

};

const getters = {
};

let tradeFilter = new TradeFilter('');  // array형 으로 초기화
let tradeItems : TradeItem[] = [];

const state= {

    tradeFilter: tradeFilter,
    tradeItems: tradeItems,

}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}