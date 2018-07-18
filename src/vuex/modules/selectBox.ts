import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_COUNTRY_DATA](selectBox: any, country: string) {
        selectBox.getCountry = country;
    },
    [VuexTypes.SET_CURRENCY_DATA](selectBox: any, currency: string) {
        selectBox.getCurrency = currency;
    },
    [VuexTypes.SET_PAYMENET_DATA](selectBox: any, payment: string) {
        selectBox.getPayment = payment;
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
    [VuexTypes.SET_COUNTRY_DATA](store: any, country: string) {
        store.commit(VuexTypes.SET_COUNTRY_DATA, country);
    },
};

// const getters = {};


//Country Selectbox
let getCountry: string = 'ALL';
let getCurrency: string = 'CNY';
let getPayment: string = 'ALL';

const selectBox = {
    //Country Check
    getCountry: getCountry,
    getCurrency: getCurrency,
    getPayment: getPayment
};

export default {
    namespaced: false,
    actions,
    selectBox,
    mutations
}
