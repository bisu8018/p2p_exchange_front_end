import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import PaymentMethod from "@/vuex/model/PaymentMethod";

export default class MyPageController {
    store: Store<any>;
    paymentMethod: PaymentMethod;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }
}

