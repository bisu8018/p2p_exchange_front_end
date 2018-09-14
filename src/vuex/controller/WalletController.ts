import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Wallet from "@/vuex/model/Wallet";
import Withdraw from "@/vuex/model/Withdraw";
import WalletHistory from "@/vuex/model/WalletHistory";
import MyTradeFilter from "@/vuex/model/MyTradeFilter";

export default class WalletController {
    store: Store<any>;
    processingTime: number;
    constructor (vuexStore: Store<any>) {
        this.processingTime = 0;
        this.store = vuexStore
    }

    setWallet(walletData: any) {
        this.store.dispatch(VuexTypes.SET_WALLET_DATA, walletData);
    }

    getWallet() {
        return this.store.state.wallet.walletList;
    }
    //custom token
    setCustomTokenWallet(walletData: any) {
        this.store.dispatch(VuexTypes.SET_WALLET_CUSTOMTOEKN, walletData);
    }

    getCustomTokenWallet() {
        return this.store.state.wallet.customWalletList;
    }

    getWallets() {
        return this.store.state.wallet.walletList;
    }

    findByCrptoCurrency(crpto: string) {
        let result = new Wallet('');
        for(let i = 0; i < this.getWallets().length; i++) {
            let _item = this.getWallets()[i];
            if (_item.cryptocurrency === crpto) {
                result = _item;
            }
        }
        return result;
    }


    getTotalEstimatedValue(currency: string) {
        let _totalValue = {
            btc: 0,
            currency: 0,
        };

        for (let key in this.getWallets()) {
            _totalValue.btc += this.getWallets()[key].btcAmount;
            _totalValue.currency += this.getWallets()[key].calcTo(currency)
        }

        return _totalValue;
    }

    //withdraw
    setWithdraw(withdraw : Withdraw){
        this.store.dispatch(VuexTypes.SET_WITHDRAW_DATA, withdraw);
    }

    getWithdraw(){
        return this.store.state.wallet.withdraw
    }

    updateStatus(data: any){
        this.store.dispatch(VuexTypes.UPDATE_WALLET_STATUS, data);
    }
    getStatus(){
        return this.store.state.wallet.walletStatus;
    }

    //history
    setWalletHistoryList(walletHistoryList : WalletHistory[]){
        this.store.dispatch(VuexTypes.SET_WALLETHISTORYLIST_DATA, walletHistoryList);

    }
    getWalletHistoryList(){
        return this.store.state.wallet.walletHistoryList
    }
    setHistoryFilter(historyfilter :MyTradeFilter){
        this.store.dispatch(VuexTypes.SET_WALLETHISTORYFILTER_DATA, historyfilter);
    }
    getHistoryFilter() {
        return this.store.state.wallet.walletHistoryFilter;
    }

    updateHistoryFilter(data : object) {
        this.store.dispatch(VuexTypes.UPDATE_WALLETHISTORYFILTER_DATA, data);
    }

}

