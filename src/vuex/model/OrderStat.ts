export default class OrderStat {
    securityDeposit : number;
    completionRate : number;
    tradeTimes : number;
    tradeMonthTimes : number;
    avgRelease : number;

    constructor(data: any) {
        this.securityDeposit = data.securityDeposit;
        this.completionRate = data.completionRate;
        this.tradeTimes = data.tradeTimes;
        this.tradeMonthTimes = data.tradeMonthTimes;
        this.avgRelease = data.avgRelease;
    }
}