import {VuexTypes} from "@/vuex/config/VuexTypes";
import Balance from '../model/Balance'
import Withdraw from "@/vuex/model/Withdraw";


const mutations = {
    [VuexTypes.SET_BALANCE_DATA](state: any, data: any) {
        state.balanceList = [];
        for(let key in data) {
            state.balanceList.push(new Balance(data[key]));
        }
    },
    [VuexTypes.SET_WITHDRAW_DATA] (state: any, withdraw: Withdraw) {
        state.withdraw = withdraw;
    },
};


const actions = {
    [VuexTypes.SET_BALANCE_DATA](context: any, data: any) {
        context.commit(VuexTypes.SET_BALANCE_DATA, data)
    },
    [VuexTypes.SET_WITHDRAW_DATA](context: any, withdraw: Withdraw) {
        context.commit(VuexTypes.SET_WITHDRAW_DATA, withdraw)
    },

};

const getters = {
};

let balanceList: Balance[] = [];
let withdraw = new Withdraw('');

const state = {
    balanceList: balanceList,
    withdraw : withdraw,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}