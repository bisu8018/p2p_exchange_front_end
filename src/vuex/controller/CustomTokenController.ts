import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import CustomToken from "@/vuex/model/CustomToken";
import MarketPrice from "@/vuex/model/MarketPrice";

export default class CustomTokenController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setMyToken(tokenInfo: CustomToken) {
        this.store.dispatch(VuexTypes.SET_MY_TOKEN, tokenInfo);
    }

    getMyToken() {
        return this.store.state.customToken.tokenInfo;
    }

    setCustomTokenList(customTokenList : CustomToken[]) {
        this.store.dispatch(VuexTypes.SET_CUSTOMTRADETOKEN_LIST, customTokenList);
    }

    getCustomTokenList() {
        return this.store.state.customToken.customTokenList;
    }
}

