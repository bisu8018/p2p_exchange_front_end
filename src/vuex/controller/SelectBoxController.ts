import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

export default class SelectBoxController {
    store: Store<any>;

    constructor (vuexStore: Store<any>){
        this.store = vuexStore;
    }

    // select box country
    setCountry(country: string){
        this.store.dispatch(VuexTypes.SET_COUNTRY_DATA, country);
    }

    getCountry() {
        return this.store.state.selectBox.getCountry;
    }

    // select box currency
    setCurrency(currency: string){
        this.store.dispatch(VuexTypes.SET_CURRENCY_DATA, currency);
    }

    getCurrency() {
        return this.store.state.selectBox.getCurrency;
    }

    // select box payment
    setPayment(payment: string){
        this.store.dispatch(VuexTypes.SET_PAYMENET_DATA, payment);
    }

    getPayment() {
        return this.store.state.selectBox.getPayment;
    }
}