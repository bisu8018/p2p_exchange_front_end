export default class SecuritySettingHistoryList {
    historyNo: number;
    memberNo: number;
    type: string;
    ip: string;

    constructor(data: any) {
        this.historyNo = data.historyNo;
        this.memberNo = data.memberNo;
        this.type = data.type || '';
        this.ip = data.ip || '';
    }

    // isNull(): boolean {
    //     return (this.type === undefined || this.type === '')
    // }
}