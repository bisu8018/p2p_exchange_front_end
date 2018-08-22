import AxiosService from "@/service/AxiosService";

export default {
    getMySecurityBalance : function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('balance/security', 'GET', data ,
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },
    getBalances : function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('balance', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    postWithdraw: function (data: any, callback: any) {
        AxiosService._requestWithBodyAndEmail('balance', 'POST', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
}