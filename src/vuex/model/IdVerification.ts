export default class IdVerification {
    type: string;
    status: string;
    nationality: string;
    firstName: string;
    lastName: string;
    identification_no : string;

    constructor(data: any) {
        this.type = data.type || '';
        this.status = data.status || '';
        this.nationality = data.nationality || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.identification_no = data.identification_no || '';
    }

    isNull(): boolean {
        return (this.status === undefined || this.status === '')
    }
}