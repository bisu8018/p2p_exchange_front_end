import SecuritySettingHistoryList from "@/vuex/model/SecuritySettingHistoryList";

export default class SecuritySettings {
    securitySettingHistoryList: SecuritySettingHistoryList;
    totalCount: Number;
    pageNo: Number;


    constructor(data: any) {
        this.securitySettingHistoryList = data.securitySettingHistoryList;
        this.totalCount = data.totalCount;
        this.pageNo = data.pageNo || 1;
    }
}