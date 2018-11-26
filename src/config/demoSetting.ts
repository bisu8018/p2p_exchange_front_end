import {MerchantStatus} from "@/vuex/model/Merchant";

export default {
    demoSetting: function () {
        return true
    },
    getDemoData: function (url) {
        switch (url) {
            case 'customtoken' :
                const customToken = [
                    {
                        decimalCount: 10,
                        description: "Demo token for everyone!",
                        mainnetYn: false,
                        registerMemberNo: 0,
                        reissueYn: 'n',
                        status: 'custom',
                        symbolImgUrl: 'assets/img/demo_token.png',
                        tokenName: "DMT",
                        tokenNo: '0',
                        tradeTokens: '300000',
                    }
                ];
                return customToken;

            case 'token/general' :
                const generalToken = [
                    {
                        tokenNo: "0",
                        name: "bitcoin",
                        type: 'general',
                    },
                    {
                        tokenNo: "1",
                        name: "ethereum",
                        type: 'general',
                    },
                ];
                return generalToken;

            case 'member/my' :
                const my =
                    {
                        memberNo: "1",
                        bgColor: "#81bf44",
                        email: "demo0070@demo.co.kr",
                        membershipLevel: "none",
                        nationality: "KR",
                        nickname: "coin_zombie",
                        phoneNumber: "+821012345678",
                        role: 'ROLE_CUSTOMER',
                        createDatetime: '1542264071864',
                        tradeTimes: 15,
                        processingOrderCount: 12,
                        isIdVerified: true,
                    }
                ;
                return my;


            case 'balance' :
                const balance = [
                    {
                        ownerMemberNo: 1,
                        cryptocurrency: 'bitcoin',
                        cryptocurrencyType: 'general',
                        depositType: '',
                        ownerEmail: 'demo0070@demo.co.kr',
                        availableAmount: 100,
                        frozenAmount: 9900,
                        walletAddress: '10SDFSDF324CSDSDF234324CDSF324323234000',
                        btcAmount: 1000
                    },
                ];
                return balance;

            case 'balance/customtoken' :
                const customtokenBalance = [
                    {},
                ];
                return customtokenBalance;

            case 'balance/security' :
                const securityBalance = [
                    {},
                ];
                return securityBalance;

            case 'merchant' :
                const merchant =
                    {
                        memberNo: 1,
                        status: 'verified',
                    };
                return merchant;

            case 'marketPrice' :
                const marketPrice = [
                    {
                        exchange: 'COINMARKETCAP',
                        cryptocurrency: 'bitcoin',
                        currency: 'USD',
                        price: 5666.4257812
                    },
                    {
                        exchange: 'COINMARKETCAP',
                        cryptocurrency: 'bitcoin',
                        currency: 'KRW',
                        price: 6389984.711447942
                    },
                    {
                        exchange: 'COINMARKETCAP',
                        cryptocurrency: 'bitcoin',
                        currency: 'CNY',
                        price: 39296.2795104517
                    },
                    {
                        exchange: 'COINMARKETCAP',
                        cryptocurrency: 'ethereum',
                        currency: 'USD',
                        price: 180.255395919
                    },
                    {
                        exchange: 'COINMARKETCAP',
                        cryptocurrency: 'ethereum',
                        currency: 'KRW',
                        price: 203394.781093122
                    },
                    {
                        exchange: 'COINMARKETCAP',
                        cryptocurrency: 'ethereum',
                        currency: 'CNY',
                        price: 1250.9172825347
                    },
                ];
                return marketPrice;

            case 'payment' :
                const payment = [
                    {
                        activeYn: 'y',
                        alipayId: 'ali_demo_id',
                        alipayQrCodeImgUrl: 'assets/img/alipay_qr.png',
                        memberNo: 1,
                        modifyDatetime: null,
                        modifyMemberNo: 1,
                        registerDatetime: null,
                        registerMemberNo: 1,
                        type: 'alipay',
                        tradePassword: 'test1234!',
                    },
                    {
                        activeYn: 'y',
                        memberNo: 1,
                        modifyDatetime: null,
                        modifyMemberNo: 1,
                        registerDatetime: null,
                        registerMemberNo: 1,
                        type: 'wechat',
                        wechatId: 'wechat_demo_id',
                        wechatQrCodeImgUrl: 'assets/img/wechatpay_qr.png',
                        tradePassword: 'test1234!',
                    },
                ];
                return payment;


            case 'customtoken/my' :
                const customtokenMy = [
                    {},
                ];
                return customtokenMy;

        }

    }
}