export default class SecuritySettingHistoryList {
    historyNo: number;
    memberNo: number;
    type: string;
    ip: string;
    status: string;

    constructor(data: any) {
        this.historyNo = data.historyNo;
        this.memberNo = data.memberNo;
        this.type = data.type;
        this.ip = data.ip;
        this.status = data.status;
    }

}