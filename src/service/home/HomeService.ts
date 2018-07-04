import AxiosService from "@/service/AxiosService";


export default {
    getInitValue: function (callback: any) {
      AxiosService._request(
        'webdata/initialvalue', 'GET', '',
        callback,
        function () { }
      )
    },

    User: {
        getUser: function (callback: any) {
            AxiosService._request('user/myInfo', 'GET', '',
                function (data: any) {
                },
                function () {
                })
        },

        updateUser: function (data: any, callback: any) {
            AxiosService._requestWithBody('user', 'PUT', data,
                function (data: any) {
                },
                function () {
                })
        },
    },

    Bot: {
        stopBot: function (botId: number, callback: any) {
            AxiosService._requestWithPath('bot/' + botId + '/running/stop', 'PUT', '',
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },

        updateTradingVolume: function (botId: number,
                                       buyTradeMaxType: string, buyTradeMax: string,
                                       sellTradeMaxType: string, sellTradeMax: string,
                                       isUpdateBuyMax: boolean, isUpdateSellMax: boolean,
                                       callback: any) {

            AxiosService._requestWithPath('bot/' + botId + '/buyTradeMax' + '?' +
                'buyTradeMaxType=' + buyTradeMaxType +
                '&buyTradeMax=' + buyTradeMax +
                '&sellTradeMaxType=' + sellTradeMaxType +
                '&sellTradeMax=' + sellTradeMax +
                '&isUpdateBuyMax=' + isUpdateBuyMax +
                '&isUpdateSellMax=' + isUpdateSellMax
                , 'PUT', '',
                function (data: any) {
                },
                function () {
                })
        },

        deleteBot: function (botId: number, callback: any) {
            let data = {
                "botId" : botId
            }

            AxiosService._requestWithUrlPram('bot', 'DELETE', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
    },

}
