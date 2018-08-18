import AxiosService from "@/service/AxiosService";

export default {
    getMySecurityDeposit : function (data: any, callback: any) {
        AxiosService._requestWithBody('balance/security', 'GET', data ,
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
    }
}