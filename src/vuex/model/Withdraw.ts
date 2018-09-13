export default class Withdraw {

    addressTo: string;
    amount: number;
    cryptocurrency: string;
    fee: number;
    ownerMemberNo: number;
    receiveAmount: number;


    constructor(data: any) {
        this.addressTo = data.addressTo || '';
        this.amount = data.amount || '';
        this.cryptocurrency = data.cryptocurrency || '';
        this.fee = data.fee || '';
        this.ownerMemberNo = data.ownerMemberNo || '';
        this.receiveAmount = data.receiveAmount || '';
    }

}






