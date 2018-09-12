import {VuexTypes} from "@/vuex/config/VuexTypes";
import CustomToken from "@/vuex/model/CustomToken";


const mutations = {
    [VuexTypes.SET_MY_TOKEN] (state: any, tokenInfo: CustomToken) {
        state.tokenInfo = tokenInfo;
    },
};


const actions = {
    [VuexTypes.SET_MY_TOKEN] (context: any, tokenInfo: CustomToken) {
        context.commit(VuexTypes.SET_MY_TOKEN, tokenInfo)
    },
};

const getters = {
};

let tokenInfo : CustomToken =  new CustomToken('');

const state= {
    tokenInfo: tokenInfo,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}