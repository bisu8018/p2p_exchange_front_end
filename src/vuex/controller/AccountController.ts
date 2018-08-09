import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Account from "@/vuex/model/Account";
import account from "@/vuex/modules/account";

export default class AccountController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setUserInfo(userInfo: Account) {
        this.store.dispatch(VuexTypes.SET_USER_DATA, userInfo);
    }

    getUserInfo() {
        return this.store.state.account.UserInfo;
    }
}

