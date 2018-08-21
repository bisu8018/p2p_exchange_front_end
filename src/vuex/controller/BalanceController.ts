import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import {CurrencyType} from "@/vuex/model/CurrencyType";

export default class AccountController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setBalance(balanceData: any) {
        this.store.dispatch(VuexTypes.SET_BALANCE_DATA, balanceData);
    }

    getBalance() {
        return this.store.state.balance.balanceList;
    }

    getBalances() {
        return this.store.state.balance.balanceList;
    }

    getTotalEstimatedValue(currency: string) {
        let _totalValue = {
            btc: 0,
            currency: 0,
        };

        for (let key in this.getBalances()) {
            _totalValue.btc += this.getBalances()[key].estimatedValue;
            _totalValue.currency += this.getBalances()[key].calcTo(currency)
        }

        return _totalValue;
    }
}

