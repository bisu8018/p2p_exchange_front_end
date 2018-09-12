export default class CustomToken {
    registerMemberNo: number;
    modifyMemberNo: number;
    tokenNo: number;
    status : string;
    symbolImgUrl : string;
    tokenName  : string;
    tokenNameShort: string;
    description: string;
    decimalCount: number;
    tradeTokens : string;
    reissueYn : boolean;
    mainnetYn  : boolean;



    constructor(data: any) {
        this.registerMemberNo = data.registerMemberNo;
        this.modifyMemberNo = data.modifyMemberNo;
        this.tokenNo = data.tokenNo;
        this.status = data.status;
        this.symbolImgUrl = data.symbolImgUrl;
        this.tokenName = data.tokenName;
        this.tokenNameShort = data.tokenNameShort;
        this.description = data.description;
        this.decimalCount = data.decimalCount;
        this.tradeTokens = data.tradeTokens;
        this.reissueYn = data.reissueYn;
        this.mainnetYn = data.mainnetYn;
    }

}