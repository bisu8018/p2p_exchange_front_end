import AxiosService from "@/service/AxiosService";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import User from "@/vuex/model/User";
import MainRepository from "@/vuex/MainRepository";


export default {
    Account: {
        login: function (data: any, callback: any) {

            let user = new User(data);
            // vuex 로 유저 넣기
            //MainRepository.User.controller().setUser(user);

            callback();

            AxiosService._requestWithBody('/signin', 'POST', data,
                function (data: any) {
                    return data;
                },
                function () {

                })
        },
        signup: function (data: any, callback: any) {
            AxiosService._requestWithBody('/signup', 'POST', data,
                function (data: any) {
                    return data;
                },
                function () {
                })
        }
    }
}

