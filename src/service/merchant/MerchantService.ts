import AxiosService from "@/service/AxiosService";
import MainRepository from "@/vuex/MainRepository";

export default {

    postMerchant: function (callback: any){
        AxiosService._requestWithBodyAndEmail('merchant','POST', '',
            function () {
                callback();
            },
            function () {
            })
    },
    getMerchant: function (callback: any) {
        AxiosService._requestWithBodyAndEmail('merchant', 'GET', MainRepository.MyInfo.getUserInfo().email,
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },

}
