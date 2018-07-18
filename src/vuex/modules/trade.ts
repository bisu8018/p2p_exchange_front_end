import {VuexTypes} from "@/vuex/config/VuexTypes";
import Trade from "@/vuex/model/Trade";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (state: any, tradeTotalInfo: Trade[]) {
        state.tradeTotalInfo = tradeTotalInfo;
    },
    [VuexTypes.SET_SELECTTRADEVIEW_DATA] (state: any, tradeSelectInfo: Trade[]) {
        state.tradeSelectInfo = tradeSelectInfo;
    },
};


const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (context: any, tradeTotalInfo: Trade[]) {
        context.commit(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo)
    },
    [VuexTypes.SET_SELECTTRADEVIEW_DATA] (context: any, tradeSelectInfo: Trade[]) {
        context.commit(VuexTypes.SET_SELECTTRADEVIEW_DATA, tradeSelectInfo)
    },
};

const getters = {
};

let tradeTotalInfo : Trade[]  =  [];
let tradeSelectInfo : Trade[] = [];

const state= {
    tradeTotalInfo: tradeTotalInfo,
    tradeSelectInfo: tradeSelectInfo
}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}