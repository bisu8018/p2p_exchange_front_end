export default class Account {
    bgColor: string;
    email: string;
    membershipLevel: string;
    nationality: string;
    nickname: string;
    phoneNumber: string;
    role: 'ROLE_CUSTOMER';
    register_datetime: string;
    member_no: string;
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
    this.register_datetime = data.register_datetime || '';
    this.member_no = data.member_no || '';
    this.role = data.role || 'ROLE_CUSTOMER';
  }

  isNull (): boolean {
    return (this.email === undefined || this.email === '')
  }
}