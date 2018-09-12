
export default class CustomToken {
    decimalCount : number;
    description: string;
    mainnetYn: string;
    registerMemberNo: number;
    reissueYn: string;
    status: string;
    symbolImgUrl: string;
    tokenName: string;
    tokenNo: number;
    tradeTokens: number;

    constructor (data: any) {
        this.decimalCount = data.decimalCount;
        this.description = data.description;
        this.mainnetYn = data.mainnetYn;
        this.registerMemberNo = data.registerMemberNo;
        this.reissueYn = data.reissueYn;
        this.status = data.status;
        this.symbolImgUrl = data.symbolImgUrl;
        this.tokenName = data.tokenName;
        this.tokenNo = data.tokenNo;
        this.tradeTokens = data.tradeTokens;
    }

    isNull (): boolean {
        return (this.tokenNo === undefined)
    }
}


