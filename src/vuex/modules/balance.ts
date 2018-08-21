import {VuexTypes} from "@/vuex/config/VuexTypes";
import Balance from '../model/Balance'


const mutations = {
    [VuexTypes.SET_BALANCE_DATA](state: any, data: any) {
        state.balanceList = [];
        for(let key in data) {
            state.balanceList.push(new Balance(data[key]));
        }
    },
};


const actions = {
    [VuexTypes.SET_BALANCE_DATA](context: any, data: any) {
        context.commit(VuexTypes.SET_BALANCE_DATA, data)
    },

};

const getters = {
};

let balanceList: Balance[] = [];

const state = {
    balanceList: balanceList,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}