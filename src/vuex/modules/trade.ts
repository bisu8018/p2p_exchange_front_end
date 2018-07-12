import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (state: any, isOk: boolean) {
        trade.isOk = isOk
    },
};


const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_TRADEVIEW_DATA] (context: any, isOk: boolean) {
        context.commit(VuexTypes.SET_TRADEVIEW_DATA, isOk)
    },
};

const getters = {
};


const trade = {
    isOk: false
}

export default {
    namespaced: false,
    actions,
    getters,
    trade,
    mutations
}