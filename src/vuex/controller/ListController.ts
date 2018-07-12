import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class ListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setTrade(tradeInfo: Object) {
        this.store.dispatch(VuexTypes.SET_TRADEVIEW_DATA, tradeInfo)
    }

    isOk(): boolean {
        return this.store.state.trade.isOk
    }

}
