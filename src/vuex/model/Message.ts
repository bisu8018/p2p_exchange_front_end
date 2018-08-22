import {abUtils} from "@/common/utils";

export default class Message {
    orderNo: number;
    message : string;
    attachedImgUrl : string;
    registerMemberNo : number;
    registerDatetime: number;
    mine : boolean;

    constructor (data: any) {
        if (data.orderNo === undefined) {
            this.orderNo = Number(data.orderNo);
        } else {
            this.orderNo = -1
        }
        this.message = data.message;
        this.attachedImgUrl = data.attachedImgUrl;
        if (data.registerMemberNo === undefined) {
            this.registerMemberNo = Number(data.registerMemberNo);
        } else {
            this.registerMemberNo = -1;
        }
        this.mine = data.mine;
        this.registerDatetime = data.registerDatetime;
    }

    getDate(): string {
        return abUtils.toChatTimeFormat(new Date(this.registerDatetime));
    }

    isNull (): boolean {
        return (this.orderNo === undefined)
    }
}


