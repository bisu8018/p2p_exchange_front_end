import Withdraw from './Withdraw';

export default class Order {
    email: string;
    unreadMessageCount: number;
    amount: number;
    coinCount: number;

    currency: string;
    customerMemberNo: number;
    fileContent: string;

    merchantMemberNo: number;

    orderNo: number;

    paymentWindow: string;
    price: number;
    referenceNo: number;
    registerDatetime: object;
    status: string;
    tradeType: string;
    merchantEmail: string;
    customerEmail: string;
    merchantNickname: string;
    customerNickname: string;


    constructor(data: any) {
        this.orderNo = Number(data.orderNo) || 0;
        this.email = data.email;
        this.unreadMessageCount = Number(data.unreadMessageCount);
        this.referenceNo = Number(data.referenceNo) || 0;


        this.fileContent = data.fileContent;
        this.merchantMemberNo = Number(data.merchantMemberNo) || 0;
        this.customerMemberNo = Number(data.customerMemberNo) || 0;
        this.currency = data.currency;
        this.status = data.status || '';
        this.price = Number(data.price) || 0;
        this.coinCount = Number(data.coinCount) || 0;
        this.amount = Number(data.amount) || 0;

        this.paymentWindow = data.paymentWindow || '';
        this.registerDatetime = data.registerDatetime || '';
        this.tradeType = data.tradeType || '';
        this.merchantEmail = data.merchantEmail || '';
        this.customerEmail = data.customerEmail || '';
        this.merchantNickname = data.merchantNickname || '';
        this.customerNickname = data.customerNickname || '';
    }
}






