import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";
import Message from "@/vuex/model/Message";
import {abUtils} from "@/common/utils";

export default class MessageController {
    store: Store<any>;

    constructor (vuexStore: Store<any>){
        this.store = vuexStore;
    }

    // select box country
    setMsgList(data: any){
        this.store.dispatch(VuexTypes.SET_MSG_LIST, data);
    }

    getMsgList(): Message[] {
        return this.store.state.message.msgList;
    }

    addMsg(data: any) {
        this.store.dispatch(VuexTypes.ADD_MSG, data);
    }

    getLatestMsgTime(): string {
        let latestMsg: Message = this.getMsgList().length[this.getMsgList().length-1];
        return abUtils.toChatServerTimeFormat(new Date(latestMsg.registerDatetime));
    }
}
