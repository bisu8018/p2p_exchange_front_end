import {VuexTypes} from "@/vuex/config/VuexTypes";
import Trade from "@/vuex/model/Trade";


const mutations = {
    // -                   현재 상태                             -
    // 페이지네이션 수
    [VuexTypes.SET_TRADEVIEW_DATA] (state: any, tradeTotalInfo: number) {
        state.tradeTotalInfo = tradeTotalInfo;
    },
    // 페이지 리스트
    [VuexTypes.SET_SELECTTRADEVIEW_DATA] (state: any, tradeSelectInfo: Trade[]) {
        state.tradeSelectInfo = tradeSelectInfo;
    },
    // 토큰 종류
    [VuexTypes.SET_TOKEN_DATA] (state: any, token: string) {
        state.token = token;
    },
    // 광고 타입
    [VuexTypes.SET_ADTYPE_DATA] (state: any, adType: string) {
        state.adType = adType;
    },
    // AMOUNT(LIMIT_MIN) 타입
    [VuexTypes.SET_LIMITMIN_DATA] (context: any, limitMin: number) {
        state.limitMin = limitMin;
    }
};


const actions = {
    // -                   현재 상태                             -
    // 페이지네이션 수
    [VuexTypes.SET_TRADEVIEW_DATA] (context: any, tradeTotalInfo: number) {
        context.commit(VuexTypes.SET_TRADEVIEW_DATA, tradeTotalInfo)
    },
    // 페이지 리스트
    [VuexTypes.SET_SELECTTRADEVIEW_DATA] (context: any, tradeSelectInfo: Trade[]) {
        context.commit(VuexTypes.SET_SELECTTRADEVIEW_DATA, tradeSelectInfo)
    },
    // 토큰 종류
    [VuexTypes.SET_TOKEN_DATA] (context: any, token: string) {
        context.commit(VuexTypes.SET_TOKEN_DATA, token)
    },
    // 광고 타입
    [VuexTypes.SET_ADTYPE_DATA] (context: any, adType: string) {
        context.commit(VuexTypes.SET_ADTYPE_DATA, adType)
    },
    // AMOUNT(LIMIT_MIN) 타입
    [VuexTypes.SET_LIMITMIN_DATA] (context: any, limitMin: number) {
        context.commit(VuexTypes.SET_LIMITMIN_DATA, limitMin)
    }
};

const getters = {
};

let tradeTotalInfo : number  =  0;
let tradeSelectInfo : Trade[] = [];

let token : string = '';
let adType : string = '';
let limitMin : number = 0;

const state= {
    tradeTotalInfo: tradeTotalInfo,
    tradeSelectInfo: tradeSelectInfo,
    token: token,
    adType: adType,
    limitMin: limitMin
}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}