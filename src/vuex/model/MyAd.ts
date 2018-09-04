export default class MyAd {
    adNo: number;
    autoReply: string;
    termsOfTransaction : string;
    counterpartyFilterAdvancedVerificationYn : boolean;
    counterpartyFilterDoNotOtherMerchantsYn : boolean;
    counterpartyFilterMobileVerificationYn : boolean;
    counterpartyFilterTradeCount: number;
    cryptocurrency: string;
    currency: string;
    fixedPrice: number;
    margin: number;
    maxLimit: number;
    minLimit: number;
    nationality: string;
    paymentMethods: string;
    paymentWindow: string;
    priceType: string;
    tradeType: string;
    type: string;
    volume: number;
    volumeAvailable: number;
    registerMemberNo: number;

    constructor(data: any) {
        this.adNo = Number(data.adNo) ;
        this.autoReply = data.autoReply ;
        this.termsOfTransaction = data.termsOfTransaction ;
        this.counterpartyFilterAdvancedVerificationYn = data.counterpartyFilterAdvancedVerificationYn || false;
        this.counterpartyFilterDoNotOtherMerchantsYn = data.counterpartyFilterDoNotOtherMerchantsYn || false;
        this.counterpartyFilterMobileVerificationYn = data.counterpartyFilterMobileVerificationYn || false ;
        this.counterpartyFilterTradeCount = data.counterpartyFilterTradeCount || 0 ;
        this.cryptocurrency = data.cryptocurrency ;
        this.currency = data.currency ;
        this.fixedPrice = Number(data.fixedPrice) || 0;
        this.margin = Number(data.margin) || 0;
        this.maxLimit = Number(data.maxLimit);
        this.minLimit = Number(data.minLimit);
        this.nationality = data.nationality ;
        this.paymentMethods = data.paymentMethods ;
        this.paymentWindow = data.paymentWindow ;
        this.priceType = data.priceType ;
        this.tradeType = data.tradeType ;
        this.type = data.type ;
        this.volume = Number(data.volume) ;
        this.volumeAvailable = Number(data.volumeAvailable);
        this.registerMemberNo = Number(data.registerMemberNo);
    }

    isNull(): boolean {
        return (this.adNo === undefined || this.adNo === 0)
    }
}