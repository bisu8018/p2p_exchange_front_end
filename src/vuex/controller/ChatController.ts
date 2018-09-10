import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import ChatSubscribe from "@/vuex/model/ChatSubscribe";

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

    setMessage(chatMessage : any) {
        this.store.dispatch(VuexTypes.SET_CHAT_MESSAGE, chatMessage);
    }

    getMessage(){
        return this.store.state.chat.chatMessage;
    }

    setChatSubscribe(chatSubscribe : ChatSubscribe) {
        this.store.dispatch(VuexTypes.SET_CHAT_SUBSCRIBE, chatSubscribe);
    }

    getChatSubscribe(){
        return this.store.state.chat.chatSubscribe;
    }



}
