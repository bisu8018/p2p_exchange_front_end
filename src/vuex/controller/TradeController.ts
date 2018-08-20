import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Order from "@/vuex/model/Order";


export default class TradeController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setOrder(tradeProcess: Order) {
        this.store.dispatch(VuexTypes.SET_TRADE_PROCESS_DATA, tradeProcess);
    }


    getOrder() {
        return this.store.state.tradeProcess.getTradeProcess;
    }
}

