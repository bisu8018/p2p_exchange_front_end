import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Trade from "@/vuex/model/Trade";

export default class ListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setTotalTrade(tradeTotalInfo : number) {
        this.store.dispatch(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo);

    }
    // setTotalTrade(tradeTotalInfo : Trade[]) {
    //     this.store.dispatch(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo);
    //
    // }
    getTotalTrade() {
        return this.store.state.trade.tradeTotalInfo;
    }

    setSelectTrade(tradeSelectInfo : Trade[]) {
        this.store.dispatch(VuexTypes.SET_SELECTTRADEVIEW_DATA, tradeSelectInfo);
    }

    getSelectTrade() {
        return this.store.state.trade.tradeSelectInfo;
    }

    setToken(token: string) {
        this.store.dispatch(VuexTypes.SET_TOKEN_DATA, token);
    }

    getToken() {
        return this.store.state.trade.token;
    }

    setAdType(adType: string) {
        this.store.dispatch(VuexTypes.SET_ADTYPE_DATA, adType);
    }

    getAdType() {
        return this.store.state.trade.adType;
    }

}
