import {VuexTypes} from "@/vuex/config/VuexTypes";
import Balance from '../model/Balance'
import Message from "@/vuex/model/Message";


const mutations = {
    [VuexTypes.SET_MSG_LIST](state: any, data: any) {
        state.msgList = [];
        for(let key in data) {
            state.msgList.push(new Message(data[key]));
        }
    },
    [VuexTypes.ADD_MSG](state: any, data: any) {
        state.msgList.push(new Message(data));
    },
};


const actions = {
    [VuexTypes.SET_MSG_LIST](context: any, data: any) {
        context.commit(VuexTypes.SET_MSG_LIST, data)
    },

    [VuexTypes.ADD_MSG](context: any, data: any) {
        context.commit(VuexTypes.ADD_MSG, data)
    },

};

const getters = {
};

let msgList: Message[] = [];
const state = {
    msgList: msgList,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}