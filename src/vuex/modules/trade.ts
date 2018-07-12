import {VuexTypes} from "@/vuex/config/VuexTypes";
import Trade from "@/vuex/model/Trade";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (trade: any, isOk: Trade[]) {
        trade.isOk = isOk
    },
};


const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (context: any, isOk: Trade[]) {
        context.commit(VuexTypes.SET_TRADEVIEW_DATA, isOk)
    },
};

const getters = {
};


const trade = {
    isOk: null
}

export default {
    namespaced: false,
    actions,
    getters,
    trade,
    mutations
}