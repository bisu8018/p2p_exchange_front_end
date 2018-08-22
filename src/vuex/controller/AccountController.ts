import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import Account from "@/vuex/model/Account";
import PaymentMethod from "@/vuex/model/PaymentMethod";

export default class AccountController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setUserInfo(userInfo: Account) {
        this.store.dispatch(VuexTypes.SET_USER_INFO, userInfo);
    }

    getUserInfo() {
        return this.store.state.account.userInfo;
    }

    setMyPaymentMethods(paymentMethods: any) {
        this.store.dispatch(VuexTypes.SET_MY_PAYMENT_METHOD, paymentMethods);
    }

    getMyPaymentMethods() {
        return this.store.state.account.myPaymentMethods;
    }

    findPaymentMethods(type) {
        let result = new PaymentMethod('');

        for(let i = 0; i < this.getMyPaymentMethods().length; i++) {
            let _item = this.getMyPaymentMethods()[i];
            if (_item.type === type) {
                result = _item;
            }
        }
        return result;
    }
}

