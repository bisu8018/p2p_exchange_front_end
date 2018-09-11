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

    getWallets() {
        return this.store.state.wallet.walletList;
    }

    findByCrptoCurrency(crpto: string) {
        let result = new Wallet('');
        for(let i = 0; i < this.getWallets().length; i++) {
            let _item = this.getWallets()[i];
            if (_item.cryptoCurrency === crpto) {
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

    setWithdrawCurrency(currency : any){
        this.store.dispatch(VuexTypes.SET_WALLET_CURRENCY, currency);
    }

    getWithdrawCurrency(){
        return this.store.state.wallet.currency
    }
    updateTransfer(data: any){
        this.store.dispatch(VuexTypes.UPDATE_WALLET_TRANSFER, data);
    }
    getTransfer(){
        return this.store.state.wallet.transfer;
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

