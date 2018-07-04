import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_SAMPLE_DATA] (state: any, isOk: boolean) {
      state.isOk = isOk
    },
};


const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_SAMPLE_DATA] (context: any, isOk: boolean) {
      context.commit(VuexTypes.SET_SAMPLE_DATA, isOk)
    },
};

const getters = {
};


const state = {
    isOk: false
}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}
