import {VuexTypes} from "../config/VuexTypes";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        accountList : [
            {
                email : 'test@test.com', password:'test1234!'
            }
        ]
    },
    mutations: {
        [VuexTypes.SIGNUP_ACCOUNT] : (state, payload) => {
            alert("test state.ts");
        }
    }
})

export default {
    store
}
