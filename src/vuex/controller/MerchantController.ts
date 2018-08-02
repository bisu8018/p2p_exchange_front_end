import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

export default class MerchantController {
    store: Store<any>;

    constructor (vuexStore: Store<any>){
        this.store = vuexStore;
    }

    // select box country
    setMerchant(name: string){
        this.store.dispatch(VuexTypes.SET_MERCHANT_DATA, name);
    }

    getMerchant() {
        return this.store.state.merchant.MerchantInfo;
    }
}