export default class PhoneVerification {
    memberNo: string;
    phoneNumber: string;
    status: string;
    verificationCode: string;

    constructor(data: any) {
        this.memberNo = data.memberNo || '';
        this.phoneNumber = data.phoneNumber || '';
        this.status = data.status || '';
        this.verificationCode = data.verificationCode || '';
    }

    isNull(): boolean {
        return (this.memberNo === undefined || this.memberNo === '')
    }
}