
export default class Chat {
    myName : string;
    joinMembers: any;

    constructor (data: any) {
        this.myName = data.myName;
        this.joinMembers = data.joinMembers;
    }

    isNull (): boolean {
        return (this.myName === undefined)
    }
}


