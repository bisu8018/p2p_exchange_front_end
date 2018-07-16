import {VuexTypes} from "@/vuex/config/VuexTypes";
import Trade from "@/vuex/model/Trade";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (trade: any, tradeInfo: Trade[]) {
        console.log(3);
        trade.tradeInfo = tradeInfo;
    },
};


const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (context: any, tradeInfo: Trade[]) {
        console.log(2);
        context.commit(VuexTypes.SET_TRADEVIEW_DATA, tradeInfo)
    },
};

const getters = {
};

let tradeInfo : Trade[]  =  [];

const trade = {
    tradeInfo: tradeInfo
}

export default {
    namespaced: false,
    actions,
    getters,
    trade,
    mutations
}