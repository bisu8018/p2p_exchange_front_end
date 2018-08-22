import selectBox from "@/vuex/modules/selectBox";
import state from "@/vuex/modules/state";
import trade from "@/vuex/modules/trade";
import merchant from "@/vuex/modules/merchant";
import pagination from "@/vuex/modules/pagination";
import account from "@/vuex/modules/account";
import mytrade from "@/vuex/modules/mytrade";
import marketPrice from "@/vuex/modules/marketPrice";
import balance from "@/vuex/modules/balance";
import tradeProcess from "@/vuex/modules/tradeProcess";
import msgAvatar from "@/vuex/modules/msgAvatar";
import message from "@/vuex/modules/message";



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
        balance,
        tradeProcess,
        msgAvatar,
        message
    },
    strict: true
}
