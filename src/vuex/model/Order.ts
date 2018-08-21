import PaymentMethod from './PaymentMethod';

export default class Order {
    adNo : number;
    email: string;
    unreadMessageCount : number;
    amount : number;
    coinCount : number;
    cryptocurrency: string;
    currency : string;
    customerMemberNo : number;
    fileContent: string;
    memberNo: string;
    merchantMemberNo : number;
    nickname: string;
    orderNo: number;
    paymentMethods : string;
    filteredPaymentMethod : PaymentMethod[];
    paymentWindow : string;
    price : number;
    referenceNo : number;
    registerDatetime : object;
    status : string;
    tradeType : string;
    merchantEmail : string;
    customerEmail : string;
    merchantNickname : string;
    customerNickname : string;





    constructor (data: any) {
        this.orderNo = Number(data.orderNo) || 0;
        this.email = data.email;
        this.unreadMessageCount = Number(data.unreadMessageCount);
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
        this.memberNo = data.memberNo;
        this.nickname = data.nickname || '';
        this.paymentMethods = data.paymentMethods || '';
        this.filteredPaymentMethod = [];
        for(let key in data.filteredPaymentMethod) {
            this.filteredPaymentMethod.push(new PaymentMethod(data.filteredPaymentMethod[key]));
        }
        this.paymentWindow = data.paymentWindow || '';
        this.registerDatetime = data.registerDatetime || '';
        this.tradeType = data.tradeType || '';
        this.merchantEmail = data.merchantEmail || '';
        this.customerEmail = data.customerEmail || '';
        this.merchantNickname = data.merchantNickname || '';
        this.customerNickname = data.customerNickname || '';

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




