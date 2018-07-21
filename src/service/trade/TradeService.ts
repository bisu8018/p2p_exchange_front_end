import AxiosService from "@/service/AxiosService";
import Trade from "@/vuex/model/Trade";
import MainRepository from "@/vuex/MainRepository";

export default {
    tradeView: {
        //+ "&limitMin=" + limitMin
        tradeTotalInfo : function (token: string, adType: string, country: string, currency: string, limitMin: number, callback: any) {
            AxiosService._requestWithBody('tradePageCount?token='+ token + '&adType='+ adType + '&country=' + country
                + '&currency=' + currency
                , 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        },
        //+ "&limitMin=" + limitMin
        tradePageInfo : function (page: number, token: string, adType: string, country: string, currency: string, limitMin: number, callback: any) {
            AxiosService._requestWithBody('tradeView?size=10&page='+ page + '&token='+ token + '&adType='+ adType + '&country=' + country
                + '&currency=' + currency
                ,'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        },
    }
}
