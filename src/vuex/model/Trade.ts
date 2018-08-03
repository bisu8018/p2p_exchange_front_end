export default class Trade {
    nationality : string;
    currency: string;
    tradeType : string;
    cryptocurrency: string;
    paymentMethod: string;
    minLimit: number;
    page : number;
    size : number;



    constructor (data: any) {
        this.nationality = data.nationality || '';
        this.currency = data.currency || '';
        this.tradeType = data.tradeType || '';
        this.cryptocurrency = data.cryptocurrency || '';
        this.paymentMethod = data.paymentMethod || '';
        this.minLimit = Number(data.minLimit) || -1;
        this.page = Number(data.page) || 1;
        this.size = data.size || 10;

    }

    update (data: any){
        if(data.nationality !==undefined && data.nationality !==null) this.nationality = data.nationality;
        if(data.currency !==undefined && data.currency !==null) this.currency = data.currency;
        if(data.tradeType !==undefined && data.tradeType !==null) this.tradeType = data.tradeType;
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = data.cryptocurrency;
        if(data.paymentMethod !==undefined && data.paymentMethod !==null) this.paymentMethod = data.paymentMethod;
        if(data.minLimit !==undefined && data.minLimit !==null) this.minLimit = data.minLimit;
        if(data.page !==undefined && data.page !==null) this.page = data.page;
        if(data.size !==undefined && data.size !==null) this.size = data.size;
    }



    isNull (): boolean {
        return (this.cryptocurrency === undefined || this.cryptocurrency === '')
    }

}


