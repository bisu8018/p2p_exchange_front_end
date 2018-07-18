import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/User";
import MainRepository from "@/vuex/MainRepository";

export default {
    AD: {
        // CNY, USDT 코인 환율 select
        getMarketPrice: function (callback: any) {
            AxiosService._requestWithBody('/exchangeRate', 'GET', '' ,
                function (data: any) {

                    callback(data);
                },
                function () {

                })
        },
        postAD: function (data: any, callback: any) {
            AxiosService._requestWithBody('/postAD', 'POST', data ,
                function (data: any) {
                callback(data)
                },
                function () {
                })
        }
    }
}

