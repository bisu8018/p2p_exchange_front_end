import {VuexTypes} from "@/vuex/config/VuexTypes";
import Merchant from "@/vuex/model/Merchant";


const mutations = {
    [VuexTypes.SET_MERCHANT_DATA] (state: any, data: any) {
        state.merchant = new Merchant(data);
    },
};


const actions = {
    [VuexTypes.SET_MERCHANT_DATA] (context: any, data: any) {
        context.commit(VuexTypes.SET_MERCHANT_DATA, data)
    },
};

const getters = {
};

let merchant : Merchant = new Merchant('');

const state= {
    merchant: merchant,
}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}