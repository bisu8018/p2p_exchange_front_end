import AxiosService from "@/service/AxiosService";
import MainRepository from "@/vuex/MainRepository";
import qs from 'qs';
import axios from "axios";

// 페이지네이션, 트레이드센터 데이터 및 트레이드센터 필터 포함 공통
export default {
    addOrder: function (data: any, callback: any) {
        AxiosService._requestWithBodyAndEmail('order', 'POST', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    getMyOrder:function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('order/my', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () {

            })
    },
    getMyOrderAlarm: function (callback: any) {
        AxiosService._requestWithUrlPram('order/my/alarm', 'GET',
            {email : MainRepository.MyInfo.getUserInfo().email},
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },

    getMyOrderStat:function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('order/my/stats', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () { })
    },
    getOrder: function (orderNo : number, success: any, fail: any) {
        AxiosService._requestWithBodyAndEmail('order/' + orderNo, 'GET', '',
            function (data: any) {
                success(data)
            },
            function (code) {
                fail()
            })
    },
    getMyOrderDownload:function (data: any) {
        data = data || {};
        let prams = qs.stringify(data);
        let URL = ''
        if (window.location.hostname == 'localhost') {
            URL += window.location.protocol + '//' + 'localhost' + ':' + '8080' //window.location.port
        }
        URL += '/api/order/download?'+prams;
        window.open(URL);

    },
    onPaid : function (data : any, callback: any) {
        let url = 'order/' + data + '/paid';
        AxiosService._requestWithBodyAndEmail(url, 'PUT', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onCancel : function (data : any, callback: any) {
        let url = 'order/' + data.orderNo + '/cancel';
        AxiosService._requestWithBodyAndEmail(url, 'PUT', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onAppeal : function (data : any, callback: any) {
        let url = 'order/' + data.orderNo + '/appeal';
        AxiosService._requestWithBodyAndEmail(url, 'PUT', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onConfirm : function (data : any, callback: any) {
        let url = 'order/' + data.orderNo + '/confirmAndRelease';
        AxiosService._requestWithPlainBody(url, 'PUT', data.tradePassword,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onAppealCancel : function (data : any, callback: any) {
        let url = 'order/' + data.orderNo + '/appeal/' + data.appealNo + '/cancel';
        AxiosService._requestWithBodyAndEmail(url, 'PUT', data.tradePassword,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    getOrderStatus: function (data : any, callback: any) {
        let url = 'order/' + data + '/status';
        AxiosService._requestWithBodyAndEmail(url, 'GET', '',
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },

}
