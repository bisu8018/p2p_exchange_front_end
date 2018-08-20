import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import MyTradeFilter from "@/vuex/model/MyTradeFilter";
import TradeItem from "@/vuex/model/TradeItem";
import Order from "@/vuex/model/Order";
import mytrade from "@/vuex/modules/mytrade";

export default class MyTradeController{
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    /////////////////MY Ads///////////////
    //item 검색을 위한 filter 정보 설정
    setMyAdsFilter(myAdsFilter : object) {
        this.store.dispatch(VuexTypes.SET_MYADSFILTER_DATA, myAdsFilter);
    }
    updateMyAdsFilter(data : object) {
        this.store.dispatch(VuexTypes.UPDATE_MYADSFILTER_DATA, data);
    }

    getMyAdsFilter() {
        return this.store.state.mytrade.myAdsFilter;
    }

    //10개씩 item 설정
    setMyAdsItems(myAdsItems : TradeItem[]) {
        this.store.dispatch(VuexTypes.SET_MYADSLIST_DATA, myAdsItems);
    }


    getMyAdsItems() {
        return this.store.state.mytrade.myAdsItems;
    }

    /////////////////MY Orders///////////////
    setMyOrderFilter(myOrderFilter : MyTradeFilter) {
        this.store.dispatch(VuexTypes.SET_MYORDERFILTER_DATA, myOrderFilter);
    }
    updateMyOrderFilter(data : object) {
        this.store.dispatch(VuexTypes.UPDATE_MYORDERFILTER_DATA, data);
    }

    getMyOrderFilter() {
        return this.store.state.mytrade.myOrderFilter;
    }

    //10개씩 item 설정
    setMyOrderItems(orderItems : Order[]) {
        this.store.dispatch(VuexTypes.SET_MYORDERSLIST_DATA, orderItems);
    }

    getMyOrderItems() {
        return this.store.state.mytrade.myOrderItems;
    }
    //drawer는 위의 메서드와 공유.

}
