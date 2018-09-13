
export default class ChatMembers {
    name : any;
    bgColor: any;
    memberNo: number;

    constructor (data: any) {
        this.name = data.name;
        this.bgColor = data.bgColor;
        this.memberNo = data.memberNo;
    }

    isNull (): boolean {
        return (this.name === undefined)
    }
}


