import MemberInfo from "@/vuex/model/MemberInfo";

export default class TradeItem {
    adNo : number;
    memberNo: number;
    nickname : string;
    bgColor: string;
    email : string;
    tradeMonthTimes: number;
    completionRate: number;
    type : string;
    currency: string;
    tradeType: string;
    cryptocurrency : string;
    priceType : string;
    fixedPrice : number;
    volume : number;
    volumeAvailable : number;
    minLimit : number;
    maxLimit : number;
    paymentMethods : string;
    termsOfTransaction : string;
    counterpartyFilterTradeCount : number;
    counterpartyFilterAdvancedVerificationYn : boolean;
    counterpartyFilterMobileVerificationYn : boolean;
    counterpartyFilterDoNotOtherMerchantsYn : boolean;
    registerDatetime : string;
    rank : number;
    bank_account: string;
    wechat_id: string;
    alipay_id: string;
    // volume: number; // 이건 위의 volume이랑 다른 것임. 차후 재설정 필요.
    ownerMember : MemberInfo;
    paymentWindow :number;



    constructor (data: any) {
        this.adNo = Number(data.adNo) || -1;
        this.memberNo = Number(data.memberNo) || -1;
        this.nickname = data.nickname || '';
        this.bgColor = data.bgColor || '';
        this.email = data.email || '';
        this.tradeMonthTimes = Number(data.tradeMonthTimes) || 0;
        this.completionRate = Number(data.completionRate) || 0;
        this.type = data.type || '';
        this.currency = data.currency || '';
        this.tradeType = this.transBuySell(data.tradeType) || '';
        this.cryptocurrency = this.transCryptocurrency(data.cryptocurrency) || '';
        this.priceType = data.priceType || '';
        this.fixedPrice = Number(data.fixedPrice) || -1;
        this.volume = Number(data.volume) || -1;
        this.volumeAvailable = Number(data.volumeAvailable) || 0;
        this.minLimit = Number(data.minLimit) || -1;
        this.maxLimit = Number(data.maxLimit) || -1;
        this.paymentMethods = data.paymentMethods || '';
        this.termsOfTransaction = data.termsOfTransaction || '';
        this.counterpartyFilterTradeCount = Number(data.counterpartyFilterTradeCount) || -1;
        this.counterpartyFilterAdvancedVerificationYn = data.counterpartyFilterAdvancedVerificationYn || false;
        this.counterpartyFilterMobileVerificationYn = data.counterpartyFilterMobileVerificationYn || false;
        this.counterpartyFilterDoNotOtherMerchantsYn = data.counterpartyFilterDoNotOtherMerchantsYn || false;
        this.registerDatetime = data.registerDatetime || '';


        this.rank = Number(data.rank) || 1;
        this.bank_account = this.splitPayment('bank_account') || '';
        this.wechat_id = this.splitPayment('wechat_id') || '';
        this.alipay_id = this.splitPayment('alipay_id') || '';

        this.ownerMember = data.ownerMember;
        this.paymentWindow = data.paymentWindow || 10;

    }

    //paymentmethods 재가공
    splitPayment(type){
        if(type === 'bank_account' && this.paymentMethods.indexOf("bankaccount") > -1 ){
           return 'y'
        }

        if(type === 'alipay_id' && this.paymentMethods.indexOf("alipay") > -1){
            return 'y'
        }

        if(type === 'wechat_id' && this.paymentMethods.indexOf("wechat") > -1){
            return 'y'
        }

    }
    //tradeType 재가공
    transBuySell(tradeType){
        switch (tradeType) {
            case 'buy':
                return 'Sell'

            case 'sell':
                return 'Buy'
        }

    }
    //cryptocurrency 재가공
    transCryptocurrency(cryptocurrency){
        switch (cryptocurrency) {
            case 'bitcoin':
                return 'BTC'

            case 'ethereum':
                return 'ETH'
        }
    }


    // update (data: any){
    //     if(data.nationality !==undefined && data.nationality !==null) this.nationality = data.nationality;
    //     if(data.currency !==undefined && data.currency !==null) this.currency = data.currency;
    //     if(data.tradeType !==undefined && data.tradeType !==null) this.tradeType = data.tradeType;
    //     if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = data.cryptocurrency;
    //     if(data.paymentMethod !==undefined && data.paymentMethod !==null) this.paymentMethod = data.paymentMethod;
    //     if(data.minLimit !==undefined && data.minLimit !==null) this.minLimit = data.minLimit;
    //     if(data.page !==undefined && data.page !==null) this.page = data.page;
    //     if(data.size !==undefined && data.size !==null) this.size = data.size;
    // }



    isNull (): boolean {
        return (this.adNo === undefined || this.adNo === -1)
    }

}


