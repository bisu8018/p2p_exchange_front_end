import {VuexTypes} from "@/vuex/config/VuexTypes";
import Balance from '../model/Balance'
import Withdraw from "@/vuex/model/Withdraw";
import BalanceHistory from "@/vuex/model/BalanceHistory";
import MyTradeFilter from "@/vuex/model/MyTradeFilter";
import Order from "@/vuex/model/Order";


const mutations = {
    [VuexTypes.SET_BALANCE_DATA](state: any, data: any) {
        state.balanceList = [];
        for(let key in data) {
            state.balanceList.push(new Balance(data[key]));
        }
    },
    [VuexTypes.SET_WITHDRAW_DATA] (state: any, withdraw: Withdraw) {
        state.withdraw = withdraw;
    },
    [VuexTypes.SET_BALANCEHISTORYLIST_DATA] (state: any, balanceHistoryList: BalanceHistory[]) {
        state.balanceHistoryList = balanceHistoryList;
    },
    //페이지 필터
    [VuexTypes.SET_BALANCEHISTORYFILTER_DATA] (state: any, balanceHistoryFilter: any) {
        state.balanceHistoryFilter = balanceHistoryFilter;
    },
    [VuexTypes.UPDATE_BALANCEHISTORYFILTER_DATA] (state: any, data: any) {
        state.balanceHistoryFilter.update(data);
    },

};


const actions = {
    [VuexTypes.SET_BALANCE_DATA](context: any, data: any) {
        context.commit(VuexTypes.SET_BALANCE_DATA, data)
    },
    [VuexTypes.SET_WITHDRAW_DATA](context: any, withdraw: Withdraw) {
        context.commit(VuexTypes.SET_WITHDRAW_DATA, withdraw)
    },
    //BalanceHistory List
    [VuexTypes.SET_BALANCEHISTORYLIST_DATA](context: any, balanceHistoryList: BalanceHistory[]) {
        context.commit(VuexTypes.SET_BALANCEHISTORYLIST_DATA, balanceHistoryList)
    },
    //BalanceHistory Filter
    [VuexTypes.SET_BALANCEHISTORYFILTER_DATA](context: any, historyFilter: MyTradeFilter) {
        context.commit(VuexTypes.SET_BALANCEHISTORYFILTER_DATA, historyFilter)
    },
    [VuexTypes.UPDATE_BALANCEHISTORYFILTER_DATA](context: any, data: object) {
        context.commit(VuexTypes.UPDATE_BALANCEHISTORYFILTER_DATA, data)
    },

};

const getters = {
};

let balanceList: Balance[] = [];
let withdraw = new Withdraw('');
let balanceHistoryList:BalanceHistory[]  = [];
let balanceHistoryFilter = new MyTradeFilter('');

const state = {
    balanceList: balanceList,
    withdraw : withdraw,
    balanceHistoryList : balanceHistoryList,
    balanceHistoryFilter : balanceHistoryFilter,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}