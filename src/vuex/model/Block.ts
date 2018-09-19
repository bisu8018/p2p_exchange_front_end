import BlockMemberList from "@/vuex/model/BlockMemberList";

export default class Block {
    blockMemberList: BlockMemberList;
    totalCount: number;
    pageNo: number;


    constructor(data: any) {
        this.blockMemberList = data.blockMemberList;
        this.totalCount = data.totalCount;
        this.pageNo = data.pageNo;
    }

  /*  isNull(): boolean {
        return (this.email === undefined || this.email === '')
    }*/
}