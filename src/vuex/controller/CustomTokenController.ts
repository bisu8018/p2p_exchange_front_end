import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import CustomToken from "@/vuex/model/CustomToken";

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

    //토큰 찾기   (type : no, name)
    // ex MainRepository.MyToken.controller().findCustomToken(this.customTokenNo, 'no').tokenName
    findCustomToken(data,type) {
        let token = this.getCustomTokenList().find(function (element) {
            let compared = (type === 'no' ? element.tokenNo : element.tokenName);
            if( data === compared){
                return element;
            }
        });
        return token;
    }
}

