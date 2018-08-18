import selectBox from "@/vuex/modules/selectBox";
import state from "@/vuex/modules/state";
import trade from "@/vuex/modules/trade";
import merchant from "@/vuex/modules/merchant";
import pagination from "@/vuex/modules/pagination";
import account from "@/vuex/modules/account";
import mytrade from "@/vuex/modules/mytrade";
import marketPrice from "@/vuex/modules/marketPrice";
import common from "@/vuex/modules/common";



export default {
    modules: {
        selectBox,
        state,
        trade,
        merchant,
        pagination,
        account,
        mytrade,
        marketPrice,
        common
    },
    strict: true
}
