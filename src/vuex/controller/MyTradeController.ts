import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import MyAdsFilter from "@/vuex/model/MyAdsFilter";
import TradeItem from "@/vuex/model/TradeItem";
import Order from "@/vuex/model/Order";
import mytrade from "@/vuex/modules/mytrade";

export default class MyTradeController{
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    //item 검색을 위한 filter 정보 설정
    setMyAdsFilter(myAdsFilter : object) {
        this.store.dispatch(VuexTypes.SET_MYADSFILTER_DATA, myAdsFilter);
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
    //drawer 설정
    setDrawerID(drawerID : number) {
        this.store.dispatch(VuexTypes.SET_DRAWER_DATA, drawerID);
    }

    getDrawerID() {
        return this.store.state.mytrade.drawerID;
    }

    setMyOrderFilter(myAdsFilter : object) {
        this.store.dispatch(VuexTypes.SET_MYADSFILTER_DATA, myAdsFilter);
    }

    getMyOrderFilter() {
        return this.store.state.mytrade.myAdsFilter;
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
