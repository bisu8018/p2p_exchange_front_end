import AxiosService from "@/service/AxiosService";

export default {
    generateToken: function (data: any, callback: any, failure: any) {
        AxiosService._requestWithBody('customtoken', 'POST', data,
            function (data: any) {
                callback(data);
            },
            function (data: any) {
            failure(data);
            })
    },
    getMyToken: function (callback: any) {
        AxiosService._requestWithBody('customtoken/my', 'GET', '',
            function (data: any) {
                callback(data);
            },
            function (data: any) {

            })
    },
    generateTokenWallet: function (tokenNo: any, callback: any) {
        let url = 'customtoken/'+tokenNo+'/wallet'
        AxiosService._requestWithPath(url, 'PUT', '',
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },
}

