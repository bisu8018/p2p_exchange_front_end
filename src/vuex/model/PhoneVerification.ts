export default class PhoneVerification {
    phoneNumber: string;
    status: string;
    verificationCode: string;

    constructor(data: any) {
        this.phoneNumber = data.phoneNumber || '';
        this.status = data.status || '';
        this.verificationCode = data.verificationCode || '';
    }

    isNull(): boolean {
        return (this.status === undefined || this.status === '' || this.status === 'requested')
    }
}