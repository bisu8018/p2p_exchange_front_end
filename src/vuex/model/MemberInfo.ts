export default class MemberInfo {
    name: string;
    nickName: string;
    email : string;
    rank: number;
    isLogin: boolean;
    color : string;
    securityDeposit : number;
    completionRate : number;
    tradeTimes: number;
    tradeMonthTimes: number;
    avgRelease: number;
    createDatetime: string;
    emailVerification: boolean;
    idVerification: boolean;
    phoneVerification: boolean;
    advancedVerification: boolean;


    constructor (data: any) {
        this.name = data.name;
        this.email = data.email || '';
        this.nickName = data.nickName;
        this.rank = data.rank || 1;
        this.isLogin = data.isLogin;
        this.color = data.color ;
        this.securityDeposit = data.securityDeposit ;
        this.completionRate = data.completionRate;
        this.tradeTimes = data.tradeTimes;
        this.tradeMonthTimes = data.tradeMonthTimes;
        this.avgRelease = data.avgRelease;
        this.createDatetime = data.createDatetime;
        this.emailVerification = data.emailVerification || false;
        this.idVerification = data.idVerification || false;
        this.phoneVerification = data.phoneVerification || false;
        this.advancedVerification = data.advancedVerification || false;
    }

    isNull (): boolean {
        return (this.name === undefined || this.name === '')
    }
}