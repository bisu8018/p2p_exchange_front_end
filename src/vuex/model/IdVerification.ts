export default class IdVerification {
    documentImgUrl: string;
    firstName: string;
    identificationNo: string;
    lastName: string;
    modifyDatetime: number;
    modifyMemberNo: number;
    nationality: string;
    registerDatetime: number;
    registerMemberNo: number;
    status: string;
    type: string;
    videoUrl: string;

    constructor(data: any) {
        this.documentImgUrl = data.documentImgUrl || '';
        this.firstName = data.firstName || '';
        this.identificationNo = data.identificationNo || null;
        this.lastName = data.lastName || '';
        this.modifyDatetime = data.modifyDatetime || null;
        this.modifyMemberNo = data.modifyMemberNo || 0;
        this.nationality = data.nationality || '';
        this.registerDatetime = data.registerDatetime || null;
        this.registerMemberNo = data.registerMemberNo || 0;
        this.status = data.status || '';
        this.type = data.type || '';
        this.videoUrl = data.videoUrl || '';
    }

    isNull(): boolean {
        return (this.status === undefined || this.status === '')
    }
}