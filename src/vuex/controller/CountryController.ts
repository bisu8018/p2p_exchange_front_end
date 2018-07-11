import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

export default class CountryController {
    store: Store<any>;

    constructor (vuexStore: Store<any>){
        this.store = vuexStore;
    }

    setCountry(country: string){
        this.store.dispatch(VuexTypes.SET_COUNTRY_DATA, country);
    }

    getCountry() {
        return this.store.state.country.getCountry;
    }
}