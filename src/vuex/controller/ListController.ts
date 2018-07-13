import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Trade from "@/vuex/model/Trade";

export default class ListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setTrade(tradeInfo : Trade[]) {
        this.store.dispatch(VuexTypes.SET_TRADEVIEW_DATA, tradeInfo);

    }
    getTrade() {
        console.log("getTrade ListController");
        console.log(this.store.state.trade.tradeInfo);
        return this.store.state.trade.tradeInfo;
    }

}
