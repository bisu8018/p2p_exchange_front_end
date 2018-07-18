import AxiosService from "@/service/AxiosService";
import Trade from "@/vuex/model/Trade";
import MainRepository from "@/vuex/MainRepository";

export default {
    tradeView: {
        tradeTotalInfo : function (token: string, adType: string, callback: any) {
            AxiosService._requestWithBody('tradePageCount?token='+ token + '&adType='+ adType, 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        },
        tradePageInfo : function (page: number, token: string, adType: string, callback: any) {
            AxiosService._requestWithBody('tradeView?size=10&page='+ page + '&token='+ token + '&adType='+ adType ,'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        },
        // tradeTotalInfo : function (callback: any) {
        //     AxiosService._requestWithBody('tradeView', 'GET', '',
        //         function (data: any) {
        //             callback(data);
        //         },
        //         function (error) {
        //             console.log(error);
        //         })
        // },
    }
}
