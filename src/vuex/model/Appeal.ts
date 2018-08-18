export default class Appeal {
    appealNo: number;
    orderNo: number;
    status: string;
    appealReason: string;
    details: string;


    constructor(data: any) {
        this.appealNo = Number(data.appealNo) || 0;
        this.orderNo = Number(data.orderNo) || 0;
        this.status = data.status || '';
        this.appealReason = data.appealReason || '';
        this.details = data.details || '';
    }

    isNull(): boolean {
        return (this.status === undefined || this.status === '')
    }
}