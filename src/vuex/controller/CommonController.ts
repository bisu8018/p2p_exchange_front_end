import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class CommonController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setPaymentMethod(paymentMethod: any) {
        this.store.dispatch(VuexTypes.SET_USER_INFO, paymentMethod);
    }

    getPaymentMethod() {
        return this.store.state.account.getPaymentMethod;
    }
}

