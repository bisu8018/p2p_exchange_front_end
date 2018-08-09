export default class TradeItem {
    adNo : number;
    memberNo: number;
    type : string;
    nationality: string;
    currency: string;
    tradeType: string;
    cryptocurrency : string;
    priceType : string;
    fixedPrice : number;
    volume : number;
    minLimit : number;
    maxLimit : number;
    paymentWindow : number;
    paymentMethods : string;
    autoReply : string;
    termsOfTransaction : string;
    counterpartyFilterTradeCount : number;
    counterpartyFilterAdvancedVerificationYn : boolean;
    counterpartyFilterMobileVerificationYn : boolean;
    counterpartyFilterDoNotOtherMerchantsYn : boolean;
    termsAgreeYn : number;

    //postAD에 없는 userData
    email : string;
    isLogin : boolean;
    color : string;
    tradeRate: number;
    rank : number;
    bank_account: string;
    wechat_id: string;
    alipay_id: string;
    // volume: number; // 이건 위의 volume이랑 다른 것임. 차후 재설정 필요.





    constructor (data: any) {
        this.adNo = Number(data.adNo) || -1;
        this.memberNo = Number(data.memberNo) || -1;
        this.type = data.type || '';
        this.nationality = data.nationality || '';
        this.currency = data.currency || '';
        this.tradeType = data.tradeType || '';
        this.cryptocurrency = data.cryptocurrency || '';
        this.priceType = data.priceType || '';
        this.fixedPrice = Number(data.fixedPrice) || -1;
        this.volume = Number(data.volume) || -1;
        this.minLimit = Number(data.minLimit) || -1;
        this.maxLimit = Number(data.maxLimit) || -1;
        this.paymentMethods = this.splitPayment(data.paymentMethods) || '';
        this.paymentWindow = data.paymentWindow || '';
        this.autoReply = data.autoReply || '';
        this.termsOfTransaction = data.termsOfTransaction || '';
        this.counterpartyFilterTradeCount = Number(data.counterpartyFilterTradeCount) || -1;
        this.counterpartyFilterAdvancedVerificationYn = data.counterpartyFilterAdvancedVerificationYn || '';
        this.counterpartyFilterMobileVerificationYn = data.counterpartyFilterMobileVerificationYn || '';
        this.counterpartyFilterDoNotOtherMerchantsYn = data.counterpartyFilterDoNotOtherMerchantsYn || '';
        this.termsAgreeYn = Number(data.termsAgreeYn) || -1;

        this.email = data.email || 'ABC';
        this.isLogin = data.isLogin || true;
        this.color = data.color || '#8869CA';
        this.tradeRate = Number(data.tradeRate) || 99;
        this.rank = Number(data.rank) || 1;
        this.bank_account = data.bank_account || 'n';
        this.wechat_id = data.wechat_id || 'n';
        this.alipay_id = data.alipay_id || 'n';

    }

    splitPayment(data){
        console.log(data);
        if(data.bank_account ==="y"){
            this.bank_account = 'y'
        }
        if(data.alipay ==="y"){
            this.alipay_id = 'y'
        }
        if(data.wechat_id ==="y"){
            this.wechat_id = 'y'
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


