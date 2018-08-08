import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
    info: {
        // CNY, USDT 코인 환율 select
        getMarketPrice: function (callback: any) {
            AxiosService._requestWithBody('marketPrice', 'GET', '' ,
                function (data: any) {
                    callback(data);
                },
                function () {

                })
        },
    }
}

