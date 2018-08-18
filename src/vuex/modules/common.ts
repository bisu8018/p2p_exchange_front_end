import {VuexTypes} from "@/vuex/config/VuexTypes";
import PaymentMethod from "@/vuex/model/PaymentMethod";


const mutations = {
    [VuexTypes.SET_PAYMENT_METHOD] (state: any, paymentMethod: PaymentMethod[]) {
        state.getPaymentMethod = paymentMethod;
    },
};


const actions = {
    [VuexTypes.SET_PAYMENT_METHOD] (context: any, paymentMethod: PaymentMethod[]) {
        context.commit(VuexTypes.SET_PAYMENT_METHOD, paymentMethod)
    },

};

const getters = {
};

let getPaymentMethod: PaymentMethod[] = [];

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