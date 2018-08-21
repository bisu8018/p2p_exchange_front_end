export default class Message {
    orderNo: number;
    message : string;
    attachedImgUrl : string;
    registerMemberNo : number;
    isMine : boolean;

    constructor (data: any) {
        if (data.orderNo === undefined) {
            this.orderNo = Number(data.orderNo);
        }
        this.message = data.message;
        this.attachedImgUrl = data.attachedImgUrl;
        if (data.registerMemberNo === undefined) {
            this.registerMemberNo = Number(data.registerMemberNo);
        }
        this.isMine = data.isMine;
    }

    isNull (): boolean {
        return (this.orderNo === undefined)
    }
}


