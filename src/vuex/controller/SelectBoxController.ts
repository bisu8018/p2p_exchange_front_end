import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

export default class SelectBoxController {
    store: Store<any>;

    constructor (vuexStore: Store<any>){
        this.store = vuexStore;
    }

    // select box country
    setCountry(nationality: string){
        this.store.dispatch(VuexTypes.SET_COUNTRY_DATA, nationality);
    }

    getCountry() {
        return this.store.state.selectBox.nationality;
    }

    // select box currency
    setCurrency(currency: string){
        this.store.dispatch(VuexTypes.SET_CURRENCY_DATA, currency);
    }

    getCurrency() {
        return this.store.state.selectBox.currency;
    }

    // select box payment
    setPayment(payment: string){
        this.store.dispatch(VuexTypes.SET_PAYMENET_DATA, payment);
    }

    getPayment() {
        return this.store.state.selectBox.payment;
    }

    onClear(){
        this.store.dispatch(VuexTypes.SET_COUNTRY_DATA, 'ALL');
        this.store.dispatch(VuexTypes.SET_CURRENCY_DATA, 'CNY');
        this.store.dispatch(VuexTypes.SET_PAYMENET_DATA, 'ALL');
    }
}