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
            AxiosService._requestWithBodyAndEmail('ad', 'POST', data ,
                function (data: any) {
                callback(data)
                },
                function () {
                })
        },
        getMyAds:function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('ad/my', 'GET', data ,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                //실패시 여기로옴
                })
        },
        // 다른 유저의 과거 정보 get
        getUserPageHistoryInfo: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('order/member/stats', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                    //실패시 여기로
                })
        },
        // 다른 유저가 올린 AdsList get
        getUserPageAdsList: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('ad/member', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                    //실패시 여기로
                })
        },


}

