import AxiosService from "../AxiosService";

export default {
    registerAppeal : function (callback: any) {
        AxiosService._requestWithBody('appeal', 'POST', '' ,
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },
    updateAppeal : function (data: any, callback: any) {
        AxiosService._requestWithBody('appeal', 'PUT', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    getAppeal : function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('appeal', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
}