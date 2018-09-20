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
    //custom Token No
    [VuexTypes.SET_CUSTOMTOKEN_NUMBER] (state: any, tokenNo: Number) {
        state.tokenNo = tokenNo;
    },
    //selected custom Token
    [VuexTypes.SET_SELECTED_CUSTOMTOKEN] (state: any, selectedCustomToken: CustomToken) {
        state.selectedCustomToken = selectedCustomToken;
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
    //custom Token No
    [VuexTypes.SET_CUSTOMTOKEN_NUMBER] (context: any, tokenNo: Number) {
        context.commit(VuexTypes.SET_CUSTOMTOKEN_NUMBER, tokenNo)
    },
    //selected custom Token
    [VuexTypes.SET_SELECTED_CUSTOMTOKEN] (context: any, selectedCustomToken: CustomToken) {
        context.commit(VuexTypes.SET_SELECTED_CUSTOMTOKEN, selectedCustomToken)
    },
};

const getters = {
};

let tokenInfo : CustomToken =  new CustomToken('');
let customTokenList : CustomToken[] = [];
let tokenNo : number = -1
let selectedCustomToken = new CustomToken('');

const state= {
    tokenInfo: tokenInfo,
    customTokenList : customTokenList,
    tokenNo : tokenNo,
    selectedCustomToken : selectedCustomToken,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}