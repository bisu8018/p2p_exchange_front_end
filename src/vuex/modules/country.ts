import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_COUNTRY_DATA](state: any, country: string) {
        state.getCountry = country;
    },
};

const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.SET_COUNTRY_DATA](store: any, country: string) {
        store.commit(VuexTypes.SET_COUNTRY_DATA, country);
    },
};

// const getters = {};


//Country Selectbox
let getCountry: string = 'ALL';

const country = {
    //Country Check
    getCountry: getCountry
};

export default {
    namespaced: false,
    actions,
    country,
    mutations
}
