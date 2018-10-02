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

    //브라우져 체크
    getBrowserInfo() {
/*// Opera 8.0+
        let isOpera = (!!window['opr'] && !!window['opr']['addons']) || !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        let isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        let isSafari = /constructor/i.test(window['HTMLElement']) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || window['safari']['pushNotification']);

        // Internet Explorer 6-11
        let isIE  = function isIE() {
            const match = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
            let isIE = false;

            if (match !== -1) {
                isIE = true;
            }

            return isIE;
        };

        // Edge 20+
        let isEdge = !isIE && !!window['StyleMedia'];

        // Chrome 1+
        let isChrome = !!window['chrome'] && !!window['chrome']['webstore'];

        // Blink engine detection
        let isBlink = (isChrome || isOpera) && !!window['CSS'];*/

    }



    //OS 체크
    // setCheckOs(checkOs: number) {
    //     this.store.dispatch(VuexTypes.SET_CHECK_OS, checkOs)
    // }
    // checkOs() {
    //     return this.store.state.state.checkOs
    // }
}

