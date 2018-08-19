export default class Order {
    adNo : number;
    amount : number;
    coinCount : number;
    customerMemberNo : number;
    merchantMemberNo : number;
    orderNo: number;
    price : number;
    referenceNo : number;
    status : string;




    constructor (data: any) {
        this.orderNo = Number(data.orderNo) || 0;
        this.referenceNo = Number(data.referenceNo) || 0;
        this.adNo = Number(data.adNo) || 0;
        this.merchantMemberNo = Number(data.merchantMemberNo) || 0;
        this.customerMemberNo = Number(data.customerMemberNo) || 0;
        this.status = data.status || '';
        this.price = Number(data.price) || 0;
        this.coinCount = Number(data.coinCount) || 0;
        this.amount = Number(data.amount) || 0;
    }
}


