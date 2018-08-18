import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";

export default class StateController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    // 모바일 체크
    setMobile(isMobile: boolean) {
        this.store.dispatch(VuexTypes.SET_IS_MOBILE, isMobile)
    }

    isMoblie() {
        return this.store.state.state.isMobile
    }

    isInitCompleted() {
        return this.store.state.state.initCompleted
    }

    //OS 체크
    // setCheckOs(checkOs: number) {
    //     this.store.dispatch(VuexTypes.SET_CHECK_OS, checkOs)
    // }
    // checkOs() {
    //     return this.store.state.state.checkOs
    // }
}

