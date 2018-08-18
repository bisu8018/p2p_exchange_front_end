export default class Message {
    orderNo: number;
    message : string;
    attachedImgUrl : string;
    registerMemberNo : number;
    isMine : boolean;

    constructor (data: any) {
        this.orderNo = Number(data.orderNo) || 0;
        this.message = data.message || '';
        this.attachedImgUrl = data.attachedImgUrl || '';
        this.registerMemberNo = Number(data.registerMemberNo) || 0;
        this.isMine = data.isMine;
    }
}


