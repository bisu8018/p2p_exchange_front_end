import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

export default class PaginationController {
    store: Store<any>;

    constructor (vuexStore: Store<any>){
        this.store = vuexStore;
    }

    // select box country
    setPage(page: number){
        this.store.dispatch(VuexTypes.SET_PAGE_DATA, page);
    }

    getPage() {
        return this.store.state.pagination.Page;
    }

    setTotalCount(totalCount: number){
        this.store.dispatch(VuexTypes.SET_TOTALCOUNT_DATA, totalCount);
    }
    getTotalCount() {
        return this.store.state.pagination.totalCount;
    }
}