import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Trade from "@/vuex/model/Trade";

export default class ListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }


    setSelectTrade(tradeSelectInfo : Trade) {
        this.store.dispatch(VuexTypes.SET_SELECTTRADEVIEW_DATA, tradeSelectInfo);
    }

    getSelectTrade() {
        return this.store.state.trade.tradeSelectInfo;
    }

    updateSelectTrade(data : object) {
        this.store.dispatch(VuexTypes.UPDATE_SELECTTRADEVIEW_DATA, data);
    }

    // setCryptocurrency(cryptocurrency: string) {
    //     this.store.dispatch(VuexTypes.SET_CRYPTOCURRENCY_DATA, cryptocurrency);
    // }
    //
    // getCryptocurrency() {
    //     return this.store.state.trade.cryptocurrency;
    // }
    //
    // setTradeType(tradeType: string) {
    //     this.store.dispatch(VuexTypes.SET_TRADETYPE_DATA, tradeType);
    // }
    //
    // getTradeType() {
    //     return this.store.state.trade.tradeType;
    // }
    //
    // setLimitMin(limitMin: number) {
    //     this.store.dispatch(VuexTypes.SET_LIMITMIN_DATA, limitMin);
    // }
    //
    // getLimitMin() {
    //     return this.store.state.trade.limitMin;
    // }
    //
    // setTotalTrade(tradeTotalInfo : number) {
    //     this.store.dispatch(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo);
    //
    // }
    // setTotalTrade(tradeTotalInfo : Trade[]) {
    //     this.store.dispatch(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo);
    //
    // }
    // getTotalTrade() {
    //     return this.store.state.trade.tradeTotalInfo;
    // }
}
