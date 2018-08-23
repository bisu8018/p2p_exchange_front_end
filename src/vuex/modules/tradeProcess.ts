import {VuexTypes} from "@/vuex/config/VuexTypes";
import Order from "@/vuex/model/Order";

const mutations = {
    [VuexTypes.SET_CURRENT_ORDER](state: any, data: any) {
        state.currentOrder = new Order(data);
    },
    [VuexTypes.UPDATE_CURRENT_ORDER](state: any, data: any) {
        state.currentOrder.update(data);
    },
};


const actions = {
    [VuexTypes.SET_CURRENT_ORDER](context: any, data: any) {
        context.commit(VuexTypes.SET_CURRENT_ORDER, data)
    },
    [VuexTypes.UPDATE_CURRENT_ORDER](context: any, data: any) {
        context.commit(VuexTypes.UPDATE_CURRENT_ORDER, data)
    },
};

const getters = {
};

let currentOrder = new Order('');

const state = {
    currentOrder: currentOrder,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}