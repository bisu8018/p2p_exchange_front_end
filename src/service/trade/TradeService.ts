import AxiosService from "@/service/AxiosService";
import Trade from "@/vuex/model/Trade";
import MainRepository from "@/vuex/MainRepository";

export default {
    tradeView: {
        tradeInfo : function (callback: any) {
            AxiosService._requestWithBody('tradeView', 'GET', '',
                function (data: any) {
                    alert(1);
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        }
    }
}
