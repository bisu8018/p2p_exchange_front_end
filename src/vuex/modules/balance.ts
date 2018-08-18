import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    [VuexTypes.SET_BALANCE_DATA] (state: any, balance: any) {
        state.getBalance = balance;
    },
};


const actions = {
    [VuexTypes.SET_BALANCE_DATA] (context: any, balance: any) {
        context.commit(VuexTypes.SET_BALANCE_DATA, balance)
    },

};

const getters = {
};

let getBalance = '';

const state= {
    getBalance: getBalance,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}