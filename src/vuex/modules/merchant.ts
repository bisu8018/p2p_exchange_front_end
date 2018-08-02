import {VuexTypes} from "@/vuex/config/VuexTypes";
import Merchant from "@/vuex/model/Merchant";


const mutations = {
    // -                   현재 상태                             -
    //merchant 기본정보 받아오기
    [VuexTypes.SET_MERCHANT_DATA] (state: any, MerchantInfo: Merchant[]) {
        state.MerchantInfo = MerchantInfo;
    },
};


const actions = {
    // -                   현재 상태                             -

    // 페이지 리스트
    [VuexTypes.SET_MERCHANT_DATA] (context: any, MerchantInfo: Merchant[]) {
        context.commit(VuexTypes.SET_MERCHANT_DATA, MerchantInfo)
    },

};

const getters = {
};

let MerchantInfo : Merchant[] = [];

const state= {
    MerchantInfo: MerchantInfo,
}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}