import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    [VuexTypes.SET_PAYMENT_METHOD] (state: any, paymentMethod: any) {
        state.getPaymentMethod = paymentMethod;
    },
};


const actions = {
    [VuexTypes.SET_PAYMENT_METHOD] (context: any, paymentMethod: any) {
        context.commit(VuexTypes.SET_PAYMENT_METHOD, paymentMethod)
    },

};

const getters = {
};

let getPaymentMethod = {
    alipay : '',
    wechat : '',
    bank : '',
};


const state= {
    getPaymentMethod: getPaymentMethod,
};


export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}