import AxiosService from "@/service/AxiosService";

// 페이지네이션, 트레이드센터 데이터 및 트레이드센터 필터 포함 공통
export default {
    addOrder: function (data: any, callback: any) {
        console.log(data);
        AxiosService._requestWithPath('order', 'POST', data ,
            function (data: any) {
                console.log('성공, addorder');
                callback(data)
            },
            function () {
                console.log('실패, addorder');
            })
    },
    getMyOrder:function (data: any, callback: any) {
        AxiosService._requestWithBody('/order/my', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function (error) {
                console.log("ERROR :::::::  " + error);
            })
    },
}
