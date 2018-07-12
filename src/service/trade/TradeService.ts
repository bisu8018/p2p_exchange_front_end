import AxiosService from "@/service/AxiosService";
import Trade from "@/vuex/model/Trade";
import MainRepository from "@/vuex/MainRepository";

export default {
    tradeView: {
        tradeInfo : function (data: any, callback: any) {
            //모델 정의
            //let trade  = new Trade(data);
            //뷰엑스 모델 데이터 셋
            AxiosService._requestWithBody('tradeView', 'GET', data,
                function (data: any) {
                    alert(data);
                    //MainRepository.TradeView.setTradeView(data);
                    return data;

                },
                function (error) {
                    console.log(error);
                })
        }
    }
}
