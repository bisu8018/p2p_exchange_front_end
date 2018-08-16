import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
    info: {
        // CNY, USDT 코인 환율 select
        getMarketPrice: function (callback: any) {
            AxiosService._requestWithBody('marketPrice', 'GET', '' ,
                function (data) {
                    callback(data);
                    return;
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
    },
    fileUpload: {
        //파일 업로드
        fileUpload: function (data:any, callback: any) {
            AxiosService._requestWithUrlPram('file','POST',data,
                function (data) {
                    callback(data);
                    return;
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    }
}

