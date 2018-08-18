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
    }
}