import {VuexTypes} from "@/vuex/config/VuexTypes";
import MsgAvatar from "@/vuex/model/MsgAvatar";


const mutations = {
    [VuexTypes.SET_TRADE_MSG_AVATAR] (state: any, msgAvatar: MsgAvatar) {
        state.chatAvatar = new MsgAvatar(msgAvatar);
    },
    [VuexTypes.UPDATE_TRADE_MSG_AVATAR] (state: any, msgAvatar: MsgAvatar) {
        state.chatAvatar.update(msgAvatar);
    },

};


const actions = {
    [VuexTypes.SET_TRADE_MSG_AVATAR] (context: any, msgAvatar: MsgAvatar) {
        context.commit(VuexTypes.SET_TRADE_MSG_AVATAR, msgAvatar)
    },
    [VuexTypes.UPDATE_TRADE_MSG_AVATAR] (context: any, msgAvatar: MsgAvatar) {
        context.commit(VuexTypes.UPDATE_TRADE_MSG_AVATAR, msgAvatar)
    },
};

const getters = {
};

let msgAvatar : MsgAvatar =  new MsgAvatar('');

const state= {
    msgAvatar: msgAvatar,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}