import {VuexTypes} from "@/vuex/config/VuexTypes";
import Trade from "@/vuex/model/Trade";


const mutations = {
    // -                   현재 상태                             -
    // 페이지네이션 수
    // [VuexTypes.SET_TRADEVIEW_DATA] (state: any, tradeTotalInfo: number) {
    //     state.tradeTotalInfo = tradeTotalInfo;
    // },
    // 페이지 리스트
    [VuexTypes.SET_SELECTTRADEVIEW_DATA] (state: any, tradeSelectInfo: Trade) {

        state.tradeSelectInfo = tradeSelectInfo;
    },
    // 바뀐부분만 update
    [VuexTypes.UPDATE_SELECTTRADEVIEW_DATA] (state: any, data: object) {
        state.tradeSelectInfo.update(data);
    },

    // // 토큰 종류
    // [VuexTypes.SET_CRYPTOCURRENCY_DATA] (state: any, token: string) {
    //     state.token = token;
    // },
    // // 광고 타입
    // [VuexTypes.SET_TRADETYPE_DATA] (state: any, adType: string) {
    //     state.adType = adType;
    // },
    // // AMOUNT(LIMIT_MIN) 타입
    // [VuexTypes.SET_LIMITMIN_DATA] (context: any, limitMin: number) {
    //     state.limitMin = limitMin;
    // }
};


const actions = {
    // -                   현재 상태                             -
    // // 페이지네이션 수
    // [VuexTypes.SET_TRADEVIEW_DATA] (context: any, tradeTotalInfo: number) {
    //     context.commit(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo)
    // },

    // 페이지 리스트
    [VuexTypes.SET_SELECTTRADEVIEW_DATA] (context: any, tradeSelectInfo: Trade) {

        context.commit(VuexTypes.SET_SELECTTRADEVIEW_DATA, tradeSelectInfo)
    },
    // 바뀐부분만 update
    [VuexTypes.UPDATE_SELECTTRADEVIEW_DATA] (context: any, data: object) {
        context.commit(VuexTypes.UPDATE_SELECTTRADEVIEW_DATA, data)
    },
    // // 토큰 종류
    // [VuexTypes.SET_CRYPTOCURRENCY_DATA] (context: any, token: string) {
    //     context.commit(VuexTypes.SET_CRYPTOCURRENCY_DATA, token)
    // },
    // // 광고 타입
    // [VuexTypes.SET_TRADETYPE_DATA] (context: any, adType: string) {
    //     context.commit(VuexTypes.SET_TRADETYPE_DATA, adType)
    // },
    // // AMOUNT(LIMIT_MIN) 타입
    // [VuexTypes.SET_LIMITMIN_DATA] (context: any, limitMin: number) {
    //     context.commit(VuexTypes.SET_LIMITMIN_DATA, limitMin)
    // }
};

const getters = {
};

let tradeSelectInfo : Trade = new Trade('');  // object형 으로 초기화

// let cryptocurrency : string = 'BTC';
// let tradeType : string = 'buy';
// let nationality : string = 'CNY';
// let currency : string = 'ALL';
// let paymentMethod : string = 'ALL';
// let limitMin : number = 0;
// let limitMax : number = 100000;
// let size : number = 10;

const state= {

    tradeSelectInfo: tradeSelectInfo,

    // cryptocurrency: cryptocurrency,
    // tradeType: tradeType,
    // nationality: nationality,
    // currency: currency,
    // paymentMethod: paymentMethod,
    // limitMin: limitMin,
    // limitMax: limitMax,
    // size: size,

}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}