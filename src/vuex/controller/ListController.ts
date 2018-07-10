import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class ListController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setOk(isOk: boolean) {
        this.store.dispatch(VuexTypes.SET_LISTVIEW_DATA, isOk)
    }

    isOk(): boolean {
        return this.store.state.sample.isOk
    }
}
