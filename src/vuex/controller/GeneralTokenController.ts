import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import GeneralToken from "@/vuex/model/GeneralToken";


export default class GeneralTokenController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setGeneralTokenList(generalTokenList : GeneralToken[]) {
        this.store.dispatch(VuexTypes.SET_GENERAL_TOKEN_LIST, generalTokenList);
    }

    getGeneralTokenList() {
        return this.store.state.generalToken.generalTokenList;
    }


    //토큰 찾기   (type : no, name)
    // ex) MainRepository.MyToken.controller().findCustomToken(Number(this.tokenNo), 'no').tokenName
    findGeneralToken(data,type) {
        let token = this.getGeneralTokenList().find(function (element) {
            let compared = (type === 'no' ? element.tokenNo : element.tokenName);
            if( data === compared){
                return element;
            }
        });
        return token;
    }

}

