export default class OtherUsers {
    bgColor: string;
    nickName: string;


    constructor(data: any) {
        this.bgColor = data.bgColor || '';
        this.nickName = data.nickname || '';
    }

    isNull(): boolean {
        return (this.bgColor === undefined || this.bgColor === '')
    }
}