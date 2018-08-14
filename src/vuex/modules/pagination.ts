import {VuexTypes} from "@/vuex/config/VuexTypes";



const mutations = {
    // -                   현재 상태                             -
    // 페이지네이션 수
    [VuexTypes.SET_PAGE_DATA] (state: any, page: number) {
        state.Page = page;
    },
    //  전체아이템이 몇개인지
    [VuexTypes.SET_TOTALCOUNT_DATA] (state: any, totalCount: number) {
        state.totalCount = totalCount;
    },

};


const actions = {
    // -                   현재 상태                             -
    // 페이지네이션 수
    [VuexTypes.SET_PAGE_DATA] (context: any, page: number) {
        context.commit(VuexTypes.SET_PAGE_DATA, page)
    },
    //  전체아이템이 몇개인지
    [VuexTypes.SET_TOTALCOUNT_DATA] (context: any, totalCount: number) {
        context.commit(VuexTypes.SET_TOTALCOUNT_DATA, totalCount)
    },

};

const getters = {
};

let page : number  =  1;
let totalCount : number  =  0;


const state= {

    Page: page,
    totalCount : totalCount,

}

export default {
    namespaced: false,
    actions,
    getters,
    state,
    mutations
}
