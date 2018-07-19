import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/User";
import MainRepository from "@/vuex/MainRepository";

export default {
    Account: {
        login: function (userName: string, passwd: string, callback: any) {
            let user = new User('');
            // vuex 로 유저 넣기
            /*MainRepository.User.controller().setUser(user);
            */
            //callback();

            let data = '';

            AxiosService._requestWithBody('/signin', 'GET', '' ,
                function (data: any) {

                    callback(data);
                },
                function () {

                })
        },
        signup: function (data: any, callback: any) {
            AxiosService._requestWithBody('signup', 'POST', data ,
                function (data: any) {
                callback(data)
                },
                function () {
                })
        },
        sendVerificationCode: function (data: any, callback: any) {
            AxiosService._requestWithBody('sendValidationCode', 'POST', data ,
                function (data: any) {
                    callback(data)
                },
                function () {
                })
        }
    }
}

