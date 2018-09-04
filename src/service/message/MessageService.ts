import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
    message: {
        // CNY, USDT 코인 환율 select
        getMessage: function (data: any, callback: any) {
            let url = 'message/' + data.orderNo;
            AxiosService._requestWithUrlPram(url, 'GET', data ,
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
        postImg: function (data: any, callback: any) {
            let url = 'message_with_file?orderNo=' + data.orderNo;
            AxiosService._requestWithOnlyBody(url,'POST',data.file,
                function (data) {
                    callback(data);
                    return;
                },
                function () {
                })
        }
    }
}

