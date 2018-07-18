export default class Trade {
    idx: number;
    email: string;
    price: number;
    volumeTotal : number;
    limitMax : number;
    adType : string;
    token: string;

    constructor (data: any) {
        this.idx = Number(data.idx) || -1;
        this.email = data.email;
        this.price = data.price || '';
        this.volumeTotal = data.volumeTotal || '';
        this.limitMax = data.limitMax || '';
        this.adType = data.adType;
        this.token = data.token;
    }

    isNull (): boolean {
        return (this.idx === undefined || this.idx === -1)
    }
}