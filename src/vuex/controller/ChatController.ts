import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class ChatController{
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    //채팅 띄우기, 닫기
    setChatOpen(isOpen : boolean){
        this.store.dispatch(VuexTypes.SET_CHAT_OPEN, isOpen);
    }

    getChatStatus(){
        return this.store.state.chat.isOpen;
    }

}
