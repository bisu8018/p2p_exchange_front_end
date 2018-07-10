import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class SampleController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setOk(isOk: boolean) {
        this.store.dispatch(VuexTypes.SET_SAMPLE_DATA, isOk);
    }

    isOk(): boolean {
        return this.store.state.sample.isOk
    }
}

