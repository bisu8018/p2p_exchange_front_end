
export default class Chat {
    message : string;
    sendDateTime: number;
    sender: string;
    type : string;

    constructor (data: any) {
        this.message = data.message;
        this.sendDateTime = data.sendDateTime;
        this.sender = data.sender;
        this.type = data.type;
    }

    isNull (): boolean {
        return (this.message === undefined)
    }
}


