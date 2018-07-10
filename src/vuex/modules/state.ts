import {VuexTypes} from "@/vuex/config/VuexTypes";
import User from "@/vuex/model/User";


const mutations = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.INIT_COMPLETED] (state: any, isCompleted: boolean) {
        state.initCompleted = isCompleted
    },
    // 모바일
    [VuexTypes.SET_IS_MOBILE] (state: any, isMobile: boolean) {
        state.isMobile = isMobile;
    },
    // OS 체크
    [VuexTypes.SET_CHECK_OS] (state: any, checkOs: number) {
        state.checkOs = checkOs;
    },
};


const actions = {
    // -                   현재 상태                             -
    // 초기화 완료
    [VuexTypes.INIT_COMPLETED] (context: any, isCompleted: boolean) {
        context.commit(VuexTypes.INIT_COMPLETED, isCompleted)
    },
    // 모바일
    [VuexTypes.SET_IS_MOBILE] (context: any, isMobile: boolean) {
        context.commit(VuexTypes.SET_IS_MOBILE, isMobile)
    },
    // OS 체크
    [VuexTypes.SET_CHECK_OS] (context: any, checkOs: number) {
        context.commit(VuexTypes.SET_CHECK_OS, checkOs)
    },
};

const getters = {
};


let initCompleted: boolean = false;
let isMobile: boolean = false;
// OS 체크
let checkOs: number = 1;

let user: User = new User('');


const state = {
  initCompleted: initCompleted,
  isMobile: isMobile,
  //OS 체크
  checkOs: checkOs,
    user: user,
}

export default {
  namespaced: false,
  actions,
  getters,
  state,
  mutations
}
