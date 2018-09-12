import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_COUNTRY_DATA](state: any, country: string) {
        state.nationality = country;
    },
    [VuexTypes.SET_CURRENCY_DATA](state: any, currency: string) {
        state.currency = currency;
    },
    [VuexTypes.SET_PAYMENET_DATA](state: any, payment: string) {
        state.payment = payment;
    },
};

const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_COUNTRY_DATA](store: any, country: string) {
        store.commit(VuexTypes.SET_COUNTRY_DATA, country);
    },
    [VuexTypes.SET_CURRENCY_DATA](store: any, currency: string) {
        store.commit(VuexTypes.SET_CURRENCY_DATA, currency);
    },
    [VuexTypes.SET_PAYMENET_DATA](store: any, payment: string) {
        store.commit(VuexTypes.SET_PAYMENET_DATA, payment);
    },
};

const getters = {};


//Country Selectbox
let nationality: string = 'ALL';
let currency: string = 'CNY';
let payment: string = 'ALL';

const state = {
    nationality: nationality,
    currency: currency,
    payment: payment,
};

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}
