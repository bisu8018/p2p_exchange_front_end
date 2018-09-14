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
    [VuexTypes.SET_CUSTOM_TOKEN_DATA](state: any, customToken: string) {
        state.customToken = customToken;
    },
    [VuexTypes.SET_GENERAL_TOKEN_DATA](state: any, generalToken: string) {
        state.customToken = generalToken;
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
    [VuexTypes.SET_CUSTOM_TOKEN_DATA](store: any, customToken: number) {
        store.commit(VuexTypes.SET_CUSTOM_TOKEN_DATA, customToken);
    },
    [VuexTypes.SET_GENERAL_TOKEN_DATA](store: any, generalToken: number) {
        store.commit(VuexTypes.SET_GENERAL_TOKEN_DATA, generalToken);
    },
};

const getters = {};


//Country Selectbox
let nationality: string = 'ALL';
let currency: string = 'CNY';
let payment: string = 'ALL';
let customToken: number = 0;
let generalToken: number = 0;

const state = {
    nationality: nationality,
    currency: currency,
    payment: payment,
    customToken: customToken,
    generalToken: generalToken
};

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}
