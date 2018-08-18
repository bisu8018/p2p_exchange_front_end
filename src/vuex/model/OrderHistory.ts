export default class OrderHistory {
    orderNo: number;
    historyNo: number;
    status: string;
    message: string;

    constructor(data: any) {
        this.orderNo = Number(data.orderNo) || 0;
        this.historyNo = Number(data.historyNo) || 0;
        this.status = data.status || '';
        this.message = data.message || '';
    }

    isNull(): boolean {
        return (this.status === undefined || this.status === '')
    }
}