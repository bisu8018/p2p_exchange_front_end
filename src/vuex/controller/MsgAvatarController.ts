import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import MsgAvatar from "@/vuex/model/MsgAvatar";

export default class ChatAvatarController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    set(data: any) {
        this.store.dispatch(VuexTypes.SET_TRADE_MSG_AVATAR, data);
    }

    get(): MsgAvatar {
        return this.store.state.msgAvatar.msgAvatar;
    }

    update(data: any) {
        this.store.dispatch(VuexTypes.UPDATE_TRADE_MSG_AVATAR, data);
    }
}

