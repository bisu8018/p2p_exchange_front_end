import {VuexTypes} from "@/vuex/config/VuexTypes";
import Chat from "@/vuex/model/Chat";
import ChatSubscribe from "@/vuex/model/ChatSubscribe";
import ChatMembers from "@/vuex/model/ChatMembers";


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
    [VuexTypes.SET_CHAT_MEMBERS] (state: any, chatMembers: any) {
        state.chatMembers = chatMembers;
    },
};


const actions = {
    [VuexTypes.SET_CHAT_OPEN] (context: any, isOpen: Boolean) {
        context.commit(VuexTypes.SET_CHAT_OPEN, isOpen)
    },
    [VuexTypes.SET_CHAT_MESSAGE] (context: any, chatMessage: any) {
        context.commit(VuexTypes.SET_CHAT_MESSAGE, chatMessage)
    },
    [VuexTypes.SET_CHAT_SUBSCRIBE] (context: any, chatSubscribe: ChatSubscribe) {
        context.commit(VuexTypes.SET_CHAT_SUBSCRIBE, chatSubscribe)
    },
    [VuexTypes.SET_CHAT_MEMBERS] (context: any, chatMembers: any) {
        context.commit(VuexTypes.SET_CHAT_MEMBERS, chatMembers)
    },
};

const getters = {
};

let isOpen  =  false;
let chatMessage : Chat[] = [];
let chatSubscribe = new ChatSubscribe('');
let chatMembers : ChatMembers[] = [];

const state= {
    isOpen: isOpen,
    chatMessage: chatMessage,
    chatSubscribe: chatSubscribe,
    chatMembers: chatMembers,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}