import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import ChatAvatar from "@/vuex/model/ChatAvatar";

export default class ChatAvatarController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setChatAvatar(chatAvatar: ChatAvatar) {
        this.store.dispatch(VuexTypes.SET_TRADE_CHAT_AVATAR, chatAvatar);
    }

    getChatAvatar() {
        return this.store.state.chatAvatar.chatAvatar;
    }

    updateChatAvatar(chatAvatar: ChatAvatar) {
        this.store.dispatch(VuexTypes.UPDATE_TRADE_CHAT_AVATAR, chatAvatar);
    }




}

