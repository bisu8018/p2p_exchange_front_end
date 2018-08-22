import {VuexTypes} from "@/vuex/config/VuexTypes";
import MsgAvatar from "@/vuex/model/MsgAvatar";


const mutations = {
    [VuexTypes.SET_TRADE_MSG_AVATAR] (state: any, data: any) {
        state.msgAvatar = new MsgAvatar(data);
    },
    [VuexTypes.UPDATE_TRADE_MSG_AVATAR] (state: any, data: any) {
        state.msgAvatar.update(data);
    },
};


const actions = {
    [VuexTypes.SET_TRADE_MSG_AVATAR] (context: any, data: any) {
        context.commit(VuexTypes.SET_TRADE_MSG_AVATAR, data)
    },
    [VuexTypes.UPDATE_TRADE_MSG_AVATAR] (context: any, data: any) {
        context.commit(VuexTypes.UPDATE_TRADE_MSG_AVATAR, data)
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