export default class Trade {
    cryptocurrency: string;
    tradeType : string;
    nationality : string;
    currency: string;
    paymentMethod: string;
    limitMin: number;
    size : number;
    limitMax : number;


    constructor (data: any) {
        this.cryptocurrency = data.cryptocurrency;
        this.tradeType = data.tradeType;
        this.nationality = data.nationality;
        this.currency = data.currency;
        this.limitMin = Number(data.limitMin) || -1;
        this.size = data.size || '';
        this.limitMax = data.limitMax || '';
        this.paymentMethod = data.paymentMethod || '';

    }

    isNull (): boolean {
        return (this.cryptocurrency === undefined || this.cryptocurrency === '')
    }
}


