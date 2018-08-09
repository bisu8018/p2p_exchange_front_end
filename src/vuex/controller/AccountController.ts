import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Account from "@/vuex/model/Account";

export default class AccountController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setUserInfo(userInfo: Account) {
        this.store.dispatch(VuexTypes.SET_USER_INFO, userInfo);
    }

    getUserInfo() {
        return this.store.state.account.UserInfo;
    }
}

