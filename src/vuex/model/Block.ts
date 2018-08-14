export default class Block {
    block_member_no: string;
    memo: string;
    email: string;


    constructor(data: any) {
        this.block_member_no = data.block_member_no || '';
        this.memo = data.memo || '';
        this.email = data.email || '';
    }

    isNull(): boolean {
        return (this.block_member_no === undefined || this.block_member_no === '')
    }
}