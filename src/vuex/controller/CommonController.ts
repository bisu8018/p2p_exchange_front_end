import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class CommonController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setPaymentMethod(paymentMethod: any) {
        this.store.dispatch(VuexTypes.SET_PAYMENT_METHOD, paymentMethod);

    }

    getPaymentMethod() {
        return this.store.state.common.getPaymentMethod;
    }
}

