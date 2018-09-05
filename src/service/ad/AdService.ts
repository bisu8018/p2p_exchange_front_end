import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
    // CNY, USDT 코인 환율 select
    getUserInfo: function (callback: any) {
        AxiosService._requestWithBody('/postAdInfo', 'GET', '',
            function (data: any) {

                callback(data);
            },
            function () {
            })
    },
    postAD: function (data: any, callback: any, failure: any) {
        AxiosService._requestWithBodyAndEmail('ad', 'POST', data,
            function (data: any) {
                callback(data)
            },
            function (code: any) {
                failure(code)
            })
    },
    editAD: function (data: any, callback: any, failure: any) {
        AxiosService._requestWithBodyAndEmail('ad', 'PUT', data,
            function (data: any) {
                callback(data)
            },
            function (code: any) {
                failure(code)
            })
    },
    deleteAD: function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('ad/delete', 'PUT', data,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    disableAD: function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('ad/disable', 'PUT', data,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    enableAD: function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('ad/enable', 'PUT', data,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    getMyAds: function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('ad/my', 'GET', data,
            function (data: any) {
                callback(data)
            },
            function (error) {
            })
    },
    getAd: function (data: any, callback: any) {
        let url = 'ad/' + data;
        AxiosService._requestWithBodyAndEmail(url, 'GET', '',
            function (data: any) {
                callback(data)
            },
            function (error) {
            })
    },
    // 다른 유저의 과거 정보 get
    getUserPageHistoryInfo: function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('order/member/stats', 'GET', data,
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },
    // 다른 유저가 올린 AdsList get
    getUserPageAdsList: function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('ad/member', 'GET', data,
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },


}

