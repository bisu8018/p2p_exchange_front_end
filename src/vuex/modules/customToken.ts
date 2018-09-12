import {VuexTypes} from "@/vuex/config/VuexTypes";
import CustomToken from "@/vuex/model/CustomToken";


const mutations = {
    [VuexTypes.SET_MY_TOKEN] (state: any, tokenInfo: CustomToken) {
        state.tokenInfo = tokenInfo;
    },
    // Custom Token List
    [VuexTypes.SET_CUSTOMTRADETOKEN_LIST] (state: any, customTokenList: CustomToken[]) {
        state.customTokenList = customTokenList;
    },
};


const actions = {
    [VuexTypes.SET_MY_TOKEN] (context: any, tokenInfo: CustomToken) {
        context.commit(VuexTypes.SET_MY_TOKEN, tokenInfo)
    },
    //custom Token 리스트
    [VuexTypes.SET_CUSTOMTRADETOKEN_LIST] (context: any, customTokenList: CustomToken[]) {
        context.commit(VuexTypes.SET_CUSTOMTRADETOKEN_LIST, customTokenList)
    },
};

const getters = {
};

let tokenInfo : CustomToken =  new CustomToken('');
let customTokenList : CustomToken[] = [];

const state= {
    tokenInfo: tokenInfo,
    customTokenList : customTokenList,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}