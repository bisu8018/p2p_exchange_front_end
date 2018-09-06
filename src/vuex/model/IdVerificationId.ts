export default class IdVerificationId {
    idNumber: string;
    nationality: string;
    realName: string;
    documentImgUrl : string;
    firstName : string;
    lastName  : string;



    constructor(data: any) {
        this.idNumber = data.idNumber;
        this.nationality = data.nationality;
        this.realName = data.realName;
        this.documentImgUrl = data.documentImgUrl;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
    }

}