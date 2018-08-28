import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";
import Message from "@/vuex/model/Message";
import {abUtils} from "@/common/utils";
import MainRepository from "@/vuex/MainRepository";

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
        let isOk = true;
        for(let key in this.getMsgList()) {
            let item = this.getMsgList()[key];
            if (data.messageNo === item.messageNo) {
                isOk = false;
            }
        }
        if (isOk) {
            this.store.dispatch(VuexTypes.ADD_MSG, data);
        }
    }

    getLatestMsgTime(): number {
        if(this.getMsgList().length === 0){
            let registerDT = MainRepository.TradeProcess.getCurrentOrder().registerDatetime;
            return registerDT;
        }else{
            let latestMsg: Message = this.getMsgList()[this.getMsgList().length-1];
            return latestMsg.registerDatetime;
        }
    }
}
