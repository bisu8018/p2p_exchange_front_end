import {VuexTypes} from "@/vuex/config/VuexTypes";
import Order from "@/vuex/model/Order";

const mutations = {
    [VuexTypes.SET_TRADE_PROCESS_DATA](state: any, tradeProcess: any) {
        state.getTradeProcess = tradeProcess;
    },
};


const actions = {
    [VuexTypes.SET_TRADE_PROCESS_DATA](context: any, tradeProcess: any) {
        context.commit(VuexTypes.SET_TRADE_PROCESS_DATA, tradeProcess)
    },

};

const getters = {
};

let getTradeProcess = new Order('');

const state = {
    getTradeProcess: getTradeProcess,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}