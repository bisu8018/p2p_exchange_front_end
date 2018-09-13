export default class TradeFilter {
    tokenNo : number;
    type: string;
    nationality : string;
    currency: string;
    tradeType : string;
    cryptocurrency: string;
    paymentMethods: string;
    amount: number;
    cryptocurrencyType : string;
    page : number;
    size : number;

    constructor (data: any) {
        this.tokenNo = data.tokenNo ||'';
        this.type = data.type ||'general';
        this.nationality = data.nationality || 'ALL';
        this.currency = data.currency || 'CNY';
        this.tradeType = data.tradeType || 'sell';
        this.cryptocurrency = data.cryptocurrency || 'bitcoin';
        this.paymentMethods = data.paymentMethods || '';
        this.amount = Number(data.amount) || 0;
        this.cryptocurrencyType = data.cryptocurrencyType || 'general';
        this.page = Number(data.page) || 1;
        this.size = data.size || 10;
    }

    update (data: any){
        if(data.tokenNo !==undefined && data.tokenNo !==null) this.tokenNo = data.tokenNo;
        if(data.type !==undefined && data.type !==null) this.type = data.type;
        if(data.nationality !==undefined && data.nationality !==null) this.nationality = data.nationality;
        if(data.currency !==undefined && data.currency !==null) this.currency = data.currency;
        if(data.tradeType !==undefined && data.tradeType !==null) this.tradeType = this.transTradeType(data.tradeType);
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = this.transCrptocurrency(data.cryptocurrency);
        if(data.paymentMethods !==undefined && data.paymentMethods !==null) this.transPayment(data.paymentMethods);
        if(data.amount !==undefined && data.amount !==null) this.amount = data.amount;
        if(data.cryptocurrencyType !==undefined && data.cryptocurrencyType !==null) this.cryptocurrencyType = data.cryptocurrencyType;
        if(data.page !==undefined && data.page !==null) this.page = data.page;
        if(data.size !==undefined && data.size !==null) this.size = data.size;
    }

    transTradeType(tradeType){
        if(tradeType === 'Buy'){
            return 'sell';
        }
        else{
            return 'buy';
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

            case 'ALLB':
            case 'allb':

            default:
                return 'allb'
        }
    }

    transPayment(payment){
        if(payment == 'ALL'){
            this.paymentMethods ='';
        }
        else{
            this.paymentMethods = payment;
        }
    }

    isNull (): boolean {
        return (this.cryptocurrency === undefined || this.cryptocurrency === '')
    }

}


