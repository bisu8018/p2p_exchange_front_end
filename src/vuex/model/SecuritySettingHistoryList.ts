export default class SecuritySettingHistoryList {
    type: string;
    ip: string;
    register_datetime: string;

    constructor(data: any) {
        this.type = data.type || '';
        this.ip = data.ip || '';
        this.register_datetime = data.register_datetime || '';
    }

    isNull(): boolean {
        return (this.type === undefined || this.type === '')
    }
}