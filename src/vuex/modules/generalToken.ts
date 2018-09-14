import {VuexTypes} from "@/vuex/config/VuexTypes";
import GeneralToken from "@/vuex/model/GeneralToken";


const mutations = {
    // Custom Token List
    [VuexTypes.SET_GENERAL_TOKEN_LIST] (state: any, generalTokenList: GeneralToken[]) {
        state.generalTokenList = generalTokenList;
    },
};


const actions = {
    [VuexTypes.SET_GENERAL_TOKEN_LIST] (context: any, generalTokenList: GeneralToken[]) {
        context.commit(VuexTypes.SET_GENERAL_TOKEN_LIST, generalTokenList)
    },
};

const getters = {
};

let generalTokenList : GeneralToken[] = [];

const state= {
    generalTokenList : generalTokenList,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}