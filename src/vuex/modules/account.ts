import {VuexTypes} from "@/vuex/config/VuexTypes";
import Account from "@/vuex/model/Account";
import PaymentMethod from "@/vuex/model/PaymentMethod";


const mutations = {
    [VuexTypes.SET_USER_INFO] (state: any, userInfo: Account) {
        state.userInfo = userInfo;
    },

    [VuexTypes.SET_MY_PAYMENT_METHOD] (state: any, myPaymentMethods: PaymentMethod[]) {
        state.myPaymentMethods = myPaymentMethods;
    },

};


const actions = {
    [VuexTypes.SET_USER_INFO] (context: any, userInfo: Account) {
        context.commit(VuexTypes.SET_USER_INFO, userInfo)
    },

    [VuexTypes.SET_MY_PAYMENT_METHOD] (context: any, myPaymentMethods: PaymentMethod[]) {
        context.commit(VuexTypes.SET_MY_PAYMENT_METHOD, myPaymentMethods)
    },

};

const getters = {
};

let userInfo : Account =  new Account('');
let myPaymentMethods: PaymentMethod[] = [];

const state= {
    userInfo: userInfo,
    myPaymentMethods: myPaymentMethods,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}