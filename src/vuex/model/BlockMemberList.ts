export default class BlockMemberList {
    bgColor: string;
    blockMemberNo: number;
    email: string;
    memberNo: number;
    memo: string;
    nickname: string;

    constructor(data: any) {
        this.bgColor = data.bgColor;
        this.blockMemberNo = data.blockMemberNo;
        this.email = data.email;
        this.memberNo = data.memberNo;
        this.memo = data.memo;
        this.nickname = data.nickname;
    }

}