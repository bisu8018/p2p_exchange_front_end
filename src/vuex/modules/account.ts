import {VuexTypes} from "@/vuex/config/VuexTypes";
import Account from "@/vuex/model/Account";


const mutations = {
    // -                   현재 상태                             -
    //merchant 기본정보 받아오기
    [VuexTypes.SET_USER_INFO] (state: any, userInfo: Account[]) {
        state.MerchantInfo = userInfo;
    },
};


const actions = {
    // -                   현재 상태                             -

    // 페이지 리스트
    [VuexTypes.SET_USER_INFO] (context: any, userInfo: Account[]) {
        context.commit(VuexTypes.SET_USER_INFO, userInfo)
    },

};

const getters = {
};

let userInfo : Account[] = [];

const state= {
    UserInfo: userInfo,
};

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}