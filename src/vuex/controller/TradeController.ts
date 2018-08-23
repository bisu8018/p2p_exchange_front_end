import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Order from "@/vuex/model/Order";


export default class TradeController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }


    setCurrentOrder(tradeProcess: Order) {
        this.store.dispatch(VuexTypes.SET_CURRENT_ORDER, tradeProcess);
    }

    getCurrentOrder() { console.log( this.store.state.tradeProcess.currentOrder.status)
        return this.store.state.tradeProcess.currentOrder;
    }

    updateOrderStatus(status: string){ console.log(status);
        this.store.dispatch(VuexTypes.UPDATE_CURRENT_ORDER, status);
    }

}

