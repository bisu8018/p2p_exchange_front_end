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
    // 도메인 설정
    setDomain(domain: string) {
        this.store.dispatch(VuexTypes.SET_DOMAIN, domain)
    }

    getDomain() {
        return this.store.state.state.domain
    }

    isMoblie() {
        return this.store.state.state.isMobile
    }

    isInitCompleted() {
        return this.store.state.state.initCompleted
    }

    setInitCompleted(isCompleted: boolean) {
        this.store.dispatch(VuexTypes.INIT_COMPLETED, isCompleted)
    }

    //OS 체크
    // setCheckOs(checkOs: number) {
    //     this.store.dispatch(VuexTypes.SET_CHECK_OS, checkOs)
    // }
    // checkOs() {
    //     return this.store.state.state.checkOs
    // }
}

