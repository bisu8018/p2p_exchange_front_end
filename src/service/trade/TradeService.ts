import AxiosService from "@/service/AxiosService";

// 페이지네이션, 트레이드센터 데이터 및 트레이드센터 필터 포함 공통
export default {
    tradeView: {
        tradePage: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('ad', 'GET', data ,
                function (data: any) {
                    callback(data.result)
                },
                function () {
                    console.log('실패');
                })
        },

        tradeTotalInfo : function (cryptocurrency: string, tradeType: string, nationality: string, currency: string, limitMin: number, paymentMethod: string, page: number, size: number, callback: any) {
            AxiosService._requestWithBody('tradePageCount?cryptocurrency='+ cryptocurrency + '&tradeType='+ tradeType + '&nationality=' + nationality
                + '&currency=' + currency + "&limitMin=" + limitMin + "&paymentMethod=" + paymentMethod + "&page=" + page + "&size=" + size
                , 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        },
        tradePageInfo : function (page: number, token: string, adType: string, country: string, currency: string, limitMin: number, paymentMethod: string, callback: any) {
            AxiosService._requestWithBody('ad?size=10&page='+ page + '&token='+ token + '&adType='+ adType + '&country=' + country
                + '&currency=' + currency + "&limitMin=" + limitMin + "&paymentMethod=" + paymentMethod
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
