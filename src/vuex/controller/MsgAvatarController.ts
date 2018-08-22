import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import MsgAvatar from "@/vuex/model/MsgAvatar";

export default class ChatAvatarController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setMsgAvatar(msgAvatar: MsgAvatar) {
        this.store.dispatch(VuexTypes.SET_TRADE_MSG_AVATAR, msgAvatar);
    }

    getMsgAvatar() {
        return this.store.state.msgAvatar.msgAvatar;
    }

    updateMsgAvatar(msgAvatar: MsgAvatar) {
        this.store.dispatch(VuexTypes.UPDATE_TRADE_MSG_AVATAR, msgAvatar);
    }




}

