import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeItem from "@/vuex/model/TradeItem";

export default class TradeListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    //item 검색을 위한 filter 정보 설정
    setTradeFilter(tradeFilter : TradeFilter) {
        this.store.dispatch(VuexTypes.SET_SELECTTRADEFILTER_DATA, tradeFilter);
    }

    getTradeFilter() {
        return this.store.state.trade.tradeFilter;
    }
    //filter정보 바뀐 부분만 update시키기
    updateTradeFilter(data : object) {
        this.store.dispatch(VuexTypes.UPDATE_SELECTTRADEVIEW_DATA, data);
    }
    //10개씩 item 설정
    setTradeItems(tradeItems : TradeItem[]) {
        this.store.dispatch(VuexTypes.SET_TRADEITEMS_DATA, tradeItems);
    }

    getTradeItems() {
        return this.store.state.trade.tradeItems;
    }
    //drawer 설정
    setDrawerID(drawerID : number) {
        this.store.dispatch(VuexTypes.SET_DRAWER_DATA, drawerID);
    }

    getDrawerID() {
        return this.store.state.trade.drawerID;
    }

}
