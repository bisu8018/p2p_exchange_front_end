import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import PaymentMethod from "@/vuex/model/PaymentMethod";

export default class CommonController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setPaymentMethod(paymentMethod: PaymentMethod) {
        this.store.dispatch(VuexTypes.SET_USER_INFO, paymentMethod);
    }

    gettPaymentMethod() {
        return this.store.state.account.getPaymentMethod;
    }
}

