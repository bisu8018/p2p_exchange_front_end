import {VuexTypes} from "@/vuex/config/VuexTypes";
import MarketPrice from "@/vuex/model/MarketPrice";


const mutations = {
    [VuexTypes.SET_MARKET_PRICE] (state: any, priceList: MarketPrice[]) {
        state.tradeFilter = priceList;
    },
};


const actions = {
    [VuexTypes.SET_MARKET_PRICE] (context: any, priceList: MarketPrice[]) {
        context.commit(VuexTypes.SET_MARKET_PRICE, priceList)
    },

};

const getters = {
};

let marketPriceList: MarketPrice[] = [];

const state= {
    marketPriceList: marketPriceList,
};

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}