export default class IdVerificationId {
    idNumber: string;
    nationality: string;
    realName: string;


    constructor(data: any) {
        this.idNumber = data.idNumber;
        this.nationality = data.nationality;
        this.realName = data.realName;
    }

}