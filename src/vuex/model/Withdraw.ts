export default class Withdraw {

    addressTo: string;
    amount: number;
    cryptocurrency: string;
    tokenNo : number;
    fee: number;
    ownerMemberNo: number;
    receiveAmount: number;


    constructor(data: any) {
        this.addressTo = data.addressTo || '';
        this.amount = data.amount || '';
        this.cryptocurrency = data.cryptocurrency || '';
        this.tokenNo = data.tokenNo || '';
        this.fee = data.fee || '';
        this.ownerMemberNo = data.ownerMemberNo || '';
        this.receiveAmount = data.receiveAmount || '';
    }

}






