export default class MyTradeFilter {
    searchStartTime: string;
    searchEndTime: string;
    status : string;
    orderNo : number;
    adNo : number;
    cryptocurrency: string;
    orderType: string;
    adsType : string;
    tradeType : string;
    currency: string;
    page : number;
    size : number;



    constructor (data: any) {
        this.searchStartTime = data.searchStartTime ||'';
        this.searchEndTime = data.searchEndTime ||'';
        this.status = data.status || '';
        this.orderNo = data.orderNo;
        this.adNo = data.adNo;
        this.cryptocurrency = data.cryptocurrency
        this.orderType = data.orderType || '';
        this.tradeType = data.tradeType || '';
        this.adsType = data.adsType || '';
        this.currency = data.currency || '';
        this.page = Number(data.page) || 1;
        this.size = data.size || 10;
    }

    update (data: any){
        if(data.searchStartTime !==undefined && data.searchStartTime !==null) this.searchStartTime = data.searchStartTime;
        if(data.searchEndTime !==undefined && data.searchEndTime !==null) this.searchEndTime = data.searchEndTime;
        if(data.status !==undefined && data.status !==null) this.status = data.status;
        if(data.orderNo !==undefined && data.orderNo !==null) this.adNo = data.adNo;
        if(data.orderNo !==undefined && data.orderNo !==null) this.orderNo = data.orderNo;
        if(data.currency !==undefined && data.currency !==null) this.currency = data.currency;
        if(data.tradeType !==undefined && data.tradeType !==null) this.tradeType = data.tradeType.toLowerCase();
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = this.transCrptocurrency(data.cryptocurrency);
        if(data.orderType !==undefined && data.orderType !==null) this.orderType = data.orderType;
        if(data.adsType !==undefined && data.adsType !==null) this.adsType = data.adsType;
        if(data.page !==undefined && data.page !==null) this.page = data.page;
        if(data.size !==undefined && data.size !==null) this.size = data.size;

    }

    toLowerCase(tradeType){
        if(tradeType == 'Buy'){
            return 'buy';
        }
        else{
            return 'sell';
        }
    }

    //보낼때는 약어를 fullname으로 보내야함.
    transCrptocurrency(cryptocurrency){
        switch (cryptocurrency) {
            case 'BTC':
            case 'bitcoin':
                return 'bitcoin'

            case 'ETH':
            case 'ethereum':
                return 'ethereum'

            default:
                return ''
        }
    }


    isNull (): boolean {
        return (this.orderNo === undefined || this.orderNo === -1)
    }

}


