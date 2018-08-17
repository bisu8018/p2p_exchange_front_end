export default class Account {
    bgColor: string;
    email: string;
    membershipLevel: string;
    nationality: string;
    nickname: string;
    phoneNumber: string;
    role: 'ROLE_CUSTOMER';
    createDatetime: string;
    memberNo: string;
    //encryptedPassword: string;
    //termsAgreeYn: true;
    //tradePassword: string

  constructor (data: any) {
    this.bgColor = data.bgColor || '';
    this.email = data.email || '';
    this.membershipLevel = data.membershipLevel || 'none';
    this.nationality = data.nationality || 'CN';
    this.nickname = data.nickname || '';
    this.phoneNumber = data.phoneNumber || '';
    this.createDatetime = data.createDatetime || '';
    this.memberNo = data.memberNo || '';
    this.role = data.role || 'ROLE_CUSTOMER';
  }

  isNull (): boolean {
    return (this.email === undefined || this.email === '')
  }
}