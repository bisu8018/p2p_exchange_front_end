export default class Block {
    bgColor : string;
    blockMemberNo: number;
    email: string;
    memo: string;
    nickName: string;


    constructor(data: any) {
        this.blockMemberNo = data.blockMemberNo || -1;
        this.memo = data.memo || '';
        this.email = data.email || '';
        this.bgColor = data.bgColor || '';
        this.nickName = data.nickname || '';
    }

    isNull(): boolean {
        return (this.email === undefined || this.email === '')
    }
}