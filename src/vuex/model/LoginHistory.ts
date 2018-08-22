import LoginHistoryList from "@/vuex/model/LoginHistoryList";

export default class LoginHistory {
    loginHistoryList: LoginHistoryList;
    totalCount: number;
    pageNo: number;


    constructor(data: any) {
        this.loginHistoryList = data.loginHistoryList;
        this.totalCount = data.totalCount;
        this.pageNo = data.pageNo;
    }

    // isNull(): boolean {
    //     return (this.type === undefined || this.type === '')
    // }
}