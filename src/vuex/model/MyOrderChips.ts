export default class MyOrderChips {
    searchStartTime: any;
    searchEndTime: any;
    status: string;
    orderNo: any;
    cryptocurrencyType: string;
    cryptocurrency: string;
    tokenNo: any;
    orderType: string;
    tradeType: string;
    currency: string;

    constructor (data: any) {
        this.searchStartTime = data.searchStartTime ||'';
        this.searchEndTime = data.searchEndTime ||'';
        this.status = data.status || '';
        this.orderNo = data.orderNo || '';
        this.cryptocurrencyType = data.cryptocurrencyType || '';
        this.cryptocurrency = data.cryptocurrency  || '';
        this.tokenNo = data.tokenNo  || '';
        this.tradeType = data.tradeType || '';
        this.orderType = data.orderType || '';
        this.currency = data.currency || '';
    }

    update (data: any){
        if(data.searchStartTime !==undefined && data.searchStartTime !==null) this.searchStartTime = data.searchStartTime;
        if(data.searchEndTime !==undefined && data.searchEndTime !==null) this.searchEndTime = data.searchEndTime;
        if(data.status !==undefined && data.status !==null) this.status = data.status;
        if(data.orderNo !==undefined && data.orderNo !==null) this.orderNo = data.orderNo;
        if(data.cryptocurrencyType !==undefined && data.cryptocurrencyType !==null) this.cryptocurrencyType = data.cryptocurrencyType;
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = data.cryptocurrency;
        if(data.tokenNo !==undefined && data.tokenNo !==null) this.tokenNo = data.tokenNo;
        if(data.tradeType !==undefined && data.tradeType !==null) this.tradeType = data.tradeType;
        if(data.orderType !==undefined && data.orderType !==null) this.orderType = data.orderType;
        if(data.currency !==undefined && data.currency !==null) this.currency = data.currency;
    }

    clear() {
        this.searchStartTime = '';
        this.searchEndTime = '';
        this.status = "";
        this.orderNo = '';
        this.cryptocurrencyType = "";
        this.cryptocurrency = "";
        this.tokenNo = '';
        this.orderType = "";
        this.tradeType = "";
        this.currency = "";
    }

    isNull (): boolean {
        return (this.orderNo === undefined || this.orderNo === -1)
    }

}


