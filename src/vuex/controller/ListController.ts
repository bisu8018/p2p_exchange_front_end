import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Trade from "@/vuex/model/Trade";

export default class ListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setTotalTrade(tradeTotalInfo : Trade[]) {
        this.store.dispatch(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo);

    }
    getTotalTrade() {
        return this.store.state.trade.tradeTotalInfo;
    }

    setSelectTrade(tradeSelectInfo : Trade[]) {
        this.store.dispatch(VuexTypes.SET_SELECTTRADEVIEW_DATA, tradeSelectInfo);
    }

    getSelectTrade() {
        return this.store.state.trade.tradeSelectInfo;
    }

}
