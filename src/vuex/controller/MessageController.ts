import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

export default class MessageController {
    store: Store<any>;

    constructor (vuexStore: Store<any>){
        this.store = vuexStore;
    }

    // select box country
    setMsgList(data: any){
        this.store.dispatch(VuexTypes.SET_MSG_LIST, data);
    }

    getMsgList() {
        return this.store.state.message.msgList;
    }

    addMsg(data: any) {
        this.store.dispatch(VuexTypes.ADD_MSG, data);
    }
}
