import {VuexTypes} from "@/vuex/config/VuexTypes";
import Chat from "@/vuex/model/Chat";
import ChatSubscribe from "@/vuex/model/ChatSubscribe";


const mutations = {
    [VuexTypes.SET_CHAT_OPEN] (state: any, isOpen: Boolean) {
        state.isOpen = isOpen;
    },
    [VuexTypes.SET_CHAT_MESSAGE] (state: any, chatMessage: any) {
        state.chatMessage = chatMessage;
    },
    [VuexTypes.SET_CHAT_SUBSCRIBE] (state: any, chatSubscribe: ChatSubscribe) {
        state.chatSubscribe = chatSubscribe;
    },
};


const actions = {
    [VuexTypes.SET_CHAT_OPEN] (context: any, isOpen: Boolean) {
        context.commit(VuexTypes.SET_CHAT_OPEN, isOpen)
    },
    [VuexTypes.SET_CHAT_MESSAGE] (context: any, chatMessage: any) {
        context.commit(VuexTypes.SET_CHAT_MESSAGE, chatMessage)
    },
    [VuexTypes.SET_CHAT_SUBSCRIBE] (context: any, chatSubscribe: any) {
        context.commit(VuexTypes.SET_CHAT_SUBSCRIBE, chatSubscribe)
    },
};

const getters = {
};

let isOpen  =  false;
let chatMessage : Chat[] = [];
let chatSubscribe = new ChatSubscribe('');

const state= {
    isOpen: isOpen,
    chatMessage: chatMessage,
    chatSubscribe: chatSubscribe,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}