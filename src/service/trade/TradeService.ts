import AxiosService from "@/service/AxiosService";

// 페이지네이션, 트레이드센터 데이터 및 트레이드센터 필터 포함 공통
export default {
    tradeView: {
        tradePage: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('ad', 'GET', data ,
                function (data: any) {
                    callback(data)
                },
                function () {
                
                    console.log('실패');
                })
        },
    }
}
