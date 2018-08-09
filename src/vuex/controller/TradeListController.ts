import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeItem from "@/vuex/model/TradeItem";

export default class TradeListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }


    setTradeFilter(tradeFilter : TradeFilter) {
        this.store.dispatch(VuexTypes.SET_SELECTTRADEFILTER_DATA, tradeFilter);
    }

    getTradeFilter() {
        return this.store.state.trade.tradeFilter;
    }

    updateTradeFilter(data : object) {
        this.store.dispatch(VuexTypes.UPDATE_SELECTTRADEVIEW_DATA, data);
    }

    setTradeItems(tradeItems : TradeItem[]) {
        this.store.dispatch(VuexTypes.SET_TRADEITEMS_DATA, tradeItems);
    }

    getTradeItems() {
        return this.store.state.trade.tradeItems;
    }

}
