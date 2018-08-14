export default class LoginHistory {
    type: string;
    ip: string;
    status: string;
    register_datetime: string;


    constructor(data: any) {
        this.type = data.type || '';
        this.ip = data.ip || '';
        this.status = data.status || '';
        this.register_datetime = data.register_datetime || '';
    }

    isNull(): boolean {
        return (this.type === undefined || this.type === '')
    }
}