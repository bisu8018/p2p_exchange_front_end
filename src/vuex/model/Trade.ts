export default class Trade {
    idx: number;
    email: string;
    price: number;
    volumeTotal : number;
    adType : string;

    constructor (data: any) {
        this.idx = Number(data.idx) || -1;
        this.email = data.email || '';
        this.price = data.price || '';
        this.volumeTotal = data.volumeTotal || '';
        this.adType = data.adType;
    }

    isNull (): boolean {
        return (this.idx === undefined || this.idx === -1)
    }
}