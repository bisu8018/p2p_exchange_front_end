import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Wallet from "@/vuex/model/Wallet";
import Withdraw from "@/vuex/model/Withdraw";
import WalletHistory from "@/vuex/model/WalletHistory";
import MyTradeFilter from "@/vuex/model/MyTradeFilter";
import CustomToken from "@/vuex/model/CustomToken";

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
        crpto = this.transCryptocurrencyFullName(crpto);
        let result = new Wallet('');
        for(let i = 0; i < this.getWallets().length; i++) {
            let _item = this.getWallets()[i];
            if (_item.cryptocurrency === crpto) {
                result = _item;
            }
        }
        return result;
    }

    // name기반으로 walletList 찾기.
    //value 가 검색알파벳, type은 general과 custom
    findWalletsByName(value, type) {
        //대문자로 바꿔줘서
        value = value.toUpperCase();
        //general 일때
        if (type === 'General Coin'){
            let self = this
            let tokenList:Wallet[] = []
            this.getWallets().find(function (element) {
                let compared =  self.transCryptocurrencyName(element.cryptocurrency);
                if( compared.indexOf(value) > -1){
                    tokenList.push(element);
                }
            });
            return tokenList;
        }
        //custom 일때
        else{
            let tokenList:Wallet[] = []
            this.getCustomTokenWallet().find(function (element) {
                let compared =  element.tokenName;
                if( compared.indexOf(value) > -1){
                    tokenList.push(element);
                }
            });
            return tokenList;
        }
    }
    //잔고 있는 Wallet model만  return 시켜줌.
    getHaveBalance(walletData : Wallet[]){
        let tokenList:Wallet[] = []
        for (let key in walletData) {
            //잔고 있는 Wallet model만 들어감.
            if(walletData[key].availableAmount > 0 || walletData[key].frozenAmount > 0){
                tokenList.push(walletData[key]);
            }
        }
        return tokenList;
    }

    transCryptocurrencyName(name){
        switch (name) {
            case 'bitcoin':
                return 'BTC'

            case 'ethereum':
                return 'ETH'

            case 'allb':
                return 'AllB'

            default:
                return name
        }
    }

    transCryptocurrencyFullName(name : string){
        switch (name) {
            case 'BTC': name = 'bitcoin'; break
            case 'ETH': name ='ethereum'; break
            case 'AllB':name ='allb';break
            default: break
        }
        return name
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

