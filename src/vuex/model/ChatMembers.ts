
export default class ChatMembers {
    name : any;
    bgColor: any;

    constructor (data: any) {
        this.name = data.name;
        this.bgColor = data.bgColor;
    }

    isNull (): boolean {
        return (this.name === undefined)
    }
}


