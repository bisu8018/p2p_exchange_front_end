import AxiosService from "@/service/AxiosService";
import MainRepository from "../../vuex/MainRepository"
// 페이지네이션, 트레이드센터 데이터 및 트레이드센터 필터 포함 공통

export default {
    tradeView: {
        tradePage: function (data: any, callback: any) {
            let tokenNo = MainRepository.MyToken.getCustomTokenNo();
            let url = 'trade'
            // CustomTokenTrade 일경우
            if(tokenNo !== -1){
                url = 'trade/custom/token/'+tokenNo
            }
            AxiosService._requestWithUrlPram(url, 'GET', data ,
                function (data: any) {
                    callback(data)
                },
                function () {
                
                    console.log('실패');
                })
        },
    }
}
