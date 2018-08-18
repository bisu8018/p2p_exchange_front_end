export default class Block {
    bgColor : string;
    block_member_no: string;
    email: string;
    memo: string;
    nickName: string;


    constructor(data: any) {
        this.block_member_no = data.block_member_no || '';
        this.memo = data.memo || '';
        this.email = data.email || '';
        this.bgColor = data.bgColor || '';
        this.nickName = data.nickname || '';
    }

    isNull(): boolean {
        return (this.email === undefined || this.email === '')
    }
}