import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import MarketPrice from "@/vuex/model/MarketPrice";

export default class MarketPriceController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setMarketPriceList(data: MarketPrice[]) {
        this.store.dispatch(VuexTypes.SET_USER_INFO, data);
    }

    getMarketPriceList() {
        return this.store.state.marketPrice.marketPriceList;
    }
}

