import {VuexTypes} from "@/vuex/config/VuexTypes";
import Order from "@/vuex/model/Order";

const mutations = {
    [VuexTypes.SET_TRADE_PROCESS_DATA](state: any, tradeProcess: any) {
        state.getTradeProcess = tradeProcess;
    },

    [VuexTypes.SET_CURRENT_ORDER](state: any, data: any) {
        state.currentOrder = new Order(data);
    },
};


const actions = {
    [VuexTypes.SET_TRADE_PROCESS_DATA](context: any, tradeProcess: any) {
        context.commit(VuexTypes.SET_TRADE_PROCESS_DATA, tradeProcess)
    },

    [VuexTypes.SET_CURRENT_ORDER](context: any, data: any) {
        context.commit(VuexTypes.SET_CURRENT_ORDER, data)
    },
};

const getters = {
};

let currentOrder = new Order('');
let getTradeProcess = new Order('');

const state = {
    getTradeProcess: getTradeProcess,
    currentOrder: currentOrder,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}