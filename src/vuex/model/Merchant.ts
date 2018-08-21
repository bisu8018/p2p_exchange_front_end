export default class Merchant {
    memberNo: number;
    status : MerchantStatus;

    constructor (data: any) {
        this.memberNo = Number(data.memberNo);
        this.status = data.status;
    }

    isUnregistered() {
        return this.status === MerchantStatus.UNREGISTERED;
    }

    isRegistered() {
        return this.status === MerchantStatus.REGISTERED;
    }

    isVerified() {
        return this.status === MerchantStatus.VERIFIED;
    }
}

export enum MerchantStatus {
    UNREGISTERED = 'unregistered',
    REGISTERED = 'registered',
    VERIFIED = 'verified',
}