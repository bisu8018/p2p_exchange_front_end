export default class EmailVerification {
    email: string;
    status: string;
    verificationCode: string;

    constructor(data: any) {
        this.email = data.email || '';
        this.status = data.status || '';
        this.verificationCode = data.verificationCode || '';
    }

    isNull(): boolean {
        return (this.email === undefined || this.email === '')
    }
}