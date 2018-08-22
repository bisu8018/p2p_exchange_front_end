import AxiosService from "@/service/AxiosService";
import MainRepository from "@/vuex/MainRepository";

// 페이지네이션, 트레이드센터 데이터 및 트레이드센터 필터 포함 공통
export default {
    addOrder: function (data: any, callback: any) {
        AxiosService._requestWithPath('order', 'POST', data ,
            function (data: any) {
                callback(data)
            },
            function () {
                //실패시 이곳을 타게됨
            })
    },
    getMyOrder:function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('order/my', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () {
                //실패시 이곳을 탐
            })
    },
    getOrder: function (orderNo : number, callback: any) {
        let data = { email: MainRepository.MyInfo.getUserInfo().email };
        AxiosService._requestWithUrlPram('order/' + orderNo, 'GET', data,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onPaid : function (data : any, callback: any) {
        let url = 'order/' + data + '/paid';
        AxiosService._requestWithPath(url, 'PUT', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onCancel : function (data : any, callback: any) {
        AxiosService._requestWithBodyAndEmail('order/cancel', 'PUT', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onAppeal : function (data : any, callback: any) {
        AxiosService._requestWithPath('order/appeal', 'PUT', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    onConfirm : function (data : any, callback: any) {
        let url = 'order/' + data.orderNo + '/confirmAndRelease';
        let _data = {
            tradePassword : data.tradePassword
        };
        AxiosService._requestWithBodyAndEmail(url, 'PUT', _data,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    }

}
