import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/User";
import MainRepository from "@/vuex/MainRepository";

export default {
    Account: {
        signup: function (data: any, callback: any) {
            AxiosService._requestWithBody('member', 'POST', data ,
                function (data: any) {
                callback(data)
                },
                function () {
                })
        },
        sendVerificationCode: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('signUpVerification', 'POST', data ,
                function (data: any) {
                    callback(data)
                },
                function () {
                })
        },
        checkVerificationCode: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('signUpVerification', 'PUT', data ,
                function (data: any) {
                    callback(data)
                },
                function () {
                })
        }
    }
}

