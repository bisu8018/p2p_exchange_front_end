import {VuexTypes} from "@/vuex/config/VuexTypes";
import ChatAvatar from "@/vuex/model/ChatAvatar";


const mutations = {
    [VuexTypes.SET_TRADE_CHAT_AVATAR] (state: any, chatAvatar: ChatAvatar) {
        state.chatAvatar = chatAvatar;
    },
    [VuexTypes.UPDATE_TRADE_CHAT_AVATAR] (state: any, chatAvatar: ChatAvatar) {
        state.chatAvatar.update(chatAvatar);
    },

};


const actions = {
    [VuexTypes.SET_TRADE_CHAT_AVATAR] (context: any, chatAvatar: ChatAvatar) {
        context.commit(VuexTypes.SET_TRADE_CHAT_AVATAR, chatAvatar)
    },
    [VuexTypes.UPDATE_TRADE_CHAT_AVATAR] (context: any, chatAvatar: ChatAvatar) {
        context.commit(VuexTypes.UPDATE_TRADE_CHAT_AVATAR, chatAvatar)
    },
};

const getters = {
};

let chatAvatar : ChatAvatar =  new ChatAvatar('');

const state= {
    chatAvatar: chatAvatar,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}