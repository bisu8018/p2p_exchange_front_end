import AxiosService from "@/service/AxiosService";

export default {
    searchTradeView: {
        searchTradeInfo : function (callback: any) {
            AxiosService._requestWithBody('searchTradeView', 'POST', "",
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        }
    }
}
