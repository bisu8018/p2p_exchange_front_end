import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeItem from "@/vuex/model/TradeItem";
import Account from "@/vuex/model/Account";
import CustomToken from "@/vuex/model/CustomToken";

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

    //trade를 막기 위해 button대신 띄워주는 filter값 처리
    setCannotTrade(MyInfo: Account, tradeCount: number, advanced: boolean, mobile: boolean, doNotMerchant: boolean){
        let _obj = {
            do_not_trade_message : '',
            can_not_trade : ''
        }
        //  mobile 인증 안했을때
        if(mobile && MyInfo.phoneNumber === ''){
            _obj.do_not_trade_message += 'verify phone'
            _obj.can_not_trade = 'MyPage'
        }
        // advanced 인증 안했을때. 백단 연결시 수정 필요
        //if(advanced ){
        //    _obj.do_not_trade_message += 'adv. verification'
        //}
        else{
            //거래횟수가 부족할때
            if(MyInfo.tradeTimes < tradeCount){
                _obj.do_not_trade_message+= 'Lack of transaction success'
                _obj.can_not_trade = 'noMyPage'
            }
            //현재거래중일때
            else if(doNotMerchant && MyInfo.processingOrderCount !== 0) {
                _obj.do_not_trade_message += ' Need to complete current trading'
                _obj.can_not_trade = 'noMyPage'
            }
        }
        return _obj;
    }

}
