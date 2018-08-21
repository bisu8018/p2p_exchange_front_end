import {VuexTypes} from "@/vuex/config/VuexTypes";
import MarketPrice from "@/vuex/model/MarketPrice";
import Balance from "@/vuex/model/Balance";


const mutations = {
    [VuexTypes.SET_MARKET_PRICE] (state: any, data: any) {
        state.marketPriceList = [];
        for(let key in data) {
            state.marketPriceList.push(new MarketPrice(data[key]));
        }
    },
};


const actions = {
    [VuexTypes.SET_MARKET_PRICE] (context: any, data: any) {
        context.commit(VuexTypes.SET_MARKET_PRICE, data)
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