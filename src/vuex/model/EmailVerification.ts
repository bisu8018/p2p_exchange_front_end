export default class EmailVerification {
    memberNo: string;
    email: string;
    status: string;
    verificationCode: string;

    constructor(data: any) {
        this.memberNo = data.memberNo || '';
        this.email = data.email || '';
        this.status = data.status || '';
        this.verificationCode = data.verificationCode || '';
    }

    isNull(): boolean {
        return (this.memberNo === undefined || this.memberNo === '')
    }
}