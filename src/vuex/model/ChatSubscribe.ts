
export default class Chat {
    myInfo : any;
    joinMembers: any;

    constructor (data: any) {
        this.myInfo = data.myInfo;
        this.joinMembers = data.joinMembers;
    }

    isNull (): boolean {
        return (this.myInfo === undefined)
    }
}


