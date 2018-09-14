import {VuexTypes} from "@/vuex/config/VuexTypes";
import Wallet from '../model/Wallet'
import Withdraw from "@/vuex/model/Withdraw";
import WalletHistory from "@/vuex/model/WalletHistory";
import MyTradeFilter from "@/vuex/model/MyTradeFilter";
import Order from "@/vuex/model/Order";
import WalletStatus from "@/vuex/model/WalletStatus";


const mutations = {
    [VuexTypes.SET_WALLET_DATA](state: any, data: any) {
        state.walletList = [];
        for(let key in data) {
            state.walletList.push(new Wallet(data[key]));
        }
    },
    //customToken wallet list
    [VuexTypes.SET_WALLET_CUSTOMTOEKN](state: any, data: any) {
        state.customWalletList = [];
        for(let key in data) {
            state.customWalletList.push(new Wallet(data[key]));
        }
    },

    [VuexTypes.SET_WITHDRAW_DATA] (state: any, withdraw: Withdraw) {
        state.withdraw = withdraw;
    },
    [VuexTypes.SET_WALLETHISTORYLIST_DATA] (state: any, walletHistoryList: WalletHistory[]) {
        state.walletHistoryList = walletHistoryList;
    },
    //페이지 필터
    [VuexTypes.SET_WALLETHISTORYFILTER_DATA] (state: any, walletHistoryFilter: any) {
        state.walletHistoryFilter = walletHistoryFilter;
    },
    [VuexTypes.UPDATE_WALLETHISTORYFILTER_DATA] (state: any, data: any) {
        state.walletHistoryFilter.update(data);
    },
    //Status update
    [VuexTypes.UPDATE_WALLET_STATUS] (state: any, data: any) {
        state.walletStatus.update(data);
    },

};


const actions = {
    [VuexTypes.SET_WALLET_DATA](context: any, data: any) {
        context.commit(VuexTypes.SET_WALLET_DATA, data)
    },
    //customToken wallet list
    [VuexTypes.SET_WALLET_CUSTOMTOEKN](context: any, data: any) {
        context.commit(VuexTypes.SET_WALLET_CUSTOMTOEKN, data)
    },

    [VuexTypes.SET_WITHDRAW_DATA](context: any, withdraw: Withdraw) {
        context.commit(VuexTypes.SET_WITHDRAW_DATA, withdraw)
    },
    //WalletHistory List
    [VuexTypes.SET_WALLETHISTORYLIST_DATA](context: any, walletHistoryList: WalletHistory[]) {
        context.commit(VuexTypes.SET_WALLETHISTORYLIST_DATA, walletHistoryList)
    },
    //WalletHistory Filter
    [VuexTypes.SET_WALLETHISTORYFILTER_DATA](context: any, historyFilter: MyTradeFilter) {
        context.commit(VuexTypes.SET_WALLETHISTORYFILTER_DATA, historyFilter)
    },
    [VuexTypes.UPDATE_WALLETHISTORYFILTER_DATA](context: any, data: object) {
        context.commit(VuexTypes.UPDATE_WALLETHISTORYFILTER_DATA, data)
    },
    //Update
    [VuexTypes.UPDATE_WALLET_STATUS](context: any, data: object) {
        context.commit(VuexTypes.UPDATE_WALLET_STATUS, data)
    },

};

const getters = {
};

let walletList: Wallet[] = [];
let customWalletList: Wallet[] = [];
let withdraw = new Withdraw('');
let walletHistoryList:WalletHistory[]  = [];
let walletHistoryFilter = new MyTradeFilter('');
let walletStatus = new WalletStatus('');

const state = {
    walletList: walletList,
    customWalletList : customWalletList,
    withdraw : withdraw,
    walletHistoryList : walletHistoryList,
    walletHistoryFilter : walletHistoryFilter,
    walletStatus : walletStatus,
};
export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}