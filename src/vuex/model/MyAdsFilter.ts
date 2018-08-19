export default class MyAdsFilter {
    searchStartTime: string;
    searchEndTime: string;
    status : string;
    orderNo : number;
    cryptocurrency: string;
    orderType: string;
    tradeType : string;
    currency: string;
    page : number;
    size : number;



    constructor (data: any) {
        this.searchStartTime = data.searchStartTime ||'';
        this.searchEndTime = data.searchEndTime ||'';
        this.status = data.status || 'enable';
        this.orderNo = Number(data.orderNo) || 0;
        this.cryptocurrency = this.transCrptocurrency(data.cryptocurrency) || 'bitcoin';
        this.orderType = data.orderType || '';
        this.tradeType = this.toLowerCase(data.tradeType) || '';
        this.currency = data.currency || '';
        this.page = Number(data.page) || 1;
        this.size = data.size || 10;

    }

    update (data: any){
        if(data.status !==undefined && data.status !==null) this.status = data.status;
        if(data.currency !==undefined && data.currency !==null) this.currency = data.currency;
        if(data.tradeType !==undefined && data.tradeType !==null) this.tradeType = data.tradeType.toLowerCase();
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = this.transCrptocurrency(data.cryptocurrency);
        if(data.orderType !==undefined && data.orderType !==null) this.orderType = data.orderType;
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
                return 'ALLB'
        }
    }


    isNull (): boolean {
        return (this.orderNo === undefined || this.orderNo === -1)
    }

}


