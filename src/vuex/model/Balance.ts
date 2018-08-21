export default class Balance {
    ownerMemberNo: number;
    cryptoCurrency : string;
    depositType: string;
    ownerEmail : string;
    availableAmount : number;
    frozenAmount : number;
    walletAddress : string;

    constructor (data: any) {
        this.ownerMemberNo = Number(data.ownerMemberNo) || 0;
        this.cryptoCurrency = data.cryptoCurrency || '';
        this.depositType = data.depositType || '';
        this.ownerEmail = data.ownerEmail || '';
        this.availableAmount = Number(data.availableAmount) || 0;
        this.frozenAmount = Number(data.frozenAmount) || 0;
        this.walletAddress = data.walletAddress || '';
    }
}


