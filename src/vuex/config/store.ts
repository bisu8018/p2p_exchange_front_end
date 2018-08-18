import selectBox from "@/vuex/modules/selectBox";
import state from "@/vuex/modules/state";
import trade from "@/vuex/modules/trade";
import merchant from "@/vuex/modules/merchant";
import pagination from "@/vuex/modules/pagination";
import account from "@/vuex/modules/account";
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
        marketPrice,
        common
    },
    strict: true
}
