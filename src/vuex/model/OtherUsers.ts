export default class OtherUsers {
    email : string;
    bgColor: string;
    nickName: string;
    createDatetime : number;
    emailVerification : boolean;
    phoneVerification : boolean;
    idVerification : boolean;
    advancedVerification : boolean;
    merchant : boolean;




    constructor(data: any) {
        this.email = data.email || '';
        this.bgColor = data.bgColor || '';
        this.nickName = data.nickname || '';
        this.createDatetime = data.createDatetime || '';
        this.emailVerification = data.emailVerification || false;
        this.phoneVerification = data.phoneVerification || false;
        this.idVerification = data.idVerification || false;
        this.advancedVerification = data.advancedVerification || false;
        this.merchant = data.merchant || false;

    }

    isNull(): boolean {
        return (this.bgColor === undefined || this.bgColor === '')
    }
}