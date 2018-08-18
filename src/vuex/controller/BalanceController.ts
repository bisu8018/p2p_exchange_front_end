import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class AccountController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setBalance(balance: any) {
        this.store.dispatch(VuexTypes.SET_BALANCE_DATA, balance);
    }

    getBalance() {
        return this.store.state.balance.getBalance;
    }
}

