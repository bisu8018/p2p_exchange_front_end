export default class Order {
    adNo : number;
    amount : number;
    coinCount : number;
    cryptocurrency: string;
    currency : string;
    customerMemberNo : number;
    fileContent: string;
    getMyPaymentMethodSelectList : string;
    memberNo: string;
    merchantMemberNo : number;
    nickname: string;
    orderNo: number;
    paymentMethods : string;
    paymentWindow : string;
    price : number;
    referenceNo : number;
    registerDatetime : object;
    status : string;
    tradeType : string;


    constructor (data: any) {
        this.orderNo = Number(data.orderNo) || 0;
        this.referenceNo = Number(data.referenceNo) || 0;
        this.adNo = Number(data.adNo) || 0;
        this.cryptocurrency = this.transCryptocurrency(data.cryptocurrency)
        this.fileContent = data.fileContent;
        this.merchantMemberNo = Number(data.merchantMemberNo) || 0;
        this.customerMemberNo = Number(data.customerMemberNo) || 0;
        this.currency = data.currency;
        this.status = data.status || '';
        this.price = Number(data.price) || 0;
        this.coinCount = Number(data.coinCount) || 0;
        this.amount = Number(data.amount) || 0;
        this.getMyPaymentMethodSelectList = data.getMyPaymentMethodSelectList || '';
        this.memberNo = data.memberNo;
        this.nickname = data.nickname || '';
        this.paymentMethods = data.paymentMethods || '';
        this.paymentWindow = data.paymentWindow || '';
        this.registerDatetime = data.registerDatetime || '';
        this.tradeType = data.tradeType || '';

    }

    transCryptocurrency(cryptocurrency){
        switch (cryptocurrency) {
            case 'bitcoin':
                return 'BTC'

            case 'ethereum':
                return 'ETH'
            default:
                return 'ALLB'
        }
    }
}




