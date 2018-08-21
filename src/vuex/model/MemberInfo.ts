export default class MemberInfo {
    name: string;
    rank: number;
    isLogin: boolean;
    color : string;
    security_deposit : number;
    tradeRate : number;
    totalTrades: number;
    trades_inMonth: number;
    Avg_release: number;
    register_datetime: string;
    verifiedEmail: boolean;
    verifiedID: boolean;
    verifiedPhone: boolean;
    verifiedAdvanced: boolean;


    constructor (data: any) {
        this.name = data.name;
        this.rank = data.rank;
        this.isLogin = data.isLogin ;
        this.color = data.color ;
        this.security_deposit = data.security_deposit ;
        this.tradeRate = data.tradeRate;
        this.totalTrades = data.totalTrades;
        this.trades_inMonth = data.trades_inMonth;
        this.Avg_release = data.Avg_release;
        this.register_datetime = data.register_datetime;
        this.verifiedEmail = data.verifiedEmail;
        this.verifiedID = data.verifiedID;
        this.verifiedPhone = data.verifiedPhone;
        this.verifiedAdvanced = data.verifiedAdvanced;
    }

    isNull (): boolean {
        return (this.name === undefined || this.name === '')
    }
}