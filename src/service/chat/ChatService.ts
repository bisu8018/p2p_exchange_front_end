import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
    message: {
        // CNY, USDT 코인 환율 select
        getMessage: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('message', 'GET', data ,
                function (data: any) {

                    callback(data);
                },
                function () {

                })
        },
        postMessage: function (data: any, callback: any) {
            AxiosService._requestWithBody('message', 'POST', data ,
                function (data: any) {
                    callback(data)
                },
                function () {
                })
        },
    }
}

