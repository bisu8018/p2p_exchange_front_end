import AxiosService from "@/service/AxiosService";


export default {
    listView: {
        receiveTradeData: function (data: any, callback: any) {
            AxiosService._requestWithBody('/tradeCenter', 'POST', data,
                function (data: any) {
                    callback(data);
                    return data;
                },
                function () {

                })
        }
    }
}
