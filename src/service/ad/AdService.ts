import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
        // CNY, USDT 코인 환율 select
        getUserInfo: function (callback: any) {
            AxiosService._requestWithBody('/postAdInfo', 'GET', '' ,
                function (data: any) {

                    callback(data);
                },
                function () {
                })
        },
        postAD: function (data: any, callback: any) {
            AxiosService._requestWithPath('ad', 'POST', data ,
                function (data: any) {
                callback(data)
                },
                function () {
                })
        },
        getMyAds:function (data: any, callback: any) {
            AxiosService._requestWithBody('ad/my', 'GET', data ,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },


}

