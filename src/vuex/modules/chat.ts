import {VuexTypes} from "@/vuex/config/VuexTypes";


const mutations = {
    [VuexTypes.SET_CHAT_OPEN] (state: any, isOpen: Boolean) {
        state.isOpen = isOpen;
    },
};


const actions = {
    [VuexTypes.SET_CHAT_OPEN] (context: any, isOpen: Boolean) {
        context.commit(VuexTypes.SET_CHAT_OPEN, isOpen)
    },
};

const getters = {
};

let isOpen  =  false;

const state= {
    isOpen: isOpen,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}