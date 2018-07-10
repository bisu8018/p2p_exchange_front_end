import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_MOBILE_STATUS] (state: any, isOk: boolean) {
        state.isOk = isOk
    },
    ["Test"] (state: any, userName: string) {
        state.test = userName
    },
};


const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_MOBILE_STATUS] (context: any, userName: string) {
        context.commit(VuexTypes.SET_MOBILE_STATUS, userName)
    },
    ["Test"] (context: any, userName: string) {
        context.commit("Test", userName)
    },
};

const getters = {
};

let test: string = "";


const state = {
    isOk: false,
    test: test,
}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}
